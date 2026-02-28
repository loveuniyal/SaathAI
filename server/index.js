const express = require('express')
const cors = require('cors')
const Groq = require('groq-sdk')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

// Groq: used ONLY for STT (Whisper) — free tier
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

// Sarvam: used for Chat (Sarvam-M, FREE) + TTS (Bulbul v3, free credits)
const SARVAM_API_KEY = process.env.SARVAM_API_KEY
const SARVAM_BASE = 'https://api.sarvam.ai'

console.log('SARVAM_API_KEY loaded:', !!SARVAM_API_KEY)

// Helper: fetch with timeout
const fetchWithTimeout = (url, options, ms = 15000) => {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  return fetch(url, { ...options, signal: controller.signal })
    .finally(() => clearTimeout(timer))
}

app.get('/', (req, res) => {
  res.json({ 
    status: '✅ SaathAI Backend is running!',
    endpoints: ['/api/chat', '/api/transcribe', '/api/tts'],
    timestamp: new Date().toISOString()
  })
})

// Chat — Sarvam-M (FREE, purpose-built for Indian languages)
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body

    const formatted = messages.map((m) => ({
      role: (m.role === 'model' || m.role === 'assistant') ? 'assistant' : 'user',
      content: m.parts?.[0]?.text || m.content || '',
    }))

    const response = await fetchWithTimeout(`${SARVAM_BASE}/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'api-subscription-key': SARVAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sarvam-m',
        messages: [
          { role: 'system', content: systemPrompt || 'You are SaathAI, a helpful assistant for Indian citizens.' },
          ...formatted,
        ],
      }),
    })

    const data = await response.json()
    console.log('Sarvam chat status:', response.status, 'msgs:', formatted.length, 'reply length:', data.choices?.[0]?.message?.content?.length)
    if (!response.ok) console.error('Sarvam error body:', JSON.stringify(data))
    const reply = data.choices?.[0]?.message?.content || 'माफ़ कीजिए, दोबारा पूछें।'
    res.json({ reply })
  } catch (err) {
    console.error('Chat error:', err.message)
    res.status(500).json({ error: err.message })
  }
})
const multer = require('multer')
const upload = multer()

app.post('/api/transcribe', upload.single('audio'), async (req, res) => {
  try {
    const fs = require('fs')
    const path = require('path')

    const tempPath = path.join(__dirname, 'temp_audio.webm')
    fs.writeFileSync(tempPath, req.file.buffer)

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(tempPath),
      model: 'whisper-large-v3',
      language: req.body.language || 'hi',
    })

    fs.unlinkSync(tempPath)

    // Filter known Whisper hallucinations for short/silent audio
    const hallucinations = ['you', 'you.', 'thank you', 'thank you.', 'thanks', 'bye', 'bye.', 'yes', 'no']
    const transcript = transcription.text?.trim() || ''
    if (!transcript || hallucinations.includes(transcript.toLowerCase())) {
      return res.json({ transcript: '' })
    }

    res.json({ transcript })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

// TTS — Sarvam Bulbul v3 (natural Indian language voices, uses free ₹1000 signup credits)
app.post('/api/tts', async (req, res) => {
  try {
    const { text, language_code } = req.body

    // Clean and truncate (Bulbul v3 max: 2500 chars)
    const cleaned = text
      .replace(/\*/g, '')
      .replace(/#{1,6}\s/g, '')
      .trim()
      .slice(0, 2400)

    const response = await fetchWithTimeout(`${SARVAM_BASE}/text-to-speech`, {
      method: 'POST',
      headers: {
        'api-subscription-key': SARVAM_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: cleaned,
        target_language_code: language_code,
        model: 'bulbul:v2',
        speaker: 'anushka',
        pace: 1.0,
        loudness: 1.5,
      }),
    })

    const data = await response.json()
    res.json({ audio: data.audios?.[0] || null })
  } catch (err) {
    console.error('TTS error:', err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))