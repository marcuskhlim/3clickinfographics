"use client";

import { useEffect, useMemo, useState } from "react";
import { ASPECTS, MODIFIERS, STYLES, stylesByFamily } from "@/lib/presets";

type Step = 1 | 2 | 3 | 4 | 5;
const KEY_STORAGE = "infoforge.openai_key";

export default function Page() {
  const [step, setStep] = useState<Step>(1);
  const [topic, setTopic] = useState("");
  const [research, setResearch] = useState("");
  const [styleId, setStyleId] = useState<string>("");
  const [modifierId, setModifierId] = useState<string>("");
  const [aspectId, setAspectId] = useState<string>("1:1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [result, setResult] = useState<{ image?: string; result?: unknown; prompt: string; size: string } | null>(null);
  const [apiKey, setApiKey] = useState<string>("");
  const [showKeyPanel, setShowKeyPanel] = useState(false);
  const [freeRemaining, setFreeRemaining] = useState<number | null>(null);
  const [freeLimit, setFreeLimit] = useState<number>(0);
  const [sharedKeyAvailable, setSharedKeyAvailable] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY_STORAGE);
    if (saved) setApiKey(saved);
    fetch("/api/limits")
      .then((r) => r.json())
      .then((j) => {
        setFreeRemaining(j.remaining);
        setFreeLimit(j.limit);
        setSharedKeyAvailable(!!j.sharedKeyAvailable);
      })
      .catch(() => {});
  }, []);
  function saveKey(k: string) {
    setApiKey(k);
    if (k) localStorage.setItem(KEY_STORAGE, k);
    else localStorage.removeItem(KEY_STORAGE);
  }

  const families = useMemo(() => stylesByFamily(), []);
  const canNext = step === 1 ? topic.trim().length > 0 : step === 2 ? !!styleId : step === 3 ? true : !!aspectId;

  async function generate() {
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (apiKey.trim()) headers["x-openai-key"] = apiKey.trim();
      const r = await fetch("/api/generate", {
        method: "POST",
        headers,
        body: JSON.stringify({ topic, research, styleId, modifierId: modifierId || undefined, aspectId }),
      });
      const j = await r.json();
      if (!r.ok) {
        if (j?.needsKey) setShowKeyPanel(true);
        if (typeof j?.remaining === "number") setFreeRemaining(j.remaining);
        throw new Error(j.error || "Generation failed");
      }
      setResult(j);
      if (j?.usage?.remaining !== undefined) setFreeRemaining(j.usage.remaining);
      setStep(5);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  }

  const progress = (Math.min(step, 4) - 1) * 25;

  return (
    <main className="max-w-3xl mx-auto p-6 sm:p-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">3 Click Infographics</h1>
        <p className="text-slate-500 mt-1">Turn topics into infographics with 3 clicks.</p>
      </header>

      {sharedKeyAvailable && !apiKey && freeRemaining !== null && (
        <div className={`mb-6 rounded-lg p-3 text-sm border ${freeRemaining > 0 ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-amber-50 border-amber-200 text-amber-900"}`}>
          {freeRemaining > 0 ? (
            <>🎁 <strong>{freeRemaining} of {freeLimit}</strong> free generations remaining on the shared key. After that, you&apos;ll need your own OpenAI key.</>
          ) : (
            <>You&apos;ve used your {freeLimit} free generations. <button onClick={() => setShowKeyPanel(true)} className="underline font-medium">Add your OpenAI key</button> to keep going — InfoForge stays free, you only pay OpenAI&apos;s ~$0.04 per image.</>
          )}
        </div>
      )}

      {showKeyPanel && (
        <div className="mb-6 border border-slate-300 rounded-lg p-4 bg-white">
          <div className="text-sm font-medium mb-1">Your OpenAI API key (stored locally in your browser)</div>
          <p className="text-xs text-slate-500 mb-2">
            InfoForge sends this key only to OpenAI via your own server route — it&apos;s never logged or shared. Get one at{" "}
            <a className="underline" href="https://platform.openai.com/api-keys" target="_blank" rel="noreferrer">platform.openai.com/api-keys</a>.
          </p>
          <div className="flex gap-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => saveKey(e.target.value)}
              placeholder="sk-..."
              className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono"
            />
            {apiKey && (
              <button onClick={() => saveKey("")} className="px-3 py-2 rounded-lg border border-slate-300 text-sm">Clear</button>
            )}
          </div>
        </div>
      )}

      {step <= 4 && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>Step {step} of 4</span>
            <span>{progress}% complete</span>
          </div>
          <div className="h-2 bg-slate-200 rounded">
            <div className="h-2 bg-slate-900 rounded transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {step <= 4 && (
        <div className="mb-6 flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, (s - 1)) as Step)}
            disabled={step === 1 || loading}
            className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-40"
          >
            ← Back
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => Math.min(4, (s + 1)) as Step)}
              disabled={!canNext}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={generate}
              disabled={!canNext || loading}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40"
            >
              {loading ? "Generating…" : "Generate"}
            </button>
          )}
        </div>
      )}

      {step === 1 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Topic or Focus</h2>
          <div>
            <label className="block text-sm font-medium mb-1">Topic <span className="text-red-500">*</span></label>
            <textarea
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              rows={3}
              placeholder="e.g. Top 5 Productivity Tips for Remote Workers"
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Research / Data (optional)</label>
            <textarea
              value={research}
              onChange={(e) => setResearch(e.target.value)}
              rows={5}
              placeholder="Paste any specific stats, bullet points or research."
              className="w-full border border-slate-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>
        </section>
      )}

      {step === 2 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Infographic Style</h2>
          <p className="text-sm text-slate-500">Pick one of {STYLES.length} preset styles.</p>
          <div className="space-y-6">
            {Object.entries(families).map(([family, styles]) => (
              <div key={family}>
                <h3 className="text-sm font-semibold text-slate-700 mb-2">{family}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {styles.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStyleId(s.id)}
                      className={`text-left border rounded-lg p-3 hover:border-slate-900 transition ${styleId === s.id ? "border-slate-900 ring-2 ring-slate-900 bg-white" : "border-slate-300 bg-white"}`}
                    >
                      <div
                        className="w-full aspect-square rounded-md mb-2 border border-slate-200 overflow-hidden"
                        style={{ background: `linear-gradient(135deg, ${s.palette.join(", ")})` }}
                      >
                        <img
                          src={s.thumb}
                          alt={s.title}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="font-medium">Style {s.variant}</div>
                      <div className="text-xs text-slate-500 line-clamp-3 mt-1">{s.prompt}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {step === 3 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Modifier (optional)</h2>
          <p className="text-sm text-slate-500">Shifts the overall treatment. Skip for "default" look.</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              onClick={() => setModifierId("")}
              className={`border rounded-lg overflow-hidden text-left bg-white transition hover:border-slate-900 ${modifierId === "" ? "border-slate-900 ring-2 ring-slate-900" : "border-slate-300"}`}
            >
              <div className="w-full aspect-square bg-[repeating-linear-gradient(45deg,#f1f5f9_0_8px,#e2e8f0_8px_16px)] flex items-center justify-center">
                <span className="text-slate-400 text-4xl font-light">∅</span>
              </div>
              <div className="p-3">
                <div className="font-medium">None</div>
                <div className="text-xs text-slate-500 mt-1">Style only</div>
              </div>
            </button>
            {MODIFIERS.map((m) => (
              <button
                key={m.id}
                onClick={() => setModifierId(m.id)}
                className={`border rounded-lg overflow-hidden text-left bg-white transition hover:border-slate-900 ${modifierId === m.id ? "border-slate-900 ring-2 ring-slate-900" : "border-slate-300"}`}
              >
                <div
                  className="w-full aspect-square overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${m.palette.join(", ")})` }}
                >
                  <img
                    src={m.thumb}
                    alt={m.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <div className="font-medium">{m.title}</div>
                  <div className="text-xs text-slate-500 mt-1 line-clamp-2">{m.prompt}</div>
                </div>
              </button>
            ))}
          </div>
        </section>
      )}

      {step === 4 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Aspect Ratio</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {ASPECTS.map((a) => {
              const [w, h] = a.id.split(":").map(Number);
              return (
                <button
                  key={a.id}
                  onClick={() => setAspectId(a.id)}
                  className={`border rounded-lg overflow-hidden text-left bg-white transition hover:border-slate-900 ${aspectId === a.id ? "border-slate-900 ring-2 ring-slate-900" : "border-slate-300"}`}
                >
                  <div className="w-full bg-slate-50 flex items-center justify-center p-4">
                    <div className="w-28 h-28 flex items-center justify-center">
                      <div
                        className="bg-slate-300 border border-slate-400 rounded-sm shadow-sm"
                        style={
                          w >= h
                            ? { width: "100%", height: `${(h / w) * 100}%` }
                            : { width: `${(w / h) * 100}%`, height: "100%" }
                        }
                      />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="font-medium">{a.label}</div>
                    <div className="text-xs text-slate-500 mt-1">{a.size}</div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm">
            <div className="font-medium mb-1">Review</div>
            <div><span className="text-slate-500">Topic:</span> {topic}</div>
            <div><span className="text-slate-500">Style:</span> {STYLES.find(s => s.id === styleId)?.title || "—"}</div>
            <div><span className="text-slate-500">Modifier:</span> {MODIFIERS.find(m => m.id === modifierId)?.title || "None"}</div>
            <div><span className="text-slate-500">Aspect:</span> {ASPECTS.find(a => a.id === aspectId)?.label}</div>
          </div>
        </section>
      )}

      {step === 5 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Result</h2>
          {result && (
            <>
              {result.image ? (
                <img src={result.image} alt="Generated infographic" className="w-full rounded-lg border border-slate-300 bg-white" />
              ) : (
                <pre className="w-full rounded-lg border border-slate-300 bg-white p-3 text-sm whitespace-pre-wrap break-words">
                  {typeof result.result === "string" ? result.result : JSON.stringify(result.result, null, 2)}
                </pre>
              )}
              <div className="bg-slate-100 border border-slate-200 rounded-lg p-3 text-sm">
                <div><span className="text-slate-500">Size:</span> {result.size}</div>
                <details className="mt-2">
                  <summary className="cursor-pointer text-slate-600">View prompt sent to model</summary>
                  <pre className="whitespace-pre-wrap mt-2 text-xs text-slate-700">{result.prompt}</pre>
                </details>
              </div>
              <div className="flex gap-2">
                {result.image && (
                  <a
                    href={result.image}
                    download="3-click-infographic.png"
                    className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800"
                  >
                    Download PNG
                  </a>
                )}
                <button
                  onClick={() => { setStep(1); setResult(null); }}
                  className="px-4 py-2 rounded-lg border border-slate-300"
                >
                  Start over
                </button>
              </div>
            </>
          )}
        </section>
      )}

      {error && <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm">{error}</div>}

      {step <= 4 && (
        <div className="mt-8 flex justify-between">
          <button
            onClick={() => setStep((s) => Math.max(1, (s - 1)) as Step)}
            disabled={step === 1 || loading}
            className="px-4 py-2 rounded-lg border border-slate-300 disabled:opacity-40"
          >
            ← Back
          </button>
          {step < 4 ? (
            <button
              onClick={() => setStep((s) => Math.min(4, (s + 1)) as Step)}
              disabled={!canNext}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={generate}
              disabled={!canNext || loading}
              className="px-4 py-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40"
            >
              {loading ? "Generating…" : "Generate"}
            </button>
          )}
        </div>
      )}
    </main>
  );
}
