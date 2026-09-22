import logging
import urllib.request
import json
import asyncio
from typing import List, Dict, Any
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from models import ProjectModel

logger = logging.getLogger("github_sync")

GITHUB_USERNAME = "Prathviraj98"
GITHUB_REPOS_URL = f"https://api.github.com/users/{GITHUB_USERNAME}/repos?per_page=100&sort=updated"

def get_relevant_project_image(name: str, description: str = "", category: str = "") -> str:
    s = f"{name} {description} {category}".lower()

    if any(k in s for k in ["ipl", "score", "cricket", "sports"]):
        return "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["symbot", "jenny", "crewai", "langchain", "agent"]):
        return "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["kaes", "eval", "paper", "exam", "rubric", "math"]):
        return "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["mouse", "gesture", "opencv", "vision"]):
        return "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["genmed", "medicine", "pharma", "drug"]):
        return "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["billing", "pos", "ecom", "invoice", "retail"]):
        return "https://images.unsplash.com/photo-1556740758-90de374c12ad?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["arch", "post_install", "linux", "titus", "shell"]):
        return "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["search", "streamlit", "find"]):
        return "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["anvesana", "flutter", "mobile", "pwa"]):
        return "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["spam", "whatsgram", "telegram", "chat", "crypto"]):
        return "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["audit", "compliance", "grc"]):
        return "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80"
    if any(k in s for k in ["iot", "medical", "sensor", "microg"]):
        return "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80"

    return "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80"

def determine_category_and_stack(repo: Dict[str, Any]):
    name = (repo.get("name") or "").lower()
    desc = (repo.get("description") or "").lower()
    lang = repo.get("language") or ""

    tech_stack = []
    if lang:
        tech_stack.append(lang)

    if "flutter" in name or "dart" in lang.lower() or "ecom" in name or "mobile" in desc or "app" in desc:
        category = "Mobile & PWA"
        if "Flutter" not in tech_stack: tech_stack.append("Flutter")
        if "Dart" not in tech_stack: tech_stack.append("Dart")
    elif any(k in name or k in desc for k in ["symbot", "kaes", "eval", "ai", "crew", "mouse", "vision", "gpt", "model", "search"]):
        category = "AI / Machine Learning"
        if "Python" not in tech_stack: tech_stack.append("Python")
    elif "gram" in name or "crypto" in desc or "bot" in name or "secret" in desc:
        category = "Cryptography"
        if "WebSockets" not in tech_stack: tech_stack.append("WebSockets")
    elif "arch" in name or "post_install" in name or "iot" in desc or "script" in desc:
        category = "IoT & Hardware"
        if "Shell" not in tech_stack: tech_stack.append("Shell")
    else:
        category = "Full-Stack"
        if "FastAPI" not in tech_stack: tech_stack.append("FastAPI")

    return category, tech_stack

def fetch_github_repos_sync() -> List[Dict[str, Any]]:
    req = urllib.request.Request(
        GITHUB_REPOS_URL,
        headers={"User-Agent": "Mozilla/5.0 (Python/FastAPI GitHub AutoSync)"}
    )
    with urllib.request.urlopen(req) as response:
        return json.loads(response.read().decode())

async def sync_github_projects(db: AsyncSession) -> int:
    try:
        logger.info(f"Connecting to GitHub API to sync repositories for user {GITHUB_USERNAME}...")
        repos = await asyncio.to_thread(fetch_github_repos_sync)
        logger.info(f"Fetched {len(repos)} repositories from GitHub.")

        synced_count = 0

        for repo in repos:
            repo_name = repo["name"]
            if repo.get("fork") or repo.get("private") or repo_name.lower() == GITHUB_USERNAME.lower():
                continue

            slug = repo_name.lower().replace("_", "-").replace(".", "-")
            title = repo_name.replace("_", " ").replace("-", " ").title()
            description = repo.get("description") or f"Public GitHub repository: {title} by {GITHUB_USERNAME}."
            
            category, tech_stack = determine_category_and_stack(repo)
            image_url = get_relevant_project_image(repo_name, description, category)

            architecture_markdown = f"""### Architectural Overview & Repository Specs
Synced live from GitHub repository `https://github.com/{GITHUB_USERNAME}/{repo_name}`.

* **Repository:** [{repo['full_name']}]({repo['html_url']})
* **Default Branch:** `{repo.get('default_branch', 'main')}`
* **Language:** `{repo.get('language') or 'Multi-Language'}`
* **Description:** {description}"""

            key_metrics = []

            # Check if project exists in DB
            query = select(ProjectModel).where(ProjectModel.slug == slug)
            result = await db.execute(query)
            existing = result.scalar_one_or_none()

            if existing:
                existing.title = title
                existing.summary = description
                existing.github_url = repo["html_url"]
                existing.live_url = repo.get("homepage") if (repo.get("homepage") and "github.com" not in repo.get("homepage")) else None
                existing.tech_stack = tech_stack
                existing.category = category
                existing.key_metrics = key_metrics
                existing.architecture_markdown = architecture_markdown
                existing.image_url = image_url
            else:
                new_project = ProjectModel(
                    id=f"gh-{repo['id']}",
                    slug=slug,
                    title=title,
                    tagline=f"GitHub Repository: {title}",
                    category=category,
                    summary=description,
                    architecture_markdown=architecture_markdown,
                    key_metrics=key_metrics,
                    tech_stack=tech_stack,
                    github_url=repo["html_url"],
                    live_url=repo.get("homepage") if (repo.get("homepage") and "github.com" not in repo.get("homepage")) else None,
                    featured=True,
                    image_url=image_url,
                )
                db.add(new_project)
            
            synced_count += 1

        await db.commit()
        logger.info(f"Successfully synced {synced_count} GitHub repositories into database.")
        return synced_count

    except Exception as e:
        logger.error(f"Error syncing GitHub repositories: {e}")
        return 0
