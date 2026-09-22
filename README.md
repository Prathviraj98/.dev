# .DEV — Premium Freelancing & Portfolio Web Application


An ultra-modern, high-performance freelancing and portfolio web application built with Next.js 14 App Router, Three.js / React Three Fiber interactive 3D WebGL background, Framer Motion, Lenis smooth scrolling, FastAPI (Python), PostgreSQL, and Redis caching.

---

## Technical Stack Architecture

- **Frontend:** Next.js 14 (App Router, TypeScript), Tailwind CSS, Glassmorphism design theme.
- **3D & Canvas:** Three.js / R3F custom WebGL canvas featuring locked 60fps particle mesh network reacting dynamically to cursor movement with GLSL terrain waves.
- **Animations & Motion:** Framer Motion for micro-interactions, 3D tilt perspective cards, Lenis for smooth momentum scrolling.
- **Backend API:** FastAPI (Python 3.11) with async routing, Pydantic v2 validation, and CORS middleware.
- **Database & ORM:** PostgreSQL 16 managed via SQLAlchemy 2.0 async ORM with initial seed data.
- **Caching & Rate-Limiting:** Redis 7 caching project catalog responses and rate-limiting contact form submissions.
- **Containerization:** Docker & Docker Compose setup for local and production deployment.

---

## Initial Project Catalog (Pre-Seeded)

1. **AuditForge**: Enterprise GRC governance, risk & compliance audit web application.
2. **KAES (Automated Answer Evaluation System)**: AI document pipeline leveraging OCR, TF-IDF, SBERT embeddings, and LLM rubric verification.
3. **CitizenVoice**: Geospatial PWA for civic issue reporting, PostGIS verification, and municipal ticket routing.
4. **SPAM (Secure Private Anonymous Messenger)**: Zero-knowledge end-to-end encrypted messaging engine using Libsodium and Double Ratchet.
5. **IoT Medical Diagnostics**: MicroPython edge AI diagnostic device executing neural inference on ESP32-S3 microcontrollers.

---

## Directory Structure

```
.
├── docker-compose.yml
├── README.md
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── src/
│       ├── app/
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   ├── 3d/
│       │   │   └── Background3D.tsx
│       │   ├── ui/
│       │   │   ├── Navbar.tsx
│       │   │   ├── HeroSection.tsx
│       │   │   ├── TerminalShowcase.tsx
│       │   │   ├── CapabilitiesSection.tsx
│       │   │   ├── ProjectCard.tsx
│       │   │   ├── ProjectGrid.tsx
│       │   │   ├── ProjectModal.tsx
│       │   │   ├── ContactSection.tsx
│       │   │   └── Footer.tsx
│       │   └── providers/
│       │       └── SmoothScrollProvider.tsx
│       ├── lib/
│       │   ├── api.ts
│       │   └── utils.ts
│       └── types/
│           └── index.ts
└── backend/
    ├── Dockerfile
    ├── requirements.txt
    ├── main.py
    ├── config.py
    ├── database.py
    ├── models.py
    ├── schemas.py
    ├── seed.py
    └── routes/
        ├── projects.py
        └── contact.py
```

---

## Quick Start (Docker Compose)

Run the entire application (Frontend, Backend, PostgreSQL, and Redis) with a single command:

```bash
docker compose up --build
```

- **Frontend Application:** `http://localhost:3000`
- **FastAPI Documentation:** `http://localhost:8000/docs`
- **API Healthcheck:** `http://localhost:8000/health`

---

## Local Development Setup

### 1. Backend Setup (FastAPI)

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python main.py
```

To seed initial projects into PostgreSQL:

```bash
python seed.py
```

### 2. Frontend Setup (Next.js)

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

- `GET /api/v1/projects`: Retrieves all project case studies (cached in Redis).
- `GET /api/v1/projects/{slug}`: Retrieves detailed case study architecture markdown.
- `POST /api/v1/contact`: Submits a client inquiry (validated and rate-limited).
