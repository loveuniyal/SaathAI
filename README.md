# 🌍 SaathAI — AI Companion for Every Indian

> **Empowering rural and underprivileged communities through voice-based AI — in their language, for their needs.**

[![AMD Slingshot](https://img.shields.io/badge/AMD%20Slingshot-AI%20for%20Social%20Good-red)](https://amdslingshot.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)
[![Live Demo](https://img.shields.io/badge/Live-Demo-green)](https://saathai.vercel.app)

---

## 🚨 The Problem

Over **65% of India's population** lives in rural areas. Every day, millions of people miss out on:

- 🏛️ **Government schemes** they're entitled to (PM Kisan, Ayushman Bharat, etc.)
- 🏥 **Basic healthcare guidance** due to no nearby doctors
- ⚖️ **Legal rights** they don't know they have

**Why?** Because they can't read complex documents, don't speak English, and have no one to guide them.

---

## 💡 Our Solution — SaathAI

SaathAI is a **voice-first, multilingual AI mobile web app** that acts as a personal guide for every Indian — regardless of literacy, language, or location.

Just **tap and speak** in your language. SaathAI listens, understands, and responds — in voice — with clear, simple, actionable information.

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🎙️ **Voice Input** | Speak in Hindi, Tamil, Telugu, Bengali, Marathi & more |
| 🤖 **AI-Powered Answers** | Powered by Google Gemini API for accurate, contextual responses |
| 🔊 **Voice Output** | AI speaks back the answer in the user's language |
| 🌐 **Multilingual** | Supports 10+ Indian regional languages via Google Translate API |
| 🏛️ **Government Schemes** | Browse and discover schemes you're eligible for |
| 🏥 **Health Assistant** | Symptom checker + nearest health center locator |
| ⚖️ **Legal Rights** | Know your rights in plain, simple language |
| 📱 **Mobile First** | Fully responsive, works on any smartphone |
| 🔐 **Phone Auth** | Simple OTP login — no email, no password needed |

---

## 🛠️ Tech Stack

### Frontend
- **React.js** — Component-based UI
- **Tailwind CSS** — Beautiful, responsive design
- **Web Speech API** — Browser-native voice input
- **React Router** — Multi-page navigation

### Backend
- **Node.js + Express.js** — RESTful API server
- **Google Gemini API** — AI brain for answering queries
- **Google Cloud Text-to-Speech** — Voice responses
- **Google Translate API** — Multilingual support

### Database & Auth
- **Firebase Firestore** — Realtime database for schemes & user data
- **Firebase Authentication** — Phone number OTP login

### Deployment
- **Vercel** — Frontend hosting
- **Render** — Backend hosting
- **Firebase** — Database & Auth

---

## 📁 Project Structure

```
SaathAI/
├── client/                        # React Frontend
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── VoiceInput.jsx      # Mic + voice recording
│   │   │   ├── ChatBox.jsx         # AI chat interface
│   │   │   ├── SchemeCard.jsx      # Government scheme cards
│   │   │   └── LanguageSelector.jsx # Language picker
│   │   ├── pages/
│   │   │   ├── Home.jsx            # Landing page
│   │   │   ├── Chat.jsx            # Voice + AI chat
│   │   │   ├── Schemes.jsx         # Government schemes
│   │   │   ├── Health.jsx          # Health assistant
│   │   │   └── Legal.jsx           # Legal rights
│   │   ├── firebase.js             # Firebase config
│   │   ├── App.jsx                 # Main app + routing
│   │   └── main.jsx                # Entry point
│   ├── .env                        # Environment variables
│   └── package.json
│
├── server/                        # Node.js Backend
│   ├── routes/
│   │   ├── ai.js                   # Gemini AI route
│   │   ├── schemes.js              # Schemes data route
│   │   └── translate.js            # Translation route
│   ├── controllers/
│   │   ├── aiController.js
│   │   └── schemesController.js
│   ├── index.js                    # Express server entry
│   ├── .env                        # Server env variables
│   └── package.json
│
├── README.md
└── .env.example
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- Google Cloud Account (for APIs)
- Firebase Account

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/SaathAI.git
cd SaathAI
```

### 2. Setup Backend
```bash
cd server
npm install
cp .env.example .env
# Fill in your API keys in .env
npm start
```

### 3. Setup Frontend
```bash
cd client
npm install
cp .env.example .env
# Fill in your Firebase config and backend URL
npm run dev
```

### 4. Environment Variables

**server/.env**
```
GEMINI_API_KEY=your_gemini_api_key
GOOGLE_TRANSLATE_KEY=your_translate_key
GOOGLE_TTS_KEY=your_tts_key
PORT=5000
```

**client/.env**
```
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_BACKEND_URL=http://localhost:5000
```

---

## 🎯 How It Works

```
User speaks in their language
        ↓
Web Speech API captures voice → converts to text
        ↓
Text sent to Node.js backend
        ↓
Google Translate converts to English (if needed)
        ↓
Gemini AI processes query → generates response
        ↓
Response translated back to user's language
        ↓
Google TTS converts response to audio
        ↓
User hears the answer in their own language 🎉
```

---

## 🌟 Impact

- 🇮🇳 **500M+** potential users across rural India
- 💰 **₹20 Lakh Crore+** in government schemes go unclaimed every year
- 🏥 **600M** Indians lack access to basic healthcare information
- ⚖️ **70%** of Indians are unaware of their fundamental legal rights

**SaathAI bridges this gap — one voice at a time.**

---

## 👥 Team

| Name | Role |
|---|---|
| [Your Name] | Product & Communication Lead |

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- AMD Slingshot for the opportunity
- Google Cloud for API access
- Firebase for backend infrastructure

---

> *"Technology is most powerful when it empowers everyone — not just the privileged few."*
> 
> **— Team SaathAI**