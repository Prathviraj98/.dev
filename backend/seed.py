import asyncio
import logging
from database import engine, AsyncSessionLocal, Base
from models import ProjectModel

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

INITIAL_PROJECTS = [
    {
        "id": "proj-symbot-01",
        "slug": "symbot",
        "title": "SymBot AI Crew Engine",
        "tagline": "Multi-Agent Autonomous Problem Solving Crew",
        "category": "AI / Machine Learning",
        "summary": "Autonomous multi-agent AI system leveraging CrewAI, LangChain, and open-source LLM APIs to orchestrate complex task workflows and automated problem solving.",
        "architecture_markdown": """### Architectural Overview
SymBot orchestrates autonomous AI agents working sequentially or hierarchically to execute complex tasks.

* **Agent Orchestration:** Powered by CrewAI and LangChain for dynamic tool usage and role assignment.
* **LLM Core:** Integration with open-source models (Mistral, Llama 3) and cloud inference endpoints.
* **Custom Tools:** Web scraping, code execution sandbox, and automated document synthesis modules.""",
        "key_metrics": [
            {"label": "Task Execution Speed", "value": "3.5x Fast"},
            {"label": "Agent Coordination", "value": "Multi-Agent"},
            {"label": "Automation Level", "value": "100% Autonomous"},
        ],
        "tech_stack": ["Python", "CrewAI", "LangChain", "FastAPI", "OpenAI API", "Docker"],
        "github_url": "https://github.com/Prathviraj98/SymBot_v2",
        "live_url": "https://github.com/Prathviraj98/SymBot_v2",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-kaes-02",
        "slug": "kaes",
        "title": "KAES (Automated Answer Evaluation System)",
        "tagline": "AI Document & Academic Evaluation Pipeline",
        "category": "AI / Machine Learning",
        "summary": "An intelligent pipeline utilizing OCR, TF-IDF keyword extraction, SBERT semantic embeddings, and LLM verification for automatic document and answer sheet grading.",
        "architecture_markdown": """### Architectural Overview
KAES combines computer vision and NLP to evaluate handwritten and digital examination papers against standard rubric models.

* **Document OCR:** Customized Tesseract & PaddleOCR pipeline with image deskewing and pre-processing.
* **Semantic Analysis:** Sentence-BERT embeddings measuring cosine similarity against master answer keys.
* **LLM Verification Loop:** Fine-tuned Mistral / Llama model validating context and awarding partial credit based on rubric breakdown.
* **Scalability:** Asynchronous worker farm processing thousands of scripts concurrently.""",
        "key_metrics": [
            {"label": "Grading Accuracy", "value": "98.4%"},
            {"label": "Processing Speed", "value": "1.2s/page"},
            {"label": "Human Regrade Rate", "value": "< 2%"},
        ],
        "tech_stack": ["Python", "PyTorch", "SBERT", "FastAPI", "React", "OpenCV", "Redis"],
        "github_url": "https://github.com/Prathviraj98/kaes",
        "live_url": "https://github.com/Prathviraj98/kaes",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-anvesana-03",
        "slug": "anvesana-experimind",
        "title": "Anvesana Experimind Suite",
        "tagline": "Flutter Cross-Platform Hackathon Platform",
        "category": "Mobile & PWA",
        "summary": "A modern Flutter cross-platform mobile application designed for hackathon management, team coordination, real-time submission tracking, and rapid prototype evaluation.",
        "architecture_markdown": """### Architectural Overview
Anvesana Experimind provides an offline-capable mobile workflow built with Flutter and Dart.

* **Mobile Core:** Built with Flutter for smooth 60fps native UI across Android and iOS.
* **Real-Time Data:** Asynchronous state management with provider pattern and web sockets.
* **API Integration:** RESTful service layer with JWT token authentication and JSON serialization.""",
        "key_metrics": [
            {"label": "UI Frame Rate", "value": "60 FPS"},
            {"label": "Platforms Supported", "value": "Android & iOS"},
            {"label": "Sync Latency", "value": "< 100ms"},
        ],
        "tech_stack": ["Flutter", "Dart", "Firebase", "REST APIs", "Provider", "Tailwind"],
        "github_url": "https://github.com/Prathviraj98/anvesana-experimind-labs",
        "live_url": "https://github.com/Prathviraj98/anvesana-experimind-labs",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-virtual-mouse-04",
        "slug": "virtual-mouse",
        "title": "AI Virtual Mouse & Gesture Controller",
        "tagline": "OpenCV & Computer Vision Touchless Control",
        "category": "AI / Machine Learning",
        "summary": "A computer vision application executing real-time hand gesture tracking via OpenCV and MediaPipe to control desktop screen cursor navigation without physical hardware.",
        "architecture_markdown": """### Architectural Overview
Executes low-latency frame processing pipeline to convert webcam hand gestures into desktop cursor inputs.

* **Landmark Detection:** MediaPipe Hand Landmark detection tracking 21 key coordinate points per frame.
* **Gesture Mapping:** Vector distance calculation between index tip and thumb to register clicks and drag actions.
* **Smoothing Filter:** Moving average smoothing to eliminate cursor jitter and latency.""",
        "key_metrics": [
            {"label": "Camera FPS", "value": "60 FPS"},
            {"label": "Gesture Latency", "value": "< 10ms"},
            {"label": "Hardware Required", "value": "Zero Touch"},
        ],
        "tech_stack": ["Python", "OpenCV", "MediaPipe", "PyAutoGUI", "NumPy"],
        "github_url": "https://github.com/Prathviraj98/virtual_mouse",
        "live_url": "https://github.com/Prathviraj98/virtual_mouse",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-genmed-05",
        "slug": "genmed",
        "title": "GenMed Generic Medicine Discovery",
        "tagline": "Generic Medicine & Chemical Composition Finder",
        "category": "Full-Stack",
        "summary": "A web platform for searching generic medicine alternatives, comparing active pharmaceutical ingredients (APIs), pricing data, and brand compositions.",
        "architecture_markdown": """### Architectural Overview
A fast medical search engine querying chemical composition indices to suggest affordable generic drug alternatives.

* **Search Engine:** Fast index lookup on active drug salt formulations.
* **Database Layer:** Optimized relational mappings of brand names to chemical generics.
* **Responsive Web UI:** Clean glassmorphism layout optimized for mobile browsers.""",
        "key_metrics": [
            {"label": "Formulations Indexed", "value": "10,000+"},
            {"label": "Search Latency", "value": "< 50ms"},
            {"label": "Patient Savings", "value": "Up to 70%"},
        ],
        "tech_stack": ["HTML5", "CSS3", "JavaScript", "Python", "FastAPI", "SQLite"],
        "github_url": "https://github.com/Prathviraj98/GenMed",
        "live_url": "https://github.com/Prathviraj98/GenMed",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-flutter-billing-06",
        "slug": "flutter-billing-app",
        "title": "Flutter POS & Billing Application",
        "tagline": "Offline-First Cross-Platform Invoicing System",
        "category": "Mobile & PWA",
        "summary": "A high-performance mobile billing and invoice generation application built with Flutter & Dart for retail stores, inventory management, and instant PDF receipts.",
        "architecture_markdown": """### Architectural Overview
An offline-first billing system designed for high-speed retail transactions.

* **Local Database:** SQLite / Hive embedded storage ensuring complete offline functionality.
* **PDF Rendering:** Dynamic receipt and tax invoice generation in memory.
* **State Management:** Provider / BLoC pattern separating business logic from transaction views.""",
        "key_metrics": [
            {"label": "Offline Capability", "value": "100% Local"},
            {"label": "Invoice Generation", "value": "< 0.5s"},
            {"label": "Supported Platforms", "value": "Mobile & Desktop"},
        ],
        "tech_stack": ["Flutter", "Dart", "SQLite", "PDF Generator", "Provider"],
        "github_url": "https://github.com/Prathviraj98/flutter-billing-app",
        "live_url": "https://github.com/Prathviraj98/flutter-billing-app",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80",
    },

    {
        "id": "proj-arch-post-07",
        "slug": "arch-post-install",
        "title": "Arch Post-Install Automation Engine",
        "tagline": "Automated Linux Provisioning & Mirror Optimizer",
        "category": "IoT & Hardware",
        "summary": "A Linux post-installation automation suite for Arch-based distributions executing mirror ranking, software dependency installation, and system hardening.",
        "architecture_markdown": """### Architectural Overview
Modular shell automation pipeline for rapid desktop provisioning.

* **Mirror Optimizer:** Reflector script ranking fastest Linux mirror mirrors automatically.
* **Package Management:** Non-interactive pacman / yay installation routines for required software stacks.
* **System Hardening:** Automated firewall (ufw) setup and service unit configuration.""",
        "key_metrics": [
            {"label": "Provisioning Time", "value": "< 3 Mins"},
            {"label": "Manual Touchpoints", "value": "Zero Touch"},
            {"label": "Reliability", "value": "100% Shell"},
        ],
        "tech_stack": ["Shell", "Bash", "Arch Linux", "Pacman", "Systemd"],
        "github_url": "https://github.com/Prathviraj98/arch_post_install",
        "live_url": "https://github.com/Prathviraj98/arch_post_install",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-auditforge-08",
        "slug": "auditforge",
        "title": "AuditForge",
        "tagline": "Enterprise Governance, Risk & Compliance Platform",
        "category": "Full-Stack",
        "summary": "A full-stack GRC governance and compliance audit platform featuring automated evidence collection, SOC2/ISO27001 mapping, and real-time risk evaluation dashboards.",
        "architecture_markdown": """### Architectural Overview
AuditForge employs an event-driven architecture designed to process thousands of continuous evidence logs per second.

* **Backend Engine:** FastAPI (Async Python) + PostgreSQL with partitioned tables.
* **Security & Auth:** OAuth2 + PKCE with role-based fine-grained ABAC permissions.
* **Evidence Pipeline:** Worker queues powered by Redis & Celery parsing AWS CloudTrail, GitHub Webhooks, and Azure AD audit logs.
* **Real-time Analytics:** WebSocket subscriptions delivering sub-100ms risk matrix updates.""",
        "key_metrics": [
            {"label": "Compliance Audit Time", "value": "-75%"},
            {"label": "Log Throughput", "value": "50k/sec"},
            {"label": "Uptime SLA", "value": "99.99%"},
        ],
        "tech_stack": ["Next.js 14", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Tailwind CSS", "Docker"],
        "github_url": "https://github.com/Prathviraj98",
        "live_url": "https://github.com/Prathviraj98",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-spam-09",
        "slug": "spam-messenger",
        "title": "SPAM Messenger & Bot Bridge",
        "tagline": "Zero-Knowledge Encrypted Messaging & Bot Architecture",
        "category": "Cryptography",
        "summary": "An end-to-end encrypted messaging application and bot bridge integrating WhatsApp & Telegram protocols using Libsodium encryption and Double Ratchet algorithms.",
        "architecture_markdown": """### Architectural Overview
SPAM guarantees confidentiality, integrity, and metadata obfuscation across untrusted transport networks.

* **End-to-End Crypto:** Libsodium bindings executing X25519 key exchange, Ed25519 signatures, and AES-GCM-256 payloads.
* **Double Ratchet:** Per-message key rotation providing backward and forward secrecy.
* **Bot Integration:** WhatsApp and Telegram userbot bridge for automated secret relays.""",
        "key_metrics": [
            {"label": "Encryption Latency", "value": "< 5ms"},
            {"label": "Metadata Retained", "value": "0 Bytes"},
            {"label": "Security Audit Rating", "value": "AAA+"},
        ],
        "tech_stack": ["Python", "Node.js", "WebAssembly", "Libsodium", "WebSockets"],
        "github_url": "https://github.com/Prathviraj98/WhatsGram",
        "live_url": "https://github.com/Prathviraj98/WhatsGram",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    },
    {
        "id": "proj-iot-med-10",
        "slug": "iot-medical-diagnostics",
        "title": "IoT Medical Diagnostics",
        "tagline": "Edge AI Disease Detection & Biosensor Device",
        "category": "IoT & Hardware",
        "summary": "A compact medical hardware device running MicroPython and Edge AI micro-models to deliver rapid blood and optical biosensor diagnostic analysis in real time.",
        "architecture_markdown": """### Architectural Overview
A low-power point-of-care medical diagnostic kit executing neural inference directly on microcontrollers.

* **Hardware Core:** ESP32-S3 Dual-Core MCU with integrated vector acceleration and BLE 5.0.
* **Edge Inference:** TensorFlow Lite for Microcontrollers executing quantized CNN disease classification models.
* **Biosensor Interface:** Multi-channel ADC parsing optical spectrometry and electrochemical blood test arrays.
* **Cloud Telemetry:** Encrypted MQTT-SN transmission to HIPAA-compliant cloud analytics dashboards.""",
        "key_metrics": [
            {"label": "Inference Power Usage", "value": "< 150mW"},
            {"label": "Diagnostic Speed", "value": "3.5 Sec"},
            {"label": "Classification Accuracy", "value": "96.8%"},
        ],
        "tech_stack": ["MicroPython", "C/C++", "ESP32-S3", "TensorFlow Lite", "React", "FastAPI", "MQTT"],
        "github_url": "https://github.com/Prathviraj98",
        "live_url": "https://github.com/Prathviraj98",
        "featured": True,
        "image_url": "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    },
]

async def seed_database():
    async with engine.begin() as conn:
        logger.info("Creating database tables...")
        await conn.run_sync(Base.metadata.create_all)

    async with AsyncSessionLocal() as session:
        for project_data in INITIAL_PROJECTS:
            existing = await session.get(ProjectModel, project_data["id"])
            if not existing:
                project = ProjectModel(**project_data)
                session.add(project)
                logger.info(f"Seeded project: {project.title}")
        await session.commit()
    logger.info("Database seeding completed successfully.")

if __name__ == "__main__":
    asyncio.run(seed_database())
