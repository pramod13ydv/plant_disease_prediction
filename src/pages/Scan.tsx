import { useState, useRef } from "react";
import {
  Camera, Image as ImageIcon, UploadCloud, X, Loader2,
  ShieldCheck, AlertTriangle, BrainCircuit, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Prediction {
  class: string;
  confidence: number;
  healthy: boolean;
  details?: {
    treatment?: string;
    cause?: string;
    severity?: string;
  };
  message?: string;
}

export default function Scan() {
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const f = e.dataTransfer.files[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  };

  const handleFile = (file: File) => {
    setSelectedFile(file);
    setResult(null);
    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setPreview(null);
    setSelectedFile(null);
    setResult(null);
    setError(null);
    setProgress(0);
  };

  const startScan = async () => {
    if (!selectedFile) return;
    setIsScanning(true);
    setProgress(0);

    const tick = setInterval(() => {
      setProgress((p) => (p >= 88 ? p : p + 4));
    }, 200);

    try {
      const fd = new FormData();
      fd.append("file", selectedFile);
      const res = await fetch("/predict", {
        method: "POST",
        body: fd,
      });
      const data: Prediction = await res.json();
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => { setIsScanning(false); setResult(data); }, 400);
    } catch {
      clearInterval(tick);
      setProgress(100);
      setTimeout(() => {
        setIsScanning(false);
        setError("Could not connect to the Medisight FastAPI backend. Make sure main.py is running on port 8000.");
      }, 400);
    }
  };

  const severityColor = (s: string) =>
    s === "High" ? "text-red-400 bg-red-500/10 border-red-500/30"
      : s === "Moderate" ? "text-amber-400 bg-amber-500/10 border-amber-500/30"
        : "text-emerald-400 bg-emerald-500/10 border-emerald-500/30";

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-700">

      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-emerald-400">
          Plant Specimen Scan
        </h1>
        <p className="text-white/60 text-lg">
          Upload a clear photo of a leaf — our Neural Insight engine will provide a premium diagnosis and treatment plan.
        </p>
      </div>

      {/* Card */}
      <div className="rounded-3xl bg-black/40 backdrop-blur-xl border border-white/10 p-4 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/10 blur-[120px] pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* ── Drop zone ── */}
          {!preview && (
            <motion.div
              key="upload"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="border-2 border-dashed border-white/20 hover:border-emerald-500/50 hover:bg-white/[0.02] rounded-3xl p-12 text-center transition-colors duration-300 relative z-10"
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
            >
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 mb-6 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                <UploadCloud className="h-10 w-10 text-emerald-400" strokeWidth={1.5} />
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">Upload Specimen</h3>
              <p className="text-sm text-white/50 mb-8 max-w-sm mx-auto">
                High-res JPG or PNG. Processed by our premium Neural Diagnostic engine.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center rounded-xl bg-white/10 border border-white/10 px-6 py-3 text-sm font-medium text-white hover:bg-white/20 transition-colors"
                >
                  <ImageIcon className="mr-2 h-5 w-5 opacity-70" /> Browse Files
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  <Camera className="mr-2 h-5 w-5 opacity-70" /> Use Camera
                </button>
              </div>
              <input
                type="file" ref={fileInputRef} className="hidden" accept="image/*"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
            </motion.div>
          )}

          {/* ── Preview + scan ── */}
          {preview && (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl overflow-hidden bg-black/60 border border-white/5 relative z-10 min-h-[380px] flex items-center justify-center"
            >
              <img
                src={preview} alt="leaf specimen"
                className={`max-h-[480px] w-full object-contain transition-opacity duration-500 ${isScanning ? "opacity-20" : "opacity-100"}`}
              />

              {/* scanning box (idle) */}
              {!isScanning && !result && !error && (
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  <div className="w-64 h-64 border border-emerald-500/50 border-dashed rounded-3xl bg-emerald-500/5 shadow-[inset_0_0_20px_rgba(16,185,129,0.15)]" />
                </div>
              )}

              {/* X button */}
              {!isScanning && (
                <button
                  onClick={reset}
                  className="absolute top-3 right-3 p-2 bg-black/60 hover:bg-red-500/80 text-white rounded-full backdrop-blur-md border border-white/10 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}

              {/* scanning overlay */}
              {isScanning && (
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <motion.div
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_14px_rgba(16,185,129,1)]"
                    initial={{ top: "8%" }}
                    animate={{ top: ["8%", "92%", "8%"] }}
                    transition={{ duration: 2.8, ease: "linear", repeat: Infinity }}
                  />
                  <div className="bg-black/50 backdrop-blur-xl border border-white/10 px-10 py-8 rounded-3xl flex flex-col items-center shadow-2xl">
                    <Loader2 className="h-10 w-10 text-emerald-400 animate-spin mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-3">AI Diagnostic Engine Loading…</h3>
                    <div className="w-60 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
                        initial={{ width: 0 }} animate={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-xs text-emerald-300/60 mt-2 font-mono">NEURAL_PROC: {progress}%</p>
                  </div>
                </div>
              )}

              {/* ── Error banner ── */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-red-900/50 backdrop-blur-xl border border-red-500/30 p-5 rounded-2xl shadow-xl"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-red-400 shrink-0" />
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                  <button
                    onClick={reset}
                    className="mt-4 text-sm font-medium text-red-300 hover:text-white transition-colors"
                  >Try again →</button>
                </motion.div>
              )}

              {/* ── Result panel ── */}
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl"
                >
                  {/* Main row */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`h-14 w-14 rounded-2xl flex items-center justify-center shadow-lg
                        ${result.healthy ? "bg-emerald-500/20 text-emerald-400 shadow-emerald-500/20"
                          : "bg-amber-500/20 text-amber-400 shadow-amber-500/20"}`}>
                        {result.healthy ? <ShieldCheck className="h-7 w-7" /> : <AlertTriangle className="h-7 w-7" />}
                      </div>
                      <div>
                        <p className="text-xs text-white/40 font-medium uppercase tracking-wider mb-1">Premium Neural Analysis</p>
                        <h2 className="text-xl font-bold text-white leading-tight">{result.class.split('_').join(' ')}</h2>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${severityColor(result.details?.severity || "Low")}`}>
                        {result.details?.severity || "Healthy"} Risk
                      </span>
                      <div className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full border border-white/10">
                        <BrainCircuit className="w-3.5 h-3.5 text-white/40" />
                        <span className="text-xs text-white/70 font-mono">
                          {(result.confidence * 100).toFixed(1)}% confident
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Premium Details Widget */}
                  {result.details && !result.healthy && (
                    <div className="mt-5 border-t border-white/5 pt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                         <p className="text-xs text-white/40 uppercase font-bold flex items-center gap-1"><ChevronDown className="w-3" /> Possible Cause</p>
                         <p className="text-xs text-white/70 leading-relaxed italic">{result.details.cause}</p>
                      </div>
                      <div className="space-y-2">
                         <p className="text-xs text-emerald-400/80 uppercase font-bold flex items-center gap-1"><ShieldCheck className="w-3" /> Recommended Treatment</p>
                         <p className="text-xs text-white/80 leading-relaxed font-medium bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">{result.details.treatment}</p>
                      </div>
                    </div>
                  )}

                  <div className="mt-5 flex justify-end">
                    <button
                      onClick={reset}
                      className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 text-sm font-medium text-white transition-colors"
                    >
                      Scan Another Specimen
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scan button */}
        {preview && !isScanning && !result && !error && (
          <div className="mt-6 flex justify-end relative z-10">
            <button
              onClick={startScan}
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-8 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <BrainCircuit className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Initialize Deep Scan</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
