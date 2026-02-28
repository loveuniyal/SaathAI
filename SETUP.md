# 🛠️ SaathAI — Local Setup Guide

Complete step-by-step instructions to run SaathAI on your local machine.

---

## Prerequisites

- **Node.js v18+** — [Download here](https://nodejs.org)
- **npm** (comes with Node.js)
- **Git** — [Download here](https://git-scm.com)
- A browser with microphone access (Chrome recommended)

---

## Step 1 — Clone the Repository

```bash
git clone https://github.com/loveuniyal/SaathAI.git
cd SaathAI
```

---

## Step 2 — Get Your API Keys

You need **2 API keys**. Both have free tiers — no credit card needed.

### A) Groq API Key (for Speech-to-Text)
> Used for: transcribing voice input via Whisper large-v3 — **completely FREE**

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up / log in
3. Click **API Keys** in the sidebar
4. Click **Create API Key**
5. Copy the key — starts with `gsk_...`

### B) Sarvam AI API Key (for Chat + Text-to-Speech)
> Used for: Sarvam-M chat (**FREE forever**) + Bulbul v2 TTS (free ₹1000 signup credits)

1. Go to [https://dashboard.sarvam.ai](https://dashboard.sarvam.ai)
2. Sign up with your email
3. You'll receive **₹1000 free credits** on signup
4. Go to **API Keys** section
5. Create a new key and copy it — starts with `sk_...`

---

## Step 3 — Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```bash
# Windows
copy NUL .env

# Mac/Linux
touch .env
```

Open `server/.env` and add:

```env
GROQ_API_KEY=gsk_your_groq_key_here
SARVAM_API_KEY=sk_your_sarvam_key_here
PORT=5000
```

Start the backend server:

```bash
node index.js
```

You should see:
```
SARVAM_API_KEY loaded: true
✅ Server running on port 5000
```

Test it by opening [http://localhost:5000](http://localhost:5000) in your browser — you should see a JSON status response.

---

## Step 4 — Setup the Frontend

Open a **new terminal** (keep the backend running):

```bash
cd client
npm install
```

Create a `.env` file inside the `client/` folder:

```bash
# Windows
copy NUL .env

# Mac/Linux
touch .env
```

Open `client/.env` and add:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Step 5 — Test the App

1. Go to [http://localhost:5173/chat](http://localhost:5173/chat)
2. Type a message like **"PM Kisan Yojana kya hai?"** and press Send
3. The app should respond with an answer in Hindi
4. Click the mic button — speak — it should transcribe and auto-send
5. The response should be read aloud by Sarvam Bulbul voice

---

## Project Structure Summary

```
SaathAI/
├── client/          → React + Vite frontend (npm run dev → port 5173)
├── server/          → Express backend     (node index.js → port 5000)
├── .env.example     → Template for env variables
├── SETUP.md         → This file
└── README.md        → Project overview
```

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/` | GET | Health check — confirms server is running |
| `/api/chat` | POST | Send message → get AI reply from Sarvam-M |
| `/api/transcribe` | POST | Upload audio → get text transcript from Groq Whisper |
| `/api/tts` | POST | Send text → get base64 audio from Sarvam Bulbul |

---

## Deployment (Optional)

### Frontend → Vercel
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import repository
3. Add environment variable: `VITE_API_URL` = `https://your-render-url.onrender.com`
4. Deploy

### Backend → Render
1. Go to [render.com](https://render.com) → New Web Service → Connect GitHub repo
2. Set **Root Directory** to `server`
3. Set **Build Command** to `npm install`
4. Set **Start Command** to `node index.js`
5. Add environment variables:
   - `GROQ_API_KEY` = your Groq key
   - `SARVAM_API_KEY` = your Sarvam key
6. Deploy

> **Note:** Render free tier sleeps after 15 minutes of inactivity. First request after idle may take 15–30 seconds (cold start). The app handles this automatically with a retry and "Server waking up..." message.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `SARVAM_API_KEY loaded: false` | Check that `server/.env` exists and has the correct key |
| Mic not working | Allow microphone permission in browser; use Chrome/Edge |
| `माफ़ कीजिए, दोबारा पूछें` response | Check Render logs for errors; may be a cold start — wait 15s and retry |
| Frontend shows blank page | Make sure `VITE_API_URL` points to running backend |
| Port 5000 already in use | Change `PORT=5001` in `server/.env` and update `VITE_API_URL` |

---

## Contact

**Love Uniyal**
📧 [loveuniyal381984@gmail.com](mailto:loveuniyal381984@gmail.com)
🐙 [github.com/loveuniyal](https://github.com/loveuniyal)
