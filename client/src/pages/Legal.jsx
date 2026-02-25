import { useState } from 'react'
import { Link } from 'react-router-dom'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://saathai.onrender.com'

const rights = [
  {
    icon: '🗣️',
    title: 'Right to Equality',
    article: 'Article 14-18',
    description: 'Every Indian citizen is equal before the law. No discrimination based on religion, race, caste, sex or place of birth.',
    examples: ['Equal pay for equal work', 'No caste discrimination', 'Equal access to public places'],
  },
  {
    icon: '🕊️',
    title: 'Right to Freedom',
    article: 'Article 19-22',
    description: 'Every citizen has freedom of speech, expression, movement, and to practice any profession.',
    examples: ['Freedom to speak your mind', 'Freedom to travel anywhere in India', 'Freedom to choose any job'],
  },
  {
    icon: '⛔',
    title: 'Right Against Exploitation',
    article: 'Article 23-24',
    description: 'No one can be forced to work without pay. Child labour is strictly prohibited.',
    examples: ['No bonded labour', 'Children below 14 cannot work in factories', 'No human trafficking'],
  },
  {
    icon: '🙏',
    title: 'Right to Religion',
    article: 'Article 25-28',
    description: 'Every citizen has the right to freely practice, profess and propagate any religion.',
    examples: ['Freedom to pray', 'Freedom to follow any religion', 'No forced religious conversion'],
  },
  {
    icon: '📚',
    title: 'Right to Education',
    article: 'Article 21A',
    description: 'Free and compulsory education for all children between 6-14 years of age.',
    examples: ['Free schooling till class 8', 'No child can be denied admission', 'Mid-day meal scheme'],
  },
  {
    icon: '⚖️',
    title: 'Right to Constitutional Remedies',
    article: 'Article 32',
    description: 'You can approach the Supreme Court or High Court if your rights are violated.',
    examples: ['File a PIL', 'Approach High Court for justice', 'Get legal aid if you cannot afford a lawyer'],
  },
]

const legalAid = [
  { name: 'National Legal Services Authority', number: '15100', icon: '⚖️' },
  { name: 'Police Emergency', number: '100', icon: '👮' },
  { name: 'Women Helpline', number: '1091', icon: '👩' },
  { name: 'Child Helpline', number: '1098', icon: '👶' },
]

export default function Legal() {
  const [selected, setSelected] = useState(null)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState(null)
  const [loading, setLoading] = useState(false)

  const askLegal = async () => {
    if (!question.trim()) return
    setLoading(true)
    setAnswer(null)

    try {
      const res = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: 'You are a legal rights advisor for rural Indians. Explain legal rights in very simple Hindi. Always remind them to consult a lawyer for serious matters.',
          messages: [{ role: 'user', parts: [{ text: question }] }],
        }),
      })
      const data = await res.json()
      setAnswer(data.reply)
    } catch (err) {
      setAnswer('माफ़ कीजिए, कुछ गलत हो गया।')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">⚖️ Know Your Legal Rights</h1>
          <p className="text-gray-400 text-lg">Your rights as an Indian citizen — in simple language</p>
        </div>

        {/* Legal Aid Numbers */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10">
          {legalAid.map(l => (
            <div key={l.name} className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
              <div className="text-3xl mb-1">{l.icon}</div>
              <div className="text-blue-400 font-bold text-lg">{l.number}</div>
              <div className="text-gray-400 text-xs">{l.name}</div>
            </div>
          ))}
        </div>

        {/* Rights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {rights.map(right => (
            <div
              key={right.title}
              onClick={() => setSelected(selected?.title === right.title ? null : right)}
              className="bg-gray-900 border border-gray-800 hover:border-orange-500/40 rounded-2xl p-6 cursor-pointer transition-all"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-3xl">{right.icon}</span>
                <div>
                  <h3 className="font-bold text-white">{right.title}</h3>
                  <span className="text-orange-400 text-xs">{right.article}</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-3">{right.description}</p>

              {selected?.title === right.title && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-orange-400 text-xs font-bold mb-2">Examples:</p>
                  <ul className="space-y-1">
                    {right.examples.map((ex, i) => (
                      <li key={i} className="text-gray-300 text-xs flex items-center gap-2">
                        <span className="text-green-400">✓</span> {ex}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="text-orange-400 text-xs mt-2">
                {selected?.title === right.title ? '▲ Show less' : '▼ Show examples'}
              </p>
            </div>
          ))}
        </div>

        {/* Ask Legal Question */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold mb-2">🤖 Ask a Legal Question</h2>
          <p className="text-gray-400 text-sm mb-4">Type your legal question in Hindi or English</p>

          <div className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={e => setQuestion(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && askLegal()}
              placeholder="e.g. मुझे पुलिस ने गिरफ्तार किया, मेरे क्या अधिकार हैं?"
              className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500 text-sm"
            />
            <button
              onClick={askLegal}
              disabled={!question.trim() || loading}
              className="bg-gradient-to-r from-orange-500 to-pink-600 disabled:opacity-40 text-white font-bold px-6 py-3 rounded-xl transition-all"
            >
              {loading ? '⏳' : '➤'}
            </button>
          </div>

          {answer && (
            <div className="mt-4 p-4 bg-gray-800 rounded-xl">
              <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
              <p className="text-yellow-400 text-xs mt-3">⚠️ This is general information only. Please consult a lawyer for serious legal matters.</p>
              <Link to="/chat" className="mt-3 flex items-center gap-2 text-orange-400 text-sm hover:underline">
                🎙️ Ask more to SaathAI →
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}