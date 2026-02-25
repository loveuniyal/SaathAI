import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://saathai.onrender.com'

const commonSymptoms = [
  { icon: '🤒', label: 'Fever' },
  { icon: '🤧', label: 'Cold & Cough' },
  { icon: '🤢', label: 'Nausea' },
  { icon: '😣', label: 'Stomach Pain' },
  { icon: '🤕', label: 'Headache' },
  { icon: '😮‍💨', label: 'Breathing Issue' },
  { icon: '💔', label: 'Chest Pain' },
  { icon: '🦴', label: 'Joint Pain' },
]

const healthTips = [
  { icon: '💧', tip: 'Drink at least 8 glasses of water daily' },
  { icon: '🥗', tip: 'Eat fresh fruits and vegetables every day' },
  { icon: '🚶', tip: 'Walk at least 30 minutes every day' },
  { icon: '😴', tip: 'Sleep 7-8 hours every night' },
  { icon: '🧼', tip: 'Wash hands regularly with soap' },
  { icon: '🚭', tip: 'Avoid smoking and tobacco products' },
]

const emergencyNumbers = [
  { name: 'National Emergency', number: '112', icon: '🚨' },
  { name: 'Ambulance', number: '108', icon: '🚑' },
  { name: 'Health Helpline', number: '104', icon: '🏥' },
  { name: 'Women Helpline', number: '1091', icon: '👩' },
]

export default function Health() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([])
  const [advice, setAdvice] = useState(null)
  const [loading, setLoading] = useState(false)

  const toggleSymptom = (label) => {
    setSelectedSymptoms(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    )
  }

  const getAdvice = async () => {
    if (selectedSymptoms.length === 0) return
    setLoading(true)
    setAdvice(null)

    try {
      const prompt = `A patient in rural India has these symptoms: ${selectedSymptoms.join(', ')}. 
      Give simple home remedies and first aid in Hindi. 
      Also tell clearly if they should visit a doctor urgently or can manage at home.
      Keep it very simple and easy to understand. Use bullet points.`

      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: 'You are a helpful health assistant for rural Indians. Always respond in Hindi. Keep answers simple and clear.',
          messages: [{ role: 'user', parts: [{ text: prompt }] }],
        }),
      })

      const data = await res.json()
      setAdvice(data.reply)
    } catch (err) {
      setAdvice('माफ़ कीजिए, कुछ गलत हो गया। कृपया दोबारा कोशिश करें।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">🏥 Health Assistant</h1>
          <p className="text-gray-400 text-lg">Select your symptoms and get instant guidance</p>
        </div>

        {/* Emergency Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {emergencyNumbers.map(e => (
            <div
              key={e.name}
              className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center"
            >
              <div className="text-3xl mb-1">{e.icon}</div>
              <div className="text-red-400 font-bold text-lg">{e.number}</div>
              <div className="text-gray-400 text-xs">{e.name}</div>
            </div>
          ))}
        </div>

        {/* Symptom Checker */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">🩺 Symptom Checker</h2>
          <p className="text-gray-400 text-sm mb-6">Select all symptoms you are experiencing</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {commonSymptoms.map(s => (
              <button
                key={s.label}
                onClick={() => toggleSymptom(s.label)}
                className={`p-4 rounded-xl border text-center transition-all
                  ${selectedSymptoms.includes(s.label)
                    ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                    : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-gray-500'
                  }`}
              >
                <div className="text-3xl mb-1">{s.icon}</div>
                <div className="text-xs font-medium">{s.label}</div>
              </button>
            ))}
          </div>

          {selectedSymptoms.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSymptoms.map(s => (
                <span key={s} className="bg-orange-500/20 text-orange-400 border border-orange-500/40 px-3 py-1 rounded-full text-sm">
                  {s} ✕
                </span>
              ))}
            </div>
          )}

          <button
            onClick={getAdvice}
            disabled={selectedSymptoms.length === 0 || loading}
            className="w-full bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all"
          >
            {loading ? '⏳ Getting advice...' : '🤖 Get AI Health Advice'}
          </button>
        </div>

        {/* AI Advice */}
        {advice && (
          <div className="bg-gray-900 border border-green-500/30 rounded-2xl p-6 mb-8">
            <h2 className="text-xl font-bold mb-4 text-green-400">💊 Health Advice</h2>
            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{advice}</p>
            <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-xs">⚠️ This is basic guidance only. Please consult a doctor for proper diagnosis and treatment.</p>
            </div>
            <Link
              to="/chat"
              className="mt-4 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl transition-all text-sm font-medium"
            >
              🎙️ Ask more questions to SaathAI
            </Link>
          </div>
        )}

        {/* Health Tips */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-6">💡 Daily Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {healthTips.map((t, i) => (
              <div key={i} className="flex items-center gap-3 bg-gray-800 rounded-xl p-4">
                <span className="text-2xl">{t.icon}</span>
                <p className="text-gray-300 text-sm">{t.tip}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}