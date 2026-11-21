# 🎧 Shadowing - Master English Fluency

A modern, full-stack web application designed to accelerate English speaking fluency through the **Shadowing Method** (listen → repeat simultaneously → receive instant AI pronunciation feedback).

Built with Next.js 16 (App Router), React 19, Tailwind CSS v4, Prisma ORM, Neon PostgreSQL, Upstash Redis, and Google Gemini AI.

---

## ✨ Key Features

### 1️⃣ Smart Video Player
* **Video.js & YouTube Integration**: Seamless, buffer-free streaming of authentic native videos.
* **Playback Speed Control**: Flexible speed controls (0.5x to 1.5x) to match individual learning paces.

### 2️⃣ Interactive Transcript & Auto-Scroll
* **Synchronized Highlighting**: Automatically highlights and scrolls to the spoken line in real time.
* **Click-to-Seek**: Jump directly to any timestamp in the video by clicking on the transcript.

### 3️⃣ Instant Word Explorer & Pronunciation
* **Dictionary Popover**: Click on any word in the transcript to inspect definition, part of speech, synonyms, and external dictionary links (Oxford, Cambridge).
* **Audio Pronunciation**: Listen to standard US/UK pronunciations powered by Web Speech and Dictionary APIs.

### 4️⃣ Real-Time AI Voice Feedback
* **Speech Recording**: Capture voice directly in the browser with `MediaRecorder`.
* **Gemini AI Pronunciation Analysis**: Transcribe audio and calculate accuracy percentages against the target sentence in real time.

### 5️⃣ Smart Vocabulary & Flashcards
* **Vocabulary Bank**: Save unfamiliar words with one click for spaced review.
* **Interactive 3D Flashcards**: Test recall and practice with intelligent review queues.

### 6️⃣ Dynamic Category Discovery & Caching
* **Curated Channels**: Short Movies, Daily English, Business English, and IELTS Listening.
* **Upstash Redis Caching**: 24-hour API response caching to optimize YouTube API quota usage.

### 7️⃣ Authentication & Profile Management
* **NextAuth v5 (Auth.js) & Prisma ORM**: Secure credential-based registration and Google OAuth.
* **Neon PostgreSQL**: Scalable serverless database storing users, accounts, sessions, and vocabulary.

---

## 🚀 Tech Stack

* **Framework**: Next.js 16 (App Router, Turbopack) + React 19
* **Database & ORM**: Prisma 6 + Neon PostgreSQL
* **Caching**: Upstash Redis
* **Authentication**: NextAuth v5 + `@auth/prisma-adapter`
* **AI Engine**: Google Gemini API (`@google/generative-ai`)
* **Styling**: Tailwind CSS v4 (Railway Design System Tokens)
* **Animation**: Framer Motion
* **Video Player**: Video.js + `videojs-youtube`
* **Icons**: Lucide React

---

## 🛠️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/your-username/shadowing-app.git
cd shadowing-app
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://[user]:[password]@[neon-host]/[dbname]?sslmode=require"
AUTH_SECRET="your-auth-secret"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_TRUST_HOST=true

YOUTUBE_API_KEY="your-youtube-api-key"
UPSTASH_REDIS_REST_URL="your-upstash-redis-url"
UPSTASH_REDIS_REST_TOKEN="your-upstash-redis-token"
SUPADATA_API_KEY="your-supadata-api-key"
GEMINI_API_KEY="your-gemini-api-key"
```

### 4. Push database schema
```bash
npx prisma db push
```

### 5. Start the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.
