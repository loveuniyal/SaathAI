import { Link } from 'react-router-dom'

const features = [
  {
    icon: '🎙️',
    title: 'Voice First',
    desc: 'Just speak in your language — no typing, no reading required.',
  },
  {
    icon: '🌐',
    title: 'Multilingual',
    desc: 'Supports Hindi, Tamil, Telugu, Bengali, Marathi and 6 more languages.',
  },
  {
    icon: '🏛️',
    title: 'Government Schemes',
    desc: 'Discover schemes you are eligible for — PM Kisan, Ayushman Bharat & more.',
  },
  {
    icon: '🏥',
    title: 'Health Assistant',
    desc: 'Describe symptoms by voice and get instant basic health guidance.',
  },
  {
    icon: '⚖️',
    title: 'Legal Rights',
    desc: 'Know your fundamental rights in simple, plain language.',
  },
  {
    icon: '🔐',
    title: 'Simple Login',
    desc: 'Login with just your phone number — no email or password needed.',
  },
]

const stats = [
  { value: '500M+', label: 'Potential Users' },
  { value: '10+', label: 'Indian Languages' },
  { value: '50+', label: 'Government Schemes' },
  { value: '24/7', label: 'Available' },
]

const languages = ['हिंदी', 'தமிழ்', 'తెలుగు', 'বাংলা', 'मराठी', 'ગુજરાતી', 'ಕನ್ನಡ', 'മലയാളം']

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">

      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 text-center">

        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/30 text-orange-400 text-sm px-4 py-2 rounded-full mb-6">
          <span>🏆</span>
          <span>AMD Slingshot 2026 — AI for Social Good</span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          AI that speaks
          <br />
          <span className="bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
            your language
          </span>
        </h1>

        {/* Subheading */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          SaathAI empowers rural and underprivileged Indians to access government schemes,
          healthcare guidance, and legal rights — just by speaking in their own language.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <Link
            to="/chat"
            className="flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white font-bold px-8 py-4 rounded-2xl text-lg transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105"
          >
            <span className="text-2xl">🎙️</span>
            <span>Try SaathAI Now</span>
          </Link>
          <Link
            to="/schemes"
            className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all duration-200 border border-gray-700"
          >
            <span>🏛️</span>
            <span>Browse Schemes</span>
          </Link>
        </div>

        {/* Language Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-4">
          {languages.map((lang) => (
            <span
              key={lang}
              className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-full text-sm font-medium hover:border-orange-500/50 hover:text-orange-400 transition-all cursor-default"
            >
              {lang}
            </span>
          ))}
        </div>
        <p className="text-gray-600 text-sm">and more languages coming soon...</p>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-12 border-y border-gray-800 bg-gray-900/50">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-extrabold bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-20 max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">Everything you need, in your language</h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Built for Bharat — not just for metros. SaathAI works for everyone, everywhere.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="bg-gray-900 border border-gray-800 hover:border-orange-500/40 rounded-2xl p-6 transition-all duration-200 hover:shadow-lg hover:shadow-orange-500/5 group"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-bold mb-2 group-hover:text-orange-400 transition-colors">
                {f.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-20 bg-gray-900/50 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">How SaathAI Works</h2>
          <p className="text-gray-400 mb-14 text-lg">Three simple steps. No literacy required.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🎙️', title: 'Tap & Speak', desc: 'Press the mic button and speak your question in your language.' },
              { step: '02', icon: '🤖', title: 'AI Understands', desc: 'SaathAI uses Gemini AI to understand your question and find the best answer.' },
              { step: '03', icon: '🔊', title: 'Hear the Answer', desc: 'Get a clear, simple answer spoken back to you in your own language.' },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="text-6xl font-black text-gray-800 mb-4">{item.step}</div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">
            Ready to make a difference?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join millions of Indians who deserve access to information that's rightfully theirs.
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-400 hover:to-pink-500 text-white font-bold px-10 py-5 rounded-2xl text-xl transition-all duration-200 shadow-lg shadow-orange-500/25 hover:scale-105"
          >
            <span className="text-2xl">🎙️</span>
            <span>Start Speaking to SaathAI</span>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 px-4 py-8 text-center text-gray-600 text-sm">
        <p>Built with ❤️ for Bharat · AMD Slingshot 2026 · AI for Social Good</p>
      </footer>

    </div>
  )
}