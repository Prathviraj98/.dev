'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Copy, Check, Play, FileCode2, Layers, Cpu, Database } from 'lucide-react';

interface CodeTab {
  id: string;
  name: string;
  language: string;
  icon: any;
  code: string;
  output: string;
}

const TABS: CodeTab[] = [
  {
    id: 'audit',
    name: 'audit_engine.rs',
    language: 'rust',
    icon: FileCode2,
    code: `// AuditForge Cryptographic Evidence Logger
use sha2::{Sha256, Digest};
use tokio::sync::mpsc;

pub struct AuditRecord {
    pub id: String,
    pub timestamp: u64,
    pub payload_hash: String,
}

impl AuditRecord {
    pub async fn verify_chain(&self, previous_hash: &str) -> bool {
        let mut hasher = Sha256::new();
        hasher.update(self.payload_hash.as_bytes());
        hasher.update(previous_hash.as_bytes());
        let result = format!("{:x}", hasher.finalize());
        result.starts_with("0000") // Zero-knowledge proof verification
    }
}`,
    output: `[INFO] Initializing AuditForge Cryptographic Engine v2.4...
[SUCCESS] Verification pipeline connected to Redis channel #audit_log
[BENCHMARK] Hash validation rate: 142,500 logs/sec (Zero Data Tampering)`,
  },
  {
    id: 'kaes',
    name: 'kaes_eval.py',
    language: 'python',
    icon: Cpu,
    code: `from sentence_transformers import SentenceTransformer, util
import torch

class KAESEvaluator:
    def __init__(self, model_name: str = "all-mpnet-base-v2"):
        self.model = SentenceTransformer(model_name)
    
    async def score_answer(self, student_submission: str, rubric_key: str) -> float:
        embeddings = self.model.encode([student_submission, rubric_key], convert_to_tensor=True)
        cosine_score = util.cos_sim(embeddings[0], embeddings[1])
        return round(float(cosine_score[0][0]) * 100, 2)`,
    output: `[INFO] Model loaded: SentenceTransformer("all-mpnet-base-v2") on CUDA:0
[EVALUATION] Comparing submission ID #8492 against Rubric Key
[RESULT] Cosine Similarity Score: 98.4% (Grade: A+)`,
  },
  {
    id: 'redis',
    name: 'fastapi_cache.py',
    language: 'python',
    icon: Database,
    code: `from fastapi import FastAPI, Depends
from redis.asyncio import Redis

app = FastAPI()
redis = Redis(host="redis", port=6379, db=0, decode_responses=True)

@app.get("/api/v1/projects")
async def get_projects():
    cached = await redis.get("projects_catalog")
    if cached:
        return {"source": "redis_cache", "data": json.loads(cached)}
    
    projects = await db.fetch_all_projects()
    await redis.set("projects_catalog", json.dumps(projects), ex=3600)
    return {"source": "postgresql", "data": projects}`,
    output: `[HIT] Redis Cache hit for key "projects_catalog" (Latency: 1.4ms)
[STATUS] 200 OK | Response Time: 0.0014s | Compression: Gzip`,
  },
];

export default function TerminalShowcase() {
  const [activeTabId, setActiveTabId] = useState<string>('audit');
  const [copied, setCopied] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [showOutput, setShowOutput] = useState(true);

  const activeTab = TABS.find((t) => t.id === activeTabId) || TABS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeTab.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRun = () => {
    setExecuting(true);
    setShowOutput(false);
    setTimeout(() => {
      setExecuting(false);
      setShowOutput(true);
    }, 600);
  };

  return (
    <div className="w-full max-w-5xl mx-auto glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
      {/* Terminal Header Bar */}
      <div className="px-4 py-3 bg-slate-950/80 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-rose-500/80" />
          <div className="w-3 h-3 rounded-full bg-amber-500/80" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="text-xs font-mono text-slate-400 ml-2 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            dotdev-architecture-lab -- bash
          </span>

        </div>

        {/* Tab Selection buttons */}
        <div className="flex items-center space-x-1">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTabId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                  isActive
                    ? 'bg-primary/20 text-cyan-300 border border-primary/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-6 bg-slate-950/90 font-mono text-xs sm:text-sm text-slate-200 leading-relaxed overflow-x-auto relative min-h-[260px]">
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <button
            onClick={handleRun}
            disabled={executing}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 text-xs font-sans font-medium transition-all"
          >
            <Play className={`w-3.5 h-3.5 ${executing ? 'animate-spin' : ''}`} />
            <span>{executing ? 'Executing...' : 'Run Code'}</span>
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-lg glass-card text-slate-400 hover:text-white transition-colors"
            title="Copy Code"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        <pre className="text-slate-300 font-mono select-text">
          <code>{activeTab.code}</code>
        </pre>
      </div>

      {/* Simulated Execution Output Box */}
      <AnimatePresence mode="wait">
        {showOutput && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-6 py-4 bg-black/70 border-t border-white/10 font-mono text-xs"
          >
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="flex items-center gap-1.5 text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                Execution Log Output
              </span>
              <span className="text-[10px]">Environment: Production sandbox</span>
            </div>
            <p className="text-emerald-400 whitespace-pre-wrap leading-relaxed">
              {activeTab.output}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
