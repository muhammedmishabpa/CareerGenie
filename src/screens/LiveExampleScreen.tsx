import React, { useState, useEffect, useRef } from 'react';
import { useResume } from '../context/ResumeContext';

export const LiveExampleScreen: React.FC = () => {
  const { setIsDrawerOpen } = useResume();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isAutoplaying, setIsAutoplaying] = useState<boolean>(false);
  const [splitPercent, setSplitPercent] = useState<number>(50);
  const [activeLens, setActiveLens] = useState<string[]>(['quant', 'verbs', 'keywords']);
  const [showHotspots, setShowHotspots] = useState<boolean>(false);
  const [activeHotspotTip, setActiveHotspotTip] = useState<{
    text: string;
    x: number;
    y: number;
  } | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  const canvasRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef<boolean>(false);

  // Autoplay timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoplaying) {
      interval = setInterval(() => {
        setCurrentStep((prev) => {
          const next = prev >= 5 ? 1 : prev + 1;
          applyStepSettings(next);
          return next;
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoplaying]);

  const applyStepSettings = (step: number) => {
    const splitMap: Record<number, number> = { 1: 90, 2: 70, 3: 50, 4: 20, 5: 0 };
    setSplitPercent(splitMap[step] ?? 50);
  };

  const handleStepClick = (step: number) => {
    setIsAutoplaying(false);
    setCurrentStep(step);
    applyStepSettings(step);
  };

  const toggleLens = (lens: string) => {
    setActiveLens((prev) =>
      prev.includes(lens) ? prev.filter((l) => l !== lens) : [...prev, lens]
    );
  };

  const scoresByStep: Record<number, number> = {
    1: 42,
    2: 68,
    3: 84,
    4: 98,
    5: 100,
  };

  const currentScore = scoresByStep[currentStep] || 98;

  // Split line drag handlers
  const handleMouseDown = () => {
    isDraggingRef.current = true;
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (offsetX / rect.width) * 100));
    setSplitPercent(percent);
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
  };

  return (
    <div
      className="w-full px-gutter py-space-xl max-w-7xl mx-auto flex flex-col gap-space-xl"
      onMouseUp={handleMouseUp}
    >
      {/* Top Banner & Control Deck */}
      <div className="relative overflow-hidden rounded-lg bg-surface-container-low p-space-lg lg:p-space-xl shadow-sm border border-outline-variant/20">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-secondary-container/20 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
          <div className="max-w-2xl space-y-space-sm">
            <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm font-semibold">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
              <span>Interactive Guided Simulation</span>
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              How CareerGenie Works in 60 Seconds
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Test-drive the neural career compiler. Watch unstructured career notes transmutate into an ATS-impervious, Cupertino-engineered executive document in real-time.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-lowest p-space-xs rounded-full shadow-sm border border-outline-variant/20">
            <button
              type="button"
              onClick={() => setShowHotspots(!showHotspots)}
              className={`flex items-center gap-space-xs px-space-md py-2 rounded-full font-label-lg text-label-lg transition-transform cursor-pointer font-semibold ${
                showHotspots
                  ? 'bg-secondary text-white shadow-md'
                  : 'bg-primary text-on-primary shadow-sm hover:scale-[1.02]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">neurology</span>
              <span>{showHotspots ? 'Hotspots Active' : 'Toggle Engine Hotspots'}</span>
            </button>
            <button
              type="button"
              onClick={() => setIsAutoplaying(!isAutoplaying)}
              className="flex items-center gap-space-xs px-space-md py-2 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-lg text-label-lg transition-colors cursor-pointer font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isAutoplaying ? 'pause_circle' : 'play_circle'}
              </span>
              <span>{isAutoplaying ? 'Pause Simulation' : 'Autoplay 60s Demo'}</span>
            </button>
          </div>
        </div>

        {/* 5 Transformation Steps Row */}
        <div className="mt-space-xl pt-space-lg">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-space-sm relative">
            {[
              {
                step: 1,
                title: 'Input Baseline',
                desc: 'Raw unformatted doc, LinkedIn, or stream-of-thought bullet points.',
                icon: 'upload_file',
              },
              {
                step: 2,
                title: 'Match Target Role',
                desc: 'AI vector-matches JD requirements, skills & metric benchmarks.',
                icon: 'target',
              },
              {
                step: 3,
                title: 'Design Matrix',
                desc: 'Pick or prompt typography, whitespace density & layout hierarchy.',
                icon: 'auto_awesome',
              },
              {
                step: 4,
                title: 'Pass ATS Scan',
                desc: 'Taleo, Workday, Greenhouse parsing simulated with 98% accuracy.',
                icon: 'verified',
              },
              {
                step: 5,
                title: '1-Click Export',
                desc: 'Print-ready PDF, structured JSON-LD & ATS clean text format.',
                icon: 'send_time_extension',
              },
            ].map((st) => {
              const isPassed = currentStep >= st.step;
              const isCurrent = currentStep === st.step;

              return (
                <div
                  key={st.step}
                  onClick={() => handleStepClick(st.step)}
                  className={`step-card group cursor-pointer p-space-md rounded-DEFAULT bg-surface-container-lowest transition-all duration-300 shadow-sm hover:shadow-md border border-outline-variant/20 ${
                    isPassed ? 'opacity-100 ring-2 ring-primary/40' : 'opacity-70'
                  }`}
                >
                  <div className="flex items-center justify-between mb-space-sm">
                    <span
                      className={`w-7 h-7 rounded-full flex items-center justify-center font-label-md text-label-md font-bold ${
                        isCurrent
                          ? 'bg-primary text-on-primary ring-2 ring-primary-fixed'
                          : isPassed
                          ? 'bg-primary/20 text-primary'
                          : 'bg-surface-container text-on-surface'
                      }`}
                    >
                      {String(st.step).padStart(2, '0')}
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px]">
                      {st.icon}
                    </span>
                  </div>
                  <div className="font-title-md text-title-md text-on-surface font-bold">
                    {st.title}
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    {st.desc}
                  </p>
                  <div className="h-1 w-full bg-primary/20 rounded-full mt-space-sm overflow-hidden">
                    <div
                      className="step-progress-bar h-full bg-primary transition-all duration-500"
                      style={{ width: isPassed ? '100%' : '0%' }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Controls + Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left 4 Cols: Telemetry & Interactive Controls */}
        <div className="lg:col-span-4 flex flex-col gap-space-md">
          {/* Live Compilation Telemetry */}
          <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/20">
            <div className="flex items-center justify-between pb-space-sm">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">speed</span>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Live Compilation Telemetry
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-tertiary-container/10 text-tertiary-container font-label-sm text-label-sm font-semibold">
                Real-time
              </span>
            </div>

            <div className="mt-space-md flex flex-col gap-space-md">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    ATS Compatibility Score
                  </span>
                  <span className="font-headline-sm text-headline-sm text-tertiary-container font-extrabold tabular-nums">
                    {currentScore}%
                  </span>
                </div>
                <div className="w-full h-3 bg-surface-container-high rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full bg-tertiary-container rounded-full transition-all duration-700"
                    style={{ width: `${currentScore}%` }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm pt-space-xs">
                <div className="p-space-sm rounded-DEFAULT bg-surface-container-low border border-outline-variant/10">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block font-medium">
                    Keyword Density
                  </span>
                  <span className="font-title-md text-title-md text-primary mt-1 block font-bold">
                    94.2%
                  </span>
                  <span className="font-body-sm text-body-sm text-tertiary-container flex items-center gap-0.5 mt-0.5 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">trending_up</span> +38% vs baseline
                  </span>
                </div>
                <div className="p-space-sm rounded-DEFAULT bg-surface-container-low border border-outline-variant/10">
                  <span className="font-label-sm text-label-sm text-on-surface-variant block font-medium">
                    Action-Verb Index
                  </span>
                  <span className="font-title-md text-title-md text-secondary mt-1 block font-bold">
                    99.1%
                  </span>
                  <span className="font-body-sm text-body-sm text-tertiary-container flex items-center gap-0.5 mt-0.5 font-semibold">
                    <span className="material-symbols-outlined text-[14px]">check</span> Executive Grade
                  </span>
                </div>
              </div>

              <div className="space-y-space-xs pt-space-xs">
                <span className="font-label-md text-label-md text-on-surface-variant font-bold">
                  Engine Pipeline Status
                </span>
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between p-2 rounded-DEFAULT bg-surface-container-low/70">
                    <span className="font-body-sm text-body-sm text-on-surface flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                      Embedding Vector Map
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      Matched (512-dim)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-DEFAULT bg-surface-container-low/70">
                    <span className="font-body-sm text-body-sm text-on-surface flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                      HarmonyOS Geometry Parser
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      0 Margin Errors
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-DEFAULT bg-surface-container-low/70">
                    <span className="font-body-sm text-body-sm text-on-surface flex items-center gap-1.5 font-medium">
                      <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                      Impact Quantification
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                      8 Metrics Injected
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Canvas Controls */}
          <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm border border-outline-variant/20">
            <div className="flex items-center gap-space-xs pb-space-xs">
              <span className="material-symbols-outlined text-primary text-[20px]">tune</span>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Interactive Canvas Controls
              </h3>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
              Slide split divider or choose display modes to examine the typographic and syntactic transformation.
            </p>

            <div className="mt-space-md flex flex-col gap-space-sm">
              <div className="grid grid-cols-2 gap-space-xs bg-surface-container-low p-1 rounded-full">
                <button
                  type="button"
                  onClick={() => setSplitPercent(50)}
                  className={`py-1.5 rounded-full font-label-md text-label-md transition-all text-center cursor-pointer ${
                    splitPercent > 0 && splitPercent < 100
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Split Compare
                </button>
                <button
                  type="button"
                  onClick={() => setSplitPercent(0)}
                  className={`py-1.5 rounded-full font-label-md text-label-md transition-all text-center cursor-pointer ${
                    splitPercent === 0
                      ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Optimized Only
                </button>
              </div>

              <div className="pt-space-xs">
                <label className="font-label-sm text-label-sm text-on-surface-variant mb-1.5 flex justify-between font-semibold">
                  <span>Split Position</span>
                  <span className="text-primary font-bold">{Math.round(splitPercent)}%</span>
                </label>
                <input
                  className="w-full accent-primary cursor-pointer"
                  type="range"
                  min="0"
                  max="100"
                  value={splitPercent}
                  onChange={(e) => setSplitPercent(Number(e.target.value))}
                />
              </div>

              <div className="flex flex-col gap-1.5 pt-space-xs">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                  Engine Lens Filters
                </span>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    type="button"
                    onClick={() => toggleLens('quant')}
                    className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer font-semibold ${
                      activeLens.includes('quant')
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    Metrics &amp; KPIs
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleLens('verbs')}
                    className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer font-semibold ${
                      activeLens.includes('verbs')
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    Power Verbs
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleLens('keywords')}
                    className={`px-2.5 py-1 rounded-full font-label-sm text-label-sm transition-colors cursor-pointer font-semibold ${
                      activeLens.includes('keywords')
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container text-on-surface'
                    }`}
                  >
                    ATS Keywords
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Guaranteed ATS Parser Compliance banner */}
          <div className="rounded-lg bg-surface-container-highest/60 p-space-md flex items-center gap-space-md border border-outline-variant/10">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary">
              <span className="material-symbols-outlined text-[24px]">verified_user</span>
            </div>
            <div>
              <h4 className="font-label-lg text-label-lg text-on-surface font-bold">
                Guaranteed ATS Parser Compliance
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                Dual-column fallbacks preserve column sequentiality during OCR and text extraction.
              </p>
            </div>
          </div>
        </div>

        {/* Right 8 Cols: Dual Split-View Canvas */}
        <div className="lg:col-span-8 flex flex-col gap-space-sm">
          {/* Top Bar above Canvas */}
          <div className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm flex items-center justify-between border border-outline-variant/20">
            <div className="flex items-center gap-space-sm">
              <span className="flex items-center gap-1 px-space-sm py-1 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface font-semibold">
                <span className="material-symbols-outlined text-[14px]">desktop_windows</span>
                Cupertino Modern v4.2
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
                Target: Principal Product Architect • San Francisco / Remote
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <button
                type="button"
                onClick={() => setIsZoomed(!isZoomed)}
                className={`p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer ${
                  isZoomed ? 'text-primary font-bold' : ''
                }`}
                title="Toggle zoom"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {isZoomed ? 'zoom_out' : 'zoom_in'}
                </span>
              </button>
              <button
                type="button"
                onClick={() => setIsDrawerOpen(true)}
                className="px-space-md py-1 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm flex items-center gap-1 cursor-pointer font-semibold"
              >
                <span className="material-symbols-outlined text-[16px]">file_download</span>
                <span>Export Proof</span>
              </button>
            </div>
          </div>

          {/* Interactive Split Canvas Viewport */}
          <div
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            className="relative w-full rounded-lg overflow-hidden shadow-xl bg-surface-container-high select-none min-h-[680px] border border-outline-variant/20"
          >
            {/* Popover Hotspot tooltip */}
            {activeHotspotTip && (
              <div
                style={{ left: activeHotspotTip.x, top: activeHotspotTip.y }}
                className="absolute z-30 max-w-xs p-3 rounded-lg bg-inverse-surface text-inverse-on-surface text-body-sm font-body-sm shadow-xl pointer-events-none transition-opacity duration-200 border border-outline-variant/30"
              >
                <div className="font-label-sm text-label-sm text-tertiary-fixed mb-0.5 font-bold">
                  CAREERGENIE NEURAL COMPILER
                </div>
                <p>{activeHotspotTip.text}</p>
              </div>
            )}

            <div className="relative w-full h-[680px] overflow-hidden bg-surface-container-highest">
              {/* LEFT PANE: Raw Input Stream (Before) */}
              <div
                id="pane-before"
                className="absolute inset-0 bg-[#fdfdfd] p-space-lg overflow-y-auto font-mono text-[13px] leading-relaxed text-slate-800"
              >
                <div className="max-w-2xl mx-auto space-y-4">
                  <div className="bg-surface-container-low px-3 py-1.5 rounded-DEFAULT text-on-surface-variant font-label-sm text-label-sm flex items-center justify-between border border-error/20">
                    <span>RAW_INPUT_STREAM (User pasted doc)</span>
                    <span className="text-error font-semibold">
                      ATS Readability: 42% (Warning: Table nested tags)
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">ALEX R. CARTER</h3>
                    <p className="text-xs text-slate-600">
                      Email: alex.carter92@gmail.com | Phone: 415-555-0199 | SF, CA
                    </p>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-xs text-slate-700">
                      SUMMARY
                    </h4>
                    <p className="text-xs text-slate-700">
                      Product designer and manager with 8 years doing web and mobile apps. Good team player, worked with engineering, created wireframes, improved metrics, managed agile teams.
                    </p>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-xs text-slate-700">
                      WORK HISTORY
                    </h4>
                    <div className="space-y-3 mt-2 text-xs text-slate-700">
                      <div>
                        <p className="font-bold">Senior Product Lead - CloudScale Systems (2021-Present)</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Responsible for redesigning the core enterprise dashboard.</li>
                          <li>Ran meetings between designers and engineers.</li>
                          <li>Helped grow enterprise signups and customer satisfaction score.</li>
                          <li>Used Figma, Jira, and Google Analytics.</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-bold">UX Architect - Apex FinTech (2018-2021)</p>
                        <ul className="list-disc pl-5 space-y-1">
                          <li>Created flowcharts and prototypes for consumer payment app.</li>
                          <li>Conducted usability tests on 40 people.</li>
                          <li>Fixed onboarding issues and bugs with frontend developers.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-slate-200"></div>
                  <div>
                    <h4 className="font-bold uppercase tracking-wider text-xs text-slate-700">
                      SKILLS
                    </h4>
                    <p className="text-xs text-slate-700">
                      Figma, Sketch, User Research, Agile, Roadmapping, HTML/CSS, Wireframing, Communication, Leadership, Analytics.
                    </p>
                  </div>
                </div>
              </div>

              {/* RIGHT PANE: Cupertino Modern v4.2 (After) */}
              <div
                id="pane-after"
                style={{
                  clipPath: `inset(0 0 0 ${splitPercent}%)`,
                  transform: isZoomed ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: 'top left',
                }}
                className="absolute inset-y-0 left-0 bg-surface-container-lowest overflow-hidden shadow-2xl transition-[clip-path] duration-75 w-full"
              >
                <div className="w-full h-full p-space-lg lg:p-space-xl overflow-y-auto font-body-md text-on-surface">
                  <div className="max-w-2xl mx-auto space-y-space-md">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-surface-container-highest pb-space-sm">
                      <div>
                        <h2 className="font-headline-md text-headline-md tracking-tight text-on-surface font-extrabold">
                          Alex R. Carter
                        </h2>
                        <p className="font-title-md text-title-md text-primary font-bold mt-0.5">
                          Principal Product Architect • Enterprise Infrastructure
                        </p>
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant flex flex-col sm:items-end">
                        <span>alex.carter@careergenie.dev</span>
                        <span>San Francisco, CA • (415) 555-0199</span>
                      </div>
                    </div>

                    {/* Executive Narrative */}
                    <div className="relative group">
                      {showHotspots && (
                        <div
                          onMouseEnter={(e) => {
                            const rect = e.currentTarget.getBoundingClientRect();
                            setActiveHotspotTip({
                              text: 'Embedding vector aligned with Tier-1 Tech Product specs.',
                              x: 20,
                              y: 10,
                            });
                          }}
                          onMouseLeave={() => setActiveHotspotTip(null)}
                          className="engine-hotspot absolute -left-7 top-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-on-primary text-[11px] font-bold shadow-md cursor-help"
                        >
                          H1
                        </div>
                      )}
                      <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-bold">
                        Executive Narrative
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mt-1 leading-relaxed">
                        Accomplished{' '}
                        <span
                          className={`lens-item highlight-keyword px-1 rounded font-semibold ${
                            activeLens.includes('keywords')
                              ? 'bg-primary-container/20 text-primary ring-1 ring-primary'
                              : 'text-on-surface'
                          }`}
                        >
                          Principal Product Architect
                        </span>{' '}
                        with 8+ years steering cloud enterprise platforms. Proven track record driving{' '}
                        <span
                          className={`lens-item highlight-quant px-1 rounded font-bold ${
                            activeLens.includes('quant')
                              ? 'bg-tertiary-container/20 text-tertiary-container ring-1 ring-tertiary-container'
                              : 'text-on-surface'
                          }`}
                        >
                          $14.2M ARR net retention
                        </span>{' '}
                        and scaling distributed design-system architecture across multi-functional engineering suites. Expert in zero-to-one infrastructure productization and algorithmic workflows.
                      </p>
                    </div>

                    {/* Strategic Experience */}
                    <div className="space-y-space-md">
                      <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-bold">
                        Strategic Experience
                      </h3>

                      <div className="relative group space-y-1">
                        {showHotspots && (
                          <div
                            onMouseEnter={(e) => {
                              setActiveHotspotTip({
                                text: 'Quantified with Google XYZ formula: Accomplished [X], measured by [Y], by doing [Z].',
                                x: 20,
                                y: 80,
                              });
                            }}
                            onMouseLeave={() => setActiveHotspotTip(null)}
                            className="engine-hotspot absolute -left-7 top-1 flex items-center justify-center w-5 h-5 rounded-full bg-secondary text-on-secondary text-[11px] font-bold shadow-md cursor-help"
                          >
                            H2
                          </div>
                        )}
                        <div className="flex justify-between items-baseline">
                          <span className="font-title-md text-title-md text-on-surface font-bold">
                            Senior Product Lead — CloudScale Systems
                          </span>
                          <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                            2021 — Present
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-secondary font-semibold">
                          B2B Core Workflows • Microservices Management Console
                        </p>
                        <ul className="space-y-1.5 mt-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                            <span>
                              <span
                                className={`lens-item highlight-verb font-bold ${
                                  activeLens.includes('verbs') ? 'text-primary underline' : 'text-on-surface'
                                }`}
                              >
                                Architected &amp; deployed
                              </span>{' '}
                              unified dashboard interface, reducing operational task completion latency by{' '}
                              <span
                                className={`lens-item highlight-quant px-1 rounded font-bold ${
                                  activeLens.includes('quant')
                                    ? 'bg-tertiary-container/20 text-tertiary-container ring-1 ring-tertiary-container'
                                    : 'text-on-surface'
                                }`}
                              >
                                41%
                              </span>{' '}
                              and elevating CSAT from 3.4 to{' '}
                              <span
                                className={`lens-item highlight-quant px-1 rounded font-bold ${
                                  activeLens.includes('quant')
                                    ? 'bg-tertiary-container/20 text-tertiary-container ring-1 ring-tertiary-container'
                                    : 'text-on-surface'
                                }`}
                              >
                                4.85 / 5.0
                              </span>
                              .
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                            <span>
                              <span
                                className={`lens-item highlight-verb font-bold ${
                                  activeLens.includes('verbs') ? 'text-primary underline' : 'text-on-surface'
                                }`}
                              >
                                Engineered cross-platform tokens
                              </span>{' '}
                              adopted by 44 engineers, cutting design-to-production QA debt by{' '}
                              <span
                                className={`lens-item highlight-quant px-1 rounded font-bold ${
                                  activeLens.includes('quant')
                                    ? 'bg-tertiary-container/20 text-tertiary-container ring-1 ring-tertiary-container'
                                    : 'text-on-surface'
                                }`}
                              >
                                62%
                              </span>{' '}
                              across 3 major product releases.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                            <span>
                              <span
                                className={`lens-item highlight-verb font-bold ${
                                  activeLens.includes('verbs') ? 'text-primary underline' : 'text-on-surface'
                                }`}
                              >
                                Orchestrated migration
                              </span>{' '}
                              to{' '}
                              <span
                                className={`lens-item highlight-keyword px-1 rounded font-semibold ${
                                  activeLens.includes('keywords')
                                    ? 'bg-primary-container/20 text-primary ring-1 ring-primary'
                                    : 'text-on-surface'
                                }`}
                              >
                                event-driven streaming telemetry
                              </span>
                              , accelerating Tier-1 customer adoption by{' '}
                              <span
                                className={`lens-item highlight-quant px-1 rounded font-bold ${
                                  activeLens.includes('quant')
                                    ? 'bg-tertiary-container/20 text-tertiary-container ring-1 ring-tertiary-container'
                                    : 'text-on-surface'
                                }`}
                              >
                                185% year-over-year
                              </span>
                              .
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="relative group space-y-1">
                        {showHotspots && (
                          <div
                            onMouseEnter={() => {
                              setActiveHotspotTip({
                                text: 'Parsed by Greenhouse/Taleo with 99.8% semantic extraction score.',
                                x: 20,
                                y: 220,
                              });
                            }}
                            onMouseLeave={() => setActiveHotspotTip(null)}
                            className="engine-hotspot absolute -left-7 top-1 flex items-center justify-center w-5 h-5 rounded-full bg-primary-container text-on-primary text-[11px] font-bold shadow-md cursor-help"
                          >
                            H3
                          </div>
                        )}
                        <div className="flex justify-between items-baseline">
                          <span className="font-title-md text-title-md text-on-surface font-bold">
                            UX Architect — Apex FinTech
                          </span>
                          <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                            2018 — 2021
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-secondary font-semibold">
                          Consumer Financial Infrastructure &amp; Frictionless Checkout
                        </p>
                        <ul className="space-y-1.5 mt-2 font-body-sm text-body-sm text-on-surface-variant">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                            <span>
                              <span
                                className={`lens-item highlight-verb font-bold ${
                                  activeLens.includes('verbs') ? 'text-primary underline' : 'text-on-surface'
                                }`}
                              >
                                Pioneered behavioral checkout funnel
                              </span>{' '}
                              processing $850M+ volume, boosting conversion rates by{' '}
                              <span
                                className={`lens-item highlight-quant px-1 rounded font-bold ${
                                  activeLens.includes('quant')
                                    ? 'bg-tertiary-container/20 text-tertiary-container ring-1 ring-tertiary-container'
                                    : 'text-on-surface'
                                }`}
                              >
                                14.6%
                              </span>{' '}
                              via predictive input validation.
                            </span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                            <span>
                              <span
                                className={`lens-item highlight-verb font-bold ${
                                  activeLens.includes('verbs') ? 'text-primary underline' : 'text-on-surface'
                                }`}
                              >
                                Conducted iterative empirical studies
                              </span>{' '}
                              with 120+ institutional users to systematically eliminate 9 critical compliance drop-offs.
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Competencies */}
                    <div className="space-y-2">
                      <h3 className="font-label-lg text-label-lg text-primary uppercase tracking-wider font-bold">
                        Core Competencies &amp; System Tools
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {[
                          'Product Strategy',
                          'Distributed Systems Architecture',
                          'Design Systems (Tokens/Figma)',
                          'Quantitative Analytics (Mixpanel, SQL)',
                          'High-Frequency User Testing',
                          'OKRs & ARR Attribution',
                        ].map((c) => (
                          <span
                            key={c}
                            className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Draggable Split Handle Line */}
              <div
                id="split-line"
                style={{ left: `${splitPercent}%` }}
                onMouseDown={handleMouseDown}
                className="absolute top-0 bottom-0 w-0.5 bg-primary cursor-ew-resize z-20 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-lg cursor-grab active:cursor-grabbing">
                  <span className="material-symbols-outlined text-[18px]">drag_indicator</span>
                </div>
              </div>
            </div>

            {/* Split Canvas Sub-Bar */}
            <div className="bg-surface-container-lowest px-space-md py-2 flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm border-t border-outline-variant/20">
              <div className="flex items-center gap-space-sm font-semibold">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-slate-400"></span> Left: Raw Stream
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> Right: Cupertino Pro Engine
                </span>
              </div>
              <span className="font-medium">Slide divider or select step card to compare</span>
            </div>
          </div>

          {/* 3 Value Proposition Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm mt-space-sm">
            <div className="p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex items-start gap-space-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-primary text-[24px]">psychology</span>
              <div>
                <div className="font-title-md text-title-md text-on-surface font-bold">
                  Neural Embeddings
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Cross-references Fortune 500 job descriptions using cosine vector affinity.
                </p>
              </div>
            </div>
            <div className="p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex items-start gap-space-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-secondary text-[24px]">format_shapes</span>
              <div>
                <div className="font-title-md text-title-md text-on-surface font-bold">
                  HarmonyOS Layout
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Mathematical whitespace distribution ensures single-page density without crowding.
                </p>
              </div>
            </div>
            <div className="p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm flex items-start gap-space-sm border border-outline-variant/20">
              <span className="material-symbols-outlined text-tertiary-container text-[24px]">
                verified
              </span>
              <div>
                <div className="font-title-md text-title-md text-on-surface font-bold">
                  Universal Ingestion
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  Guarantees 100% field retention across Workday, Taleo, iCIMS, and Lever.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
