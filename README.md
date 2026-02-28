# 🌍 SaathAI — AI Companion for Every Indian

> **Empowering rural and underprivileged communities through voice-based AI — in their language, for their needs.**

---

## 🚨 The Problem

Over **65% of India's population** lives in rural areas. Every day, millions of people miss out on:

- 🏛️ **Government schemes** they're entitled to (PM Kisan, Ayushman Bharat, etc.)
- 🏥 **Basic healthcare guidance** due to no nearby doctors
- ⚖️ **Legal rights** they don't know they have

**Why?** Because they can't read complex documents, don't speak English, and have no one to guide them.

---

## 💡 Our Solution — SaathAI

SaathAI is a **voice-first, multilingual AI web app** that acts as a personal guide for every Indian — regardless of literacy, language, or location.

Just **tap and speak** in your language. SaathAI listens, understands, and responds — in voice — with clear, simple, actionable information.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎙️ **Voice Input** | Speak in Hindi, Tamil, Telugu, Bengali, Marathi, Gujarati, Kannada, Malayalam & English |
| 🤖 **AI-Powered Chat** | Powered by Sarvam-M — purpose-built for Indian languages (**FREE**) |
| 🔊 **Voice Output** | Sarvam Bulbul v2 speaks the answer naturally in the user's language |
| 🌐 **Multilingual** | 9 Indian languages with real-time language switching |
| 🏛️ **Government Schemes** | Discover schemes you're eligible for (PM Kisan, Ayushman Bharat, PM Awas Yojana, etc.) |
| 🏥 **Health Assistant** | Basic health guidance in simple, plain language |
| ⚖️ **Legal Rights** | Know your rights — explained simply |
| 📱 **Mobile First** | Fully responsive, works on any smartphone |

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite 7** — Fast, modern UI
- **Tailwind CSS 4** — Responsive, utility-first design
- **React Router 7** — Multi-page navigation
- **MediaRecorder API** — Browser-native voice recording

### Backend
- **Node.js + Express 5** — RESTful API server
- **Sarvam-M** — AI chat, purpose-built for Indian languages (**FREE**)
- **Groq Whisper** (`whisper-large-v3`) — Speech-to-text transcription (**FREE tier**)
- **Sarvam Bulbul v2** — Natural Indian language TTS (free ₹1000 signup credits)

### Deployment
- **Vercel** — Frontend at [saath-ai.vercel.app](https://saath-ai.vercel.app)
- **Render** — Backend at [saathai.onrender.com](https://saathai.onrender.com)

---

## 📁 Project Structure

```
SaathAI/
├── client/                        # React + Vite Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Chat.jsx            # Voice + AI chat (main feature)
│   │   │   ├── Schemes.jsx         # Government schemes browser
│   │   │   ├── Health.jsx          # Health assistant
│   │   │   └── Legal.jsx           # Legal rights info
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── server/                        # Node.js + Express Backend
│   ├── index.js                   # All API routes (chat, transcribe, tts)
│   ├── .env                       # API keys — NOT committed to git
│   └── package.json
│
├── vercel.json                    # Vercel SPA + build config
├── .env.example                   # Template for required env variables
├── SETUP.md                       # Full local setup guide
└── README.md
```

---

## 🔄 How It Works

```
User speaks in their language
        ↓
MediaRecorder captures audio → sent to /api/transcribe
        ↓
Groq Whisper converts speech to text (FREE)
        ↓
Text + conversation history sent to /api/chat
        ↓
Sarvam-M generates a response in the user's chosen language (FREE)
        ↓
Response text sent to /api/tts
        ↓
Sarvam Bulbul v2 converts to audio → plays in browser 🔊
```

---

## 🚀 Quick Start

See [SETUP.md](SETUP.md) for the full step-by-step local setup guide including API key registration.

**Short version:**
```bash
git clone https://github.com/loveuniyal/SaathAI.git
cd SaathAI

# Backend
cd server
npm install
# Create server/.env (see SETUP.md for required keys)
node index.js

# Frontend — open a new terminal
cd client
npm install
# Create client/.env with VITE_API_URL=http://localhost:5000
npm run dev
```

---

## 🌟 Impact

- 🇮🇳 **500M+** potential users across rural India
- 💰 **₹20 Lakh Crore+** in government schemes go unclaimed every year
- 🏥 **600M** Indians lack access to basic healthcare information
- ⚖️ **70%** of Indians are unaware of their fundamental legal rights

**SaathAI bridges this gap — one voice at a time.**

---

## 👤 Author

**Love Uniyal**
📧 [loveuniyal381984@gmail.com](mailto:loveuniyal381984@gmail.com)
🐙 [github.com/loveuniyal](https://github.com/loveuniyal)

---

## 🙏 Acknowledgements

- [AMD Slingshot](https://amdslingshot.com) for the opportunity
- [Sarvam AI](https://sarvam.ai) for Indian-language AI APIs
- [Groq](https://groq.com) for ultra-fast Whisper transcription

---

> *"Technology is most powerful when it empowers everyone — not just the privileged few."*
>
> **— Love Uniyal, SaathAI**
