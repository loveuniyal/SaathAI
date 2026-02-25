const express = require('express')
const cors = require('cors')
const Groq = require('groq-sdk')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

app.get('/', (req, res) => {
  res.json({ 
    status: '✅ SaathAI Backend is running!',
    endpoints: ['/api/chat', '/api/transcribe'],
    timestamp: new Date().toISOString()
  })
})

app.post('/api/chat', async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body

    const formatted = messages.map((m) => ({
      role: m.role === 'model' ? 'assistant' : m.role,
      content: m.parts?.[0]?.text || m.content || '',
    }))

    const response = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: systemPrompt },
        ...formatted,
      ],
      max_tokens: 1024,
    })

    const reply = response.choices[0]?.message?.content || 'माफ़ कीजिए, दोबारा पूछें।'
    res.json({ reply })
  } catch (err) {
    console.error(err)
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
    res.json({ transcript: transcription.text })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`))