import { useState, useEffect, useRef } from 'react'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://saathai.onrender.com'

const languages = [
  { code: 'hi-IN', label: 'हिंदी', name: 'Hindi' },
  { code: 'ta-IN', label: 'தமிழ்', name: 'Tamil' },
  { code: 'te-IN', label: 'తెలుగు', name: 'Telugu' },
  { code: 'bn-IN', label: 'বাংলা', name: 'Bengali' },
  { code: 'mr-IN', label: 'मराठी', name: 'Marathi' },
  { code: 'gu-IN', label: 'ગુજરાતી', name: 'Gujarati' },
  { code: 'kn-IN', label: 'ಕನ್ನಡ', name: 'Kannada' },
  { code: 'ml-IN', label: 'മലയാളം', name: 'Malayalam' },
  { code: 'en-IN', label: 'English', name: 'English' },
]



const SYSTEM_PROMPT = `You are SaathAI, a helpful AI assistant for rural and underprivileged Indians. 
Your job is to help people understand:
1. Government schemes they are eligible for (like PM Kisan, Ayushman Bharat, PM Awas Yojana, etc.)
2. Basic health guidance and when to see a doctor
3. Their fundamental legal rights in simple language

Always respond in the SAME language the user is speaking in.
Keep your answers simple, clear, and short — as if explaining to someone who is not highly educated.
Be warm, friendly, and supportive. Address the user as "aap" in Hindi or respectfully in other languages.
If the question is in Hindi, respond in Hindi. If in Tamil, respond in Tamil. And so on.
Never use complex legal or medical jargon.`

export default function Chat() {
    
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: 'नमस्ते! मैं SaathAI हूं। आप मुझसे सरकारी योजनाओं, स्वास्थ्य, या कानूनी अधिकारों के बारे में पूछ सकते हैं। बोलिए या लिखिए! 🙏',
    },
  ])
  const [input, setInput] = useState('')
  const [listening, setListening] = useState(false)
  const [loading, setLoading] = useState(false)
  const [selectedLang, setSelectedLang] = useState(languages[0])
  const [speaking, setSpeaking] = useState(false)
  const bottomRef = useRef(null)
  const recognitionRef = useRef(null)
  const mediaRecorderRef = useRef(null)
const audioChunksRef = useRef([])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Voice Input

const startListening = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    const mediaRecorder = new MediaRecorder(stream)
    mediaRecorderRef.current = mediaRecorder
    audioChunksRef.current = []

    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunksRef.current.push(e.data)
    }

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
      const formData = new FormData()
      formData.append('audio', audioBlob, 'audio.webm')
      formData.append('language', selectedLang.code.split('-')[0])

      try {
        const res = await fetch(`${API_BASE_URL}/api/transcribe`, {
          method: 'POST',
          body: formData,
        })
        const data = await res.json()
        if (data.transcript) {
          setInput(data.transcript)
        }
      } catch (err) {
        console.error('Transcription error:', err)
      }
      
      stream.getTracks().forEach(track => track.stop())
      setListening(false)
    }

    mediaRecorder.start()
    setListening(true)
  } catch (err) {
    console.error('Mic error:', err)
    alert('Could not access microphone.')
  }
}

