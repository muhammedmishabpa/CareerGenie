import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

export const AtsCheckerScreen: React.FC = () => {
  const {
    resume,
    setActiveTab,
    atsScore,
    keywordFixApplied,
    verbFixApplied,
    applyKeywordFix,
    applyVerbFix,
    atsEngine,
    setAtsEngine,
  } = useResume();

  const [activeAccordion, setActiveAccordion] = useState<string | null>('acc-1');
  const [isInjecting, setIsInjecting] = useState<boolean>(false);
  const [isStrengthening, setIsStrengthening] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion((prev) => (prev === id ? null : id));
  };

  const handleApplyKeyword = () => {
    setIsInjecting(true);
    setTimeout(() => {
      setIsInjecting(false);
      applyKeywordFix();
      showToast('Cloud Architecture & Strategic OKRs neural vector injected!');
    }, 700);
  };

  const handleApplyVerb = () => {
    setIsStrengthening(true);
    setTimeout(() => {
      setIsStrengthening(false);
      applyVerbFix();
      showToast('Weak verbs converted into high-impact executive actions!');
    }, 700);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const copyParsedTokens = () => {
    const dump = `[METADATA_HEADER_${atsEngine.toUpperCase()}_PARSED]
CANDIDATE_NAME: "${resume.name || 'Elena Vance, M.Sc.'}"
PRIMARY_CONTACT: "${resume.email || 'elena.vance@precisionai.tech'}"
LOCATION_RESOLVED: "${resume.location || 'San Francisco, CA'}"

[EXPERIENCE_STREAM_0]
ROLE: "${resume.experiences[0]?.role || 'Principal AI Architect'}"
COMPANY: "${resume.experiences[0]?.company || 'Synthex Labs'}"
DURATION_MONTHS: 48 (2021-03 -> Present)
• ${
      keywordFixApplied
        ? 'Streamlined Cloud Architecture modernizations aligning deliverables with Strategic OKRs, cutting inter-region latency by 34%.'
        : 'Streamlined core microservice communication patterns, cutting inter-region networking overhead by 34% across 140+ bare-metal nodes.'
    }
• ${
      verbFixApplied
        ? 'Spearheaded enterprise cloud governance standards and guided sprint cadences for 28 senior engineers.'
        : 'Responsible for cloud governance and leading sprint cycles across global engineering units.'
    }

[EXTRACTED_ENTITY_MAP]
HARD_SKILLS: ["Kubernetes", "Distributed Consensus", "Go", "gRPC", "Kafka", "PostgreSQL", "Cloud Architecture", "Terraform"]
COMPLIANCE_FLAGS: NONE_FOUND
HIERARCHY_LEVEL: LEVEL_7_DIRECTOR_EQUIVALENT
ENCODING: UTF-8 (Strict)`;

    navigator.clipboard.writeText(dump);
    showToast('Copied Parsed Dump to Clipboard');
  };

  return (
    <div className="w-full px-gutter md:px-margin-desktop py-space-xl max-w-[1520px] mx-auto space-y-space-xl">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-full shadow-2xl font-label-md text-label-md z-50 flex items-center gap-2 border border-outline-variant/30 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[16px] text-tertiary-container">
            check_circle
          </span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Screen Title & Engine Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg">
        <div className="space-y-space-xs max-w-2xl">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container-high text-primary font-label-md text-label-md shadow-sm">
            <span className="material-symbols-outlined text-[16px] animate-spin" style={{ animationDuration: '4s' }}>
              sync
            </span>
            <span>ATS Diagnostic Node • Real-Time Core 4.2</span>
          </div>
          <div className="space-y-1">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
              Audit & Algorithmic Validation
            </span>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              Applicant Tracking System Diagnostic & Auto-Optimizer
            </h1>
          </div>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Simulating tier-1 enterprise parser engines (Workday, Greenhouse, Taleo) to identify structural blindspots and missing neural semantic vectors.
          </p>
        </div>

        <div className="flex items-center gap-space-sm bg-surface-container-lowest p-1.5 rounded-full shadow-md border border-outline-variant/20">
          <button
            type="button"
            onClick={() => setAtsEngine('workday')}
            className={`px-space-md py-2 rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${
              atsEngine === 'workday'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Workday Engine
          </button>
          <button
            type="button"
            onClick={() => setAtsEngine('greenhouse')}
            className={`px-space-md py-2 rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${
              atsEngine === 'greenhouse'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Greenhouse AI
          </button>
          <button
            type="button"
            onClick={() => setAtsEngine('lever')}
            className={`px-space-md py-2 rounded-full font-label-md text-label-md transition-all duration-200 cursor-pointer ${
              atsEngine === 'lever'
                ? 'bg-primary text-on-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Lever Parser
          </button>
        </div>
      </div>

      {/* Top Split: Score Gauge + 4 Diagnostic Tiles */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-space-lg items-stretch">
        {/* Left 5 Cols: Algorithmic Readiness Gauge */}
        <div className="xl:col-span-5 flex flex-col justify-between rounded-lg bg-surface-container-lowest p-space-lg shadow-xl relative overflow-hidden border border-outline-variant/20">
          <div className="absolute -right-16 -top-16 w-64 h-64 bg-primary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex items-center justify-between pb-space-md">
            <div className="space-y-0.5">
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider font-bold">
                Algorithmic Readiness Index
              </span>
              <p className="font-title-md text-title-md text-on-surface font-bold">
                Target Position: {resume.targetTitle || 'Lead Solutions Architect'}
              </p>
            </div>
            <span className="px-space-sm py-1 rounded-full bg-tertiary-container/15 text-tertiary font-label-md text-label-md flex items-center gap-1 shadow-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping"></span>
              Live Calibrated
            </span>
          </div>

          <div className="py-space-md flex flex-col sm:flex-row items-center justify-center gap-space-xl">
            <div className="relative w-48 h-48 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  className="text-surface-container"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="text-secondary"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="54"
                  stroke="currentColor"
                  strokeDasharray="339.29"
                  strokeDashoffset={339.29 - 339.29 * (atsScore / 100)}
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="text-surface-container"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="44"
                  stroke="currentColor"
                  strokeWidth="7"
                ></circle>
                <circle
                  className="text-primary-container"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="44"
                  stroke="currentColor"
                  strokeDasharray="276.46"
                  strokeDashoffset="18"
                  strokeLinecap="round"
                  strokeWidth="7"
                ></circle>
                <circle
                  className="text-surface-container"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="34"
                  stroke="currentColor"
                  strokeWidth="6"
                ></circle>
                <circle
                  className="text-tertiary-container"
                  cx="60"
                  cy="60"
                  fill="transparent"
                  r="34"
                  stroke="currentColor"
                  strokeDasharray="213.63"
                  strokeDashoffset="10"
                  strokeLinecap="round"
                  strokeWidth="6"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="font-display-hero text-display-hero text-on-surface tracking-tighter leading-none tabular-nums">
                  {atsScore}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-bold mt-1">
                  OUT OF 100
                </span>
              </div>
            </div>

            <div className="space-y-space-sm flex-1 w-full">
              <div className="p-space-sm rounded-DEFAULT bg-surface-container-low shadow-sm">
                <div className="flex items-center justify-between text-on-surface font-label-md text-label-md">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container"></span>
                    Overall Parsability
                  </span>
                  <span className="font-bold">Top 5%</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                  High probability of instantaneous first-round HR pass.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-space-xs text-center pt-space-xs">
                <div className="p-space-xs rounded bg-surface-container-lowest shadow-sm border border-outline-variant/10">
                  <span className="block font-headline-sm text-headline-sm text-primary font-bold">0.12s</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Extraction Latency
                  </span>
                </div>
                <div className="p-space-xs rounded bg-surface-container-lowest shadow-sm border border-outline-variant/10">
                  <span className="block font-headline-sm text-headline-sm text-tertiary-container font-bold">0</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Fatal Parse Traps
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-space-md mt-space-md border-t border-surface-container/60 flex items-center justify-between">
            <span className="font-label-sm text-label-sm text-on-surface-variant">
              Benchmark baseline: 12,480 senior technology candidates.
            </span>
            <button
              type="button"
              onClick={() => showToast('Audit PDF downloaded and validated')}
              className="px-space-md py-1.5 rounded-full bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md flex items-center gap-1 shadow-sm cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">file_download</span>
              <span>Audit PDF</span>
            </button>
          </div>
        </div>

        {/* Right 7 Cols: 4 Diagnostic Tiles */}
        <div className="xl:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          {/* Tile 1 */}
          <div className="p-space-lg rounded-lg bg-surface-container-lowest shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group border border-outline-variant/20">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[20px]">key_visualizer</span>
                </div>
                <span className="font-headline-md text-headline-md text-primary font-bold">
                  {keywordFixApplied ? '99%' : '96%'}
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Keyword Density & Cohesion
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Weighted matching against 42 hard-skill prerequisites and cloud proficiencies.
              </p>
            </div>
            <div className="pt-space-md space-y-1.5">
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-primary h-full rounded-full transition-all duration-500"
                  style={{ width: keywordFixApplied ? '99%' : '96%' }}
                ></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant font-medium">
                <span>Target: 90%+</span>
                <span className="text-primary font-bold">Optimal Range</span>
              </div>
            </div>
          </div>

          {/* Tile 2 */}
          <div className="p-space-lg rounded-lg bg-surface-container-lowest shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group border border-outline-variant/20">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-tertiary">
                  <span className="material-symbols-outlined text-[20px]">dataset</span>
                </div>
                <span className="font-headline-md text-headline-md text-tertiary font-bold">100%</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Formatting & Parseability
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                UTF-8 tabular standard conformance without non-standard glyph corruption.
              </p>
            </div>
            <div className="pt-space-md space-y-1.5">
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full transition-all duration-500" style={{ width: '100%' }}></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant font-medium">
                <span>Tables / Multi-columns: 0</span>
                <span className="text-tertiary-container font-bold">Flawless</span>
              </div>
            </div>
          </div>

          {/* Tile 3 */}
          <div className="p-space-lg rounded-lg bg-surface-container-lowest shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group border border-outline-variant/20">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-secondary">
                  <span className="material-symbols-outlined text-[20px]">query_stats</span>
                </div>
                <span className="font-headline-md text-headline-md text-secondary font-bold">
                  {verbFixApplied ? '97%' : '88%'}
                </span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Measurable Impact Metrics
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Frequency of quantifiable outputs ($, %, raw time, operational efficiency gains).
              </p>
            </div>
            <div className="pt-space-md space-y-1.5">
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div
                  className="bg-secondary h-full rounded-full transition-all duration-500"
                  style={{ width: verbFixApplied ? '97%' : '88%' }}
                ></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant font-medium">
                <span>{verbFixApplied ? '8 of 8 bullets calibrated' : '7 of 8 bullets calibrated'}</span>
                <span className="text-secondary font-bold">
                  {verbFixApplied ? 'Fully Optimized' : '+1 Action needed'}
                </span>
              </div>
            </div>
          </div>

          {/* Tile 4 */}
          <div className="p-space-lg rounded-lg bg-surface-container-lowest shadow-md flex flex-col justify-between hover:shadow-xl transition-shadow relative overflow-hidden group border border-outline-variant/20">
            <div className="space-y-space-xs">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">view_column</span>
                </div>
                <span className="font-headline-md text-headline-md text-on-surface font-bold">92%</span>
              </div>
              <h3 className="font-title-md text-title-md text-on-surface font-bold">
                Section Header Standard
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Standardized taxonomy categorization ensuring seamless metadata routing.
              </p>
            </div>
            <div className="pt-space-md space-y-1.5">
              <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden">
                <div className="bg-outline h-full rounded-full transition-all duration-500" style={{ width: '92%' }}></div>
              </div>
              <div className="flex justify-between font-label-sm text-label-sm text-on-surface-variant font-medium">
                <span>Standard Titles Met</span>
                <span className="text-on-surface font-bold">Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Split: Issues & AI Optimizations + Robot Parser Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Left 6 cols: Issues & Instant AI Optimizations */}
        <div className="lg:col-span-6 space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-primary text-[22px]">auto_fix_high</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Issues & Instant AI Optimizations
              </h2>
            </div>
            <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm font-semibold">
              {keywordFixApplied && verbFixApplied ? '0 Detected' : keywordFixApplied || verbFixApplied ? '1 Detected' : '2 Detected'}
            </span>
          </div>

          <div className="space-y-space-sm">
            {/* Issue 1 */}
            <div
              className={`rounded-DEFAULT bg-surface-container-lowest p-space-md shadow-md transition-all duration-300 border border-outline-variant/20 ${
                keywordFixApplied ? 'opacity-75' : ''
              }`}
            >
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleAccordion('acc-1')}
              >
                <div className="flex items-start gap-space-sm">
                  <div className="w-7 h-7 rounded-full bg-error-container text-on-error-container flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">priority_high</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-on-surface font-bold">
                      Missing High-Value Keywords
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Key semantic criteria omitted from 'Cloud Infrastructure' scope.
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-200">
                  {activeAccordion === 'acc-1' ? 'expand_less' : 'expand_more'}
                </span>
              </div>

              {activeAccordion === 'acc-1' && (
                <div className="pt-space-md space-y-space-md block">
                  <div className="p-space-sm rounded-DEFAULT bg-surface-container-low space-y-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Detected Absences
                    </span>
                    <div className="flex flex-wrap gap-space-xs">
                      {['Cloud Architecture', 'Strategic OKRs', 'Terraform Enterprise'].map((item) => (
                        <span
                          key={item}
                          className="px-space-sm py-0.5 rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm flex items-center gap-1 font-semibold"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              keywordFixApplied ? 'bg-tertiary-container' : 'bg-error'
                            }`}
                          ></span>
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-space-sm rounded-DEFAULT bg-surface-container-highest/60 text-on-surface space-y-1">
                    <span className="font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">psychology</span> Proposed Neural Injection:
                    </span>
                    <p className="font-body-sm text-body-sm italic">
                      "...directed <span className="bg-primary-fixed text-primary px-1 rounded font-semibold">Cloud Architecture</span> modernizations aligning technical deliverables with executive <span className="bg-primary-fixed text-primary px-1 rounded font-semibold">Strategic OKRs</span> across multi-region deployments..."
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      +3.8 Points Projected
                    </span>
                    <button
                      type="button"
                      onClick={handleApplyKeyword}
                      disabled={keywordFixApplied || isInjecting}
                      className={`px-space-md py-2 rounded-full font-label-md text-label-md flex items-center gap-space-xs shadow-md transition-all cursor-pointer ${
                        keywordFixApplied
                          ? 'bg-tertiary-container text-on-tertiary'
                          : 'bg-primary text-on-primary hover:shadow-xl hover:scale-[1.02]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isInjecting ? 'refresh' : keywordFixApplied ? 'check' : 'auto_fix_high'}
                      </span>
                      <span>
                        {isInjecting
                          ? 'Injecting...'
                          : keywordFixApplied
                          ? 'Injected Successfully'
                          : 'Auto-Inject with AI'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Issue 2 */}
            <div
              className={`rounded-DEFAULT bg-surface-container-lowest p-space-md shadow-md transition-all duration-300 border border-outline-variant/20 ${
                verbFixApplied ? 'opacity-75' : ''
              }`}
            >
              <div
                className="flex items-start justify-between cursor-pointer"
                onClick={() => toggleAccordion('acc-2')}
              >
                <div className="flex items-start gap-space-sm">
                  <div className="w-7 h-7 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[16px]">bolt</span>
                  </div>
                  <div>
                    <h4 className="font-title-md text-title-md text-on-surface font-bold">
                      Weak Passive Action Verbs Detected
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                      Phrases like "Responsible for managing" reduce executive leadership weight.
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant transition-transform duration-200">
                  {activeAccordion === 'acc-2' ? 'expand_less' : 'expand_more'}
                </span>
              </div>

              {activeAccordion === 'acc-2' && (
                <div className="pt-space-md space-y-space-md block">
                  <div className="p-space-sm rounded-DEFAULT bg-surface-container-low space-y-space-xs">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-bold">
                      Identified Sub-optimal Tokens
                    </span>
                    <div className="flex flex-wrap gap-space-xs font-body-sm text-body-sm text-on-surface-variant items-center">
                      <span className="line-through decoration-error text-on-surface-variant">
                        "Helped build and oversee..."
                      </span>
                      <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                        arrow_forward
                      </span>
                      <span className="font-semibold text-tertiary-container">
                        "Spearheaded end-to-end design of..."
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-space-xs">
                    <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                      +2.2 Points Projected
                    </span>
                    <button
                      type="button"
                      onClick={handleApplyVerb}
                      disabled={verbFixApplied || isStrengthening}
                      className={`px-space-md py-2 rounded-full font-label-md text-label-md flex items-center gap-space-xs shadow-md transition-all cursor-pointer ${
                        verbFixApplied
                          ? 'bg-tertiary-container text-on-tertiary'
                          : 'bg-secondary text-on-secondary hover:shadow-xl hover:scale-[1.02]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {isStrengthening ? 'refresh' : verbFixApplied ? 'check' : 'trending_up'}
                      </span>
                      <span>
                        {isStrengthening
                          ? 'Optimizing...'
                          : verbFixApplied
                          ? 'Optimized to Active'
                          : 'Strengthen Verbs'}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Issue 3: Layout Schema Compliance */}
            <div className="rounded-DEFAULT bg-surface-container-lowest p-space-md shadow-md flex items-center justify-between border border-outline-variant/20">
              <div className="flex items-center gap-space-sm">
                <div className="w-7 h-7 rounded-full bg-tertiary-container/20 text-tertiary-container flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                </div>
                <div>
                  <h4 className="font-title-md text-title-md text-on-surface font-bold">
                    Layout Schema Compliance
                  </h4>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    No multi-column nesting, embedded graphics, or floating text frames.
                  </p>
                </div>
              </div>
              <span className="font-label-sm text-label-sm text-tertiary-container font-bold uppercase tracking-wider">
                Passed
              </span>
            </div>
          </div>
        </div>

        {/* Right 6 cols: Robot Parser Stream (Raw View) */}
        <div className="lg:col-span-6 space-y-space-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-secondary text-[22px]">terminal</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Robot Parser Stream (Raw View)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Sanitized Tokens
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-inverse-surface p-space-lg shadow-xl text-inverse-on-surface relative">
            <div className="flex items-center justify-between pb-space-sm text-outline-variant font-label-sm text-label-sm">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-error inline-block opacity-75"></span>
                <span className="w-3 h-3 rounded-full bg-secondary-fixed inline-block opacity-75"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary-fixed inline-block opacity-75"></span>
                <span className="ml-2 font-mono text-[11px] text-surface-variant/80">
                  {atsEngine.toUpperCase()}_NORMALIZER_v14.bin
                </span>
              </span>
              <button
                type="button"
                onClick={copyParsedTokens}
                className="text-surface-variant hover:text-surface font-label-sm text-label-sm flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">content_copy</span>
                <span>Copy Raw Dump</span>
              </button>
            </div>

            <div className="pt-space-sm font-mono text-[12px] leading-[20px] text-surface-container max-h-[360px] overflow-y-auto space-y-2 selection:bg-secondary selection:text-surface-container-lowest">
              <div className="text-tertiary-fixed font-bold">
                [METADATA_HEADER_{atsEngine.toUpperCase()}_PARSED]
              </div>
              <div>CANDIDATE_NAME: "{resume.name || 'Marcus Vance'}"</div>
              <div>PRIMARY_CONTACT: "{resume.email || 'm.vance@precision-domain.ai'}"</div>
              <div>LOCATION_RESOLVED: "San Francisco, CA, US (LAT:37.77, LON:-122.41)"</div>

              <div className="text-tertiary-fixed font-bold pt-1">[EXPERIENCE_STREAM_0]</div>
              <div>ROLE: "{resume.experiences[0]?.role || 'Senior Technical Lead & Systems Architect'}"</div>
              <div>COMPANY: "{resume.experiences[0]?.company || 'CloudNative Dynamics (Enterprise Systems)'}"</div>
              <div>DURATION_MONTHS: 48 (2021-03 -&gt; Present)</div>

              <div
                className={`pl-2 ${
                  keywordFixApplied
                    ? 'text-tertiary-fixed bg-tertiary-container/30 p-1 rounded font-semibold'
                    : 'text-surface-variant'
                }`}
              >
                {keywordFixApplied ? (
                  <span>
                    • Streamlined <span className="underline font-bold">Cloud Architecture</span> modernizations aligning deliverables with <span className="underline font-bold">Strategic OKRs</span>, cutting inter-region latency by 34%.
                  </span>
                ) : (
                  <span>
                    • Streamlined core microservice communication patterns, cutting inter-region networking overhead by 34% across 140+ bare-metal nodes.
                  </span>
                )}
              </div>

              <div
                className={`pl-2 ${
                  verbFixApplied
                    ? 'text-tertiary-fixed bg-tertiary-container/30 p-1 rounded font-semibold'
                    : 'text-surface-variant'
                }`}
              >
                {verbFixApplied ? (
                  <span>
                    • <span className="underline font-bold">Spearheaded</span> enterprise cloud governance standards and guided sprint cadences for 28 senior engineers.
                  </span>
                ) : (
                  <span>
                    • Responsible for cloud governance and leading sprint cycles across global engineering units.
                  </span>
                )}
              </div>

              <div className="text-tertiary-fixed font-bold pt-1">[EXTRACTED_ENTITY_MAP]</div>
              <div>HARD_SKILLS: ["Kubernetes", "Distributed Consensus", "Go", "gRPC", "Kafka", "PostgreSQL", "Cloud Architecture"]</div>
              <div>COMPLIANCE_FLAGS: NONE_FOUND</div>
              <div>HIERARCHY_LEVEL: LEVEL_7_DIRECTOR_EQUIVALENT</div>
            </div>

            <div className="pt-space-md flex items-center justify-between text-surface-variant font-label-sm text-label-sm border-t border-slate-700/60 mt-2">
              <span>Encoding: UTF-8 (Strict)</span>
              <span className="flex items-center gap-1 font-semibold text-tertiary-fixed">
                <span className="material-symbols-outlined text-[14px]">verified</span>
                Zero parse truncation detected
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Target Candidate Tier Achieved Card */}
      <div className="rounded-lg bg-surface-container p-space-lg shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md border border-outline-variant/20">
        <div className="flex items-center gap-space-md">
          <div className="w-12 h-12 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-md">
            <span className="material-symbols-outlined text-[24px]">verified_user</span>
          </div>
          <div>
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Target Candidate Tier Achieved
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Your resume has surpassed the strict tier-1 threshold for 89 corporate ATS filters.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-space-sm shrink-0 w-full md:w-auto">
          <button
            type="button"
            onClick={() => showToast('Full document re-scan completed: 0 parse traps')}
            className="flex-1 md:flex-none px-space-lg py-2.5 rounded-full bg-surface-container-lowest text-on-surface font-label-lg text-label-lg shadow-sm hover:shadow-md transition-all text-center cursor-pointer font-semibold"
          >
            Re-Scan Document
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('export-and-analyze')}
            className="flex-1 md:flex-none px-space-lg py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-xl hover:scale-[1.02] transition-all text-center cursor-pointer font-bold"
          >
            Proceed to Step 5: Export
          </button>
        </div>
      </div>
    </div>
  );
};
