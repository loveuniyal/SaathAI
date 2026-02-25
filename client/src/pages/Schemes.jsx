import { useState } from 'react'

const schemes = [
  {
    id: 1,
    name: 'PM Kisan Samman Nidhi',
    category: 'Agriculture',
    icon: '🌾',
    benefit: '₹6,000 per year',
    description: 'Financial assistance to small and marginal farmers with less than 2 hectares of land.',
    eligibility: ['Small/marginal farmer', 'Land less than 2 hectares', 'Annual income below ₹1 lakh'],
    howToApply: 'Visit nearest Common Service Centre (CSC) or apply at pmkisan.gov.in',
    color: 'green',
  },
  {
    id: 2,
    name: 'Ayushman Bharat PM-JAY',
    category: 'Health',
    icon: '🏥',
    benefit: '₹5 lakh health cover',
    description: 'Health insurance coverage of ₹5 lakh per family per year for secondary and tertiary care.',
    eligibility: ['BPL family', 'SECC database listed', 'No existing health insurance'],
    howToApply: 'Visit nearest empanelled hospital or CSC with Aadhaar card',
    color: 'blue',
  },
  {
    id: 3,
    name: 'PM Awas Yojana (Gramin)',
    category: 'Housing',
    icon: '🏠',
    benefit: '₹1.2-1.3 lakh assistance',
    description: 'Financial assistance for construction of pucca houses for rural homeless families.',
    eligibility: ['Homeless or kutcha house', 'BPL family', 'No previous housing scheme benefit'],
    howToApply: 'Apply through Gram Panchayat or at pmayg.nic.in',
    color: 'orange',
  },
  {
    id: 4,
    name: 'Ujjwala Yojana',
    category: 'Energy',
    icon: '🔥',
    benefit: 'Free LPG connection',
    description: 'Free LPG gas connection to women from BPL households to replace traditional cooking fuels.',
    eligibility: ['Woman from BPL family', 'No existing LPG connection', 'Age 18 or above'],
    howToApply: 'Apply at nearest LPG distributor with Aadhaar and BPL card',
    color: 'yellow',
  },
  {
    id: 5,
    name: 'Jan Dhan Yojana',
    category: 'Banking',
    icon: '🏦',
    benefit: 'Zero balance bank account',
    description: 'Zero balance savings account with RuPay debit card, ₹1 lakh accident insurance.',
    eligibility: ['Indian citizen', 'Age 10 or above', 'No existing bank account'],
    howToApply: 'Visit any nationalized bank with Aadhaar and PAN card',
    color: 'purple',
  },
  {
    id: 6,
    name: 'Scholarship for SC/ST Students',
    category: 'Education',
    icon: '📚',
    benefit: 'Full tuition + stipend',
    description: 'Post-matric scholarship for SC/ST students to pursue higher education.',
    eligibility: ['SC/ST student', 'Post-matric level', 'Family income below ₹2.5 lakh'],
    howToApply: 'Apply at scholarships.gov.in before deadline every year',
    color: 'pink',
  },
  {
    id: 7,
    name: 'MGNREGA',
    category: 'Employment',
    icon: '👷',
    benefit: '100 days employment/year',
    description: 'Guarantees 100 days of wage employment per year to rural households.',
    eligibility: ['Rural household member', 'Age 18 or above', 'Willing to do unskilled manual work'],
    howToApply: 'Register at Gram Panchayat with Aadhaar and bank account details',
    color: 'teal',
  },
  {
    id: 8,
    name: 'Sukanya Samriddhi Yojana',
    category: 'Women',
    icon: '👧',
    benefit: '8.2% interest savings',
    description: 'High interest savings scheme for girl child education and marriage expenses.',
    eligibility: ['Girl child below 10 years', 'Indian resident', 'Only 2 accounts per family'],
    howToApply: 'Open account at any post office or nationalized bank',
    color: 'rose',
  },
]

const categories = ['All', 'Agriculture', 'Health', 'Housing', 'Energy', 'Banking', 'Education', 'Employment', 'Women']

const colorMap = {
  green: 'border-green-500/30 hover:border-green-500/60',
  blue: 'border-blue-500/30 hover:border-blue-500/60',
  orange: 'border-orange-500/30 hover:border-orange-500/60',
  yellow: 'border-yellow-500/30 hover:border-yellow-500/60',
  purple: 'border-purple-500/30 hover:border-purple-500/60',
  pink: 'border-pink-500/30 hover:border-pink-500/60',
  teal: 'border-teal-500/30 hover:border-teal-500/60',
  rose: 'border-rose-500/30 hover:border-rose-500/60',
}

const badgeColorMap = {
  green: 'bg-green-500/10 text-green-400',
  blue: 'bg-blue-500/10 text-blue-400',
  orange: 'bg-orange-500/10 text-orange-400',
  yellow: 'bg-yellow-500/10 text-yellow-400',
  purple: 'bg-purple-500/10 text-purple-400',
  pink: 'bg-pink-500/10 text-pink-400',
  teal: 'bg-teal-500/10 text-teal-400',
  rose: 'bg-rose-500/10 text-rose-400',
}

export default function Schemes() {
  const [selected, setSelected] = useState(null)
  const [category, setCategory] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = schemes.filter(s => {
    const matchCat = category === 'All' || s.category === category
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-3">🏛️ Government Schemes</h1>
          <p className="text-gray-400 text-lg">Discover schemes you are eligible for</p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="🔍 Search schemes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 text-white placeholder-gray-500 px-4 py-3 rounded-xl focus:outline-none focus:border-orange-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 flex-wrap mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all
                ${category === cat
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(scheme => (
            <div
              key={scheme.id}
              onClick={() => setSelected(scheme)}
              className={`bg-gray-900 border rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:shadow-lg ${colorMap[scheme.color]}`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{scheme.icon}</div>
                <span className={`text-xs px-3 py-1 rounded-full font-medium ${badgeColorMap[scheme.color]}`}>
                  {scheme.category}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2">{scheme.name}</h3>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">{scheme.description}</p>
              <div className="bg-gray-800 rounded-xl px-4 py-2 text-center">
                <span className="text-green-400 font-bold text-sm">💰 {scheme.benefit}</span>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center text-gray-500 py-20">
            <div className="text-5xl mb-4">🔍</div>
            <p>No schemes found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={() => setSelected(null)}>
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-lg w-full max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-4xl">{selected.icon}</span>
                <h2 className="text-xl font-bold">{selected.name}</h2>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-white text-2xl">✕</button>
            </div>

            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
                <p className="text-green-400 font-bold text-lg">💰 Benefit: {selected.benefit}</p>
              </div>

              <div>
                <h3 className="font-bold mb-2 text-orange-400">📋 About</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{selected.description}</p>
              </div>

              <div>
                <h3 className="font-bold mb-2 text-orange-400">✅ Eligibility</h3>
                <ul className="space-y-1">
                  {selected.eligibility.map((e, i) => (
                    <li key={i} className="text-gray-300 text-sm flex items-center gap-2">
                      <span className="text-green-400">•</span> {e}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="font-bold mb-2 text-orange-400">📝 How to Apply</h3>
                <p className="text-gray-300 text-sm leading-relaxed">{selected.howToApply}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}