const stopListening = () => {
  mediaRecorderRef.current?.stop()
}

  // Text to Speech
  const speak = (text) => {
  if (!window.speechSynthesis) return
  window.speechSynthesis.cancel()

  // Clean text for TTS
  const cleaned = text
    .replace(/\*/g, '')
    .replace(/#{1,6}\s/g, '')
    .trim()

  // Split into small chunks at sentence boundaries
  const chunks = cleaned.split(/(?<=[।.!?])\s+/)

  let index = 0
  const speakNext = () => {
    if (index >= chunks.length) {
      setSpeaking(false)
      return
    }
    const utterance = new SpeechSynthesisUtterance(chunks[index])
    utterance.lang = selectedLang.code
    utterance.rate = 0.85
    utterance.pitch = 1
    utterance.volume = 1
    utterance.onend = () => {
      index++
      speakNext()
    }
    utterance.onerror = () => {
      index++
      speakNext()
    }
    if (index === 0) setSpeaking(true)
    window.speechSynthesis.speak(utterance)
  }

  speakNext()
}

  // Send to Gemini
  const sendMessage = async (textToSend) => {
    const text = textToSend || input.trim()
    if (!text || loading) return

    const userMsg = { role: 'user', text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = messages.map((m) => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.text }],
      }))

      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: SYSTEM_PROMPT,
          messages: [...history, { role: 'user', parts: [{ text }] }],
        }),
      })

      const data = await response.json()
      const reply = data.reply || 'माफ़ कीजिए, मुझे समझ नहीं आया। कृपया दोबारा पूछें।'

      setMessages((prev) => [...prev, { role: 'assistant', text: reply }])
      speak(reply)
    } catch (err) {
      setMessages((prev) => [...prev, { role: 'assistant', text: '⚠️ कुछ गलत हो गया। कृपया दोबारा कोशिश करें।' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">

      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">🎙️ Ask SaathAI</h1>
            <p className="text-gray-400 text-sm">Speak or type your question in any language</p>
          </div>

          {/* Language Selector */}
          <select
            value={selectedLang.code}
            onChange={(e) => setSelectedLang(languages.find((l) => l.code === e.target.value))}
            className="bg-gray-800 border border-gray-700 text-white text-sm px-3 py-2 rounded-xl focus:outline-none focus:border-orange-500"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label} ({l.name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Suggestion Chips */}
      <div className="max-w-3xl mx-auto w-full px-4 py-3 flex gap-2 flex-wrap">
        {[
          'PM Kisan योजना क्या है?',
          'Ayushman Bharat कैसे मिलेगा?',
          'मेरे कानूनी अधिकार क्या हैं?',
          'बुखार में क्या करें?',
        ].map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="bg-gray-800 hover:bg-orange-500/20 hover:border-orange-500/50 border border-gray-700 text-gray-300 hover:text-orange-400 text-xs px-3 py-2 rounded-full transition-all"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 max-w-3xl mx-auto w-full space-y-4">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>

              {/* Avatar */}
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0
                ${msg.role === 'assistant' ? 'bg-gradient-to-br from-orange-500 to-pink-600' : 'bg-gray-700'}`}>
                {msg.role === 'assistant' ? 'स' : '👤'}
              </div>

              {/* Bubble */}
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed
                ${msg.role === 'assistant'
                  ? 'bg-gray-800 text-gray-100 rounded-tl-none'
                  : 'bg-gradient-to-r from-orange-500 to-pink-600 text-white rounded-tr-none'
                }`}>
                {msg.text}

                {/* Speak button for AI messages */}
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => speak(msg.text)}
                    className="mt-2 flex items-center gap-1 text-xs text-gray-400 hover:text-orange-400 transition-colors"
                  >
                    🔊 <span>सुनें / Listen</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Loading */}
        {loading && (
          <div className="flex justify-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-pink-600 flex items-center justify-center text-lg">
                स
              </div>
              <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-tl-none">
                <div className="flex gap-1 items-center h-5">
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="bg-gray-900 border-t border-gray-800 px-4 py-4">
        <div className="max-w-3xl mx-auto flex items-center gap-3">

          {/* Mic Button */}
          <button
            onClick={listening ? stopListening : startListening}
            className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all flex-shrink-0
              ${listening
                ? 'bg-red-500 hover:bg-red-600 animate-pulse shadow-lg shadow-red-500/40'
                : 'bg-gray-800 hover:bg-gray-700 border border-gray-700'
              }`}
          >
            {listening ? '⏹️' : '🎙️'}
          </button>

          {/* Text Input */}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="बोलिए या लिखिए... / Speak or type..."
            className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 text-sm"
          />

          {/* Send Button */}
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center text-xl transition-all flex-shrink-0"
          >
            ➤
          </button>
        </div>

        {listening && (
          <p className="text-center text-red-400 text-xs mt-2 animate-pulse">
            🔴 Listening... speak now in {selectedLang.name}
          </p>
        )}
      </div>
    </div>
  )
}