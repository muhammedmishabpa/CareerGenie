import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

export const JobMatchScreen: React.FC = () => {
  const {
    resume,
    updatePersonalInfo,
    toggleSkill,
    addCustomSkill,
    setActiveTab,
    setIsDrawerOpen,
  } = useResume();

  const [activeScore, setActiveScore] = useState<number>(83);
  const [viewMode, setViewMode] = useState<'diff' | 'preview'>('diff');
  const [tone, setTone] = useState<string>('Impactful & Concise');
  const [level, setLevel] = useState<string>('Staff / Principal');
  const [optimization, setOptimization] = useState<string>('ATS 99th-Percentile');
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [streamedText, setStreamedText] = useState<string>(
    'Architectural Staff Product Designer with 8+ years scaling multi-tier design systems and canvas collaboration tools. Spearheaded multi-modal token infrastructure reducing front-end handoff latency by 42% across 14 product squads; engineered zero-latency component libraries supporting 2.4M daily active creators. Proven expertise unifying complex Figma-to-code React pipelines and elevating design maturity across global engineering teams.'
  );
  const [copyFeedback, setCopyFeedback] = useState<string>('Copy Output');
  const [customSkillInput, setCustomSkillInput] = useState<string>('');

  const variations = [
    {
      summary:
        'Architectural Staff Product Designer with 8+ years scaling multi-tier design systems and canvas collaboration tools. Spearheaded multi-modal token infrastructure reducing front-end handoff latency by 42% across 14 product squads; engineered zero-latency component libraries supporting 2.4M daily active creators. Proven expertise unifying complex Figma-to-code React pipelines and elevating design maturity across global engineering teams.',
      bullets: [
        'Spearheaded design system modernization, driving a 42% reduction in sprint cycle velocity across 14 cross-functional squads.',
        'Architected automated Figma-to-React component token bridge adopted by 120+ engineers with zero regression.',
        'Championed continuous user research cohort of 50+ enterprise customers, elevating CSAT from 74 to 92 in 3 quarters.',
      ],
    },
    {
      summary:
        'Principal Systems & Interaction Designer combining deep UI architectural rigor with modern token compiler workflows. Engineered multi-brand canvas mechanics across 16 core platforms, eliminating design debt by 47% and establishing Fortune 50 design governance standards.',
      bullets: [
        'Delivered unified token schema adopted across web, desktop, and iOS canvases.',
        'Accelerated design review sign-offs by 38% via automated contrast & WCAG validation tooling.',
        'Mentored and leveled 12 mid-career designers across systems thinking and spatial canvas mechanics.',
      ],
    },
  ];

  const [currentVariationIdx, setCurrentVariationIdx] = useState<number>(0);

  const setRolePreset = (roleTitle: string, company: 'figma' | 'anthropic' | 'stripe') => {
    updatePersonalInfo('targetTitle', roleTitle);
    updatePersonalInfo('targetCompany', company.charAt(0).toUpperCase() + company.slice(1));

    if (company === 'figma') {
      updatePersonalInfo(
        'jobDescription',
        "We are looking for a Staff Product Designer to lead Figma's core design system infrastructure and collaboration canvas. You will architect multi-modal canvas interactions, elevate token management frameworks, mentor L5 designers, and build tight integrations between Figma design paradigms and production React token pipelines."
      );
    } else if (company === 'anthropic') {
      updatePersonalInfo(
        'jobDescription',
        'Anthropic seeks an AI Solutions Architect to lead enterprise multimodal deployments of Claude. Responsible for context window optimization, fine-tuning infrastructure, prompt chaining, customer trust architectures, and enterprise AI evaluation benchmarks.'
      );
    } else if (company === 'stripe') {
      updatePersonalInfo(
        'jobDescription',
        'Stripe is hiring a Director of Product for Global Payments. Lead 6 product squads delivering real-time rail payment orchestration, fraud intelligence, and merchant treasury primitives handling $50B+ annualized transaction volume.'
      );
    }

    setActiveScore((s) => Math.min(99, s + 4));
  };

  const handleToggleSkill = (name: string, weight: number) => {
    toggleSkill(name);
    const wasActive = resume.skills.find((s) => s.name === name)?.active;
    setActiveScore((s) => Math.max(55, Math.min(99, wasActive ? s - weight : s + weight)));
  };

  const handleAddCustomSkill = () => {
    if (!customSkillInput.trim()) return;
    addCustomSkill(customSkillInput.trim(), 95);
    setCustomSkillInput('');
    setActiveScore((s) => Math.min(99, s + 5));
  };

  const handleSynthesize = () => {
    setIsSynthesizing(true);
    const nextIdx = (currentVariationIdx + 1) % variations.length;
    setCurrentVariationIdx(nextIdx);
    const target = variations[nextIdx];

    setStreamedText('');
    setTimeout(() => {
      const words = target.summary.split(' ');
      let i = 0;
      const interval = setInterval(() => {
        if (i < words.length) {
          setStreamedText((prev) => (i === 0 ? words[0] : `${prev} ${words[i]}`));
          i++;
        } else {
          clearInterval(interval);
          setIsSynthesizing(false);
          setActiveScore((s) => Math.min(98, s + 3));
        }
      }, 25);
    }, 400);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(streamedText);
    setCopyFeedback('Copied!');
    setTimeout(() => setCopyFeedback('Copy Output'), 2000);
  };

  const handleInsertIntoMaster = () => {
    updatePersonalInfo('summary', streamedText);
    setCopyFeedback('Inserted Into Master!');
    setTimeout(() => setCopyFeedback('Copy Output'), 2000);
  };

  const activeSkillsCount = resume.skills.filter((s) => s.active).length;
  const strokeOffset = 125.6 - 125.6 * (activeScore / 100);

  return (
    <div className="w-full max-w-[1520px] mx-auto px-gutter py-space-lg flex flex-col gap-space-xl">
      {/* Workspace Sub-Header & Breadcrumb Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm tracking-wide uppercase font-bold">
              Stage 02 of 05
            </span>
            <span className="text-on-surface-variant font-label-sm text-label-sm">•</span>
            <span className="text-on-surface-variant font-label-sm text-label-sm font-medium">
              Algorithmic Resume Calibration
            </span>
          </div>
          <div className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Job Targeting & AI Skill Bridge
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Anchor your career narrative to specific employer requirements. Our neural engine aligns your capabilities with algorithmic ATS score thresholds in real time.
          </p>
        </div>

        {/* Live Match Meter Top-Level Card */}
        <div className="flex items-center gap-space-md p-space-md bg-surface-container-lowest rounded-DEFAULT shadow-md shrink-0 border border-outline-variant/20">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 48 48">
              <circle
                className="text-surface-container-high"
                cx="24"
                cy="24"
                fill="none"
                r="20"
                stroke="currentColor"
                strokeWidth="4"
              />
              <circle
                className="text-primary-container transition-all duration-700"
                cx="24"
                cy="24"
                fill="none"
                r="20"
                stroke="currentColor"
                strokeDasharray="125.6"
                strokeDashoffset={strokeOffset}
                strokeLinecap="round"
                strokeWidth="4"
              />
            </svg>
            <span className="absolute font-headline-sm text-headline-sm text-on-surface font-extrabold tabular-nums">
              {activeScore}
              <span className="text-[10px] text-primary align-super">%</span>
            </span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-space-xs">
              <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
              <span className="font-label-md text-label-md text-tertiary-container uppercase tracking-wide font-bold">
                Dynamic ATS Index
              </span>
            </div>
            <span className="font-title-md text-title-md text-on-surface font-bold">Target Ready</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Top 4% of applicant cohort</span>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT 7 COLS: Targeting Workbench & Skill Cloud */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg min-w-0">
          {/* Job Profile Target Input Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-DEFAULT shadow-sm flex flex-col gap-space-md relative overflow-hidden border border-outline-variant/20">
            <div className="absolute -right-12 -top-12 w-44 h-44 bg-surface-container-high rounded-full blur-3xl pointer-events-none opacity-60"></div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">target</span>
                <span className="font-title-md text-title-md text-on-surface font-bold">
                  Target Position & Organization
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant px-2 py-0.5 rounded-full bg-surface-container font-semibold">
                Required Input
              </span>
            </div>

            <div className="flex flex-col gap-space-xs">
              <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                Target Job Title & Company
              </label>
              <div className="flex items-center bg-surface-container-low rounded-full px-space-md py-1.5 focus-within:bg-surface-container-lowest focus-within:shadow-md transition-all">
                <span className="material-symbols-outlined text-on-surface-variant text-[20px] mr-2">
                  work_outline
                </span>
                <input
                  className="w-full bg-transparent font-title-md text-title-md text-on-surface focus:outline-none placeholder:text-outline"
                  type="text"
                  value={resume.targetTitle}
                  onChange={(e) => updatePersonalInfo('targetTitle', e.target.value)}
                  placeholder="e.g. Senior Machine Learning Engineer at OpenAI"
                />
                <button
                  type="button"
                  onClick={() => updatePersonalInfo('targetTitle', '')}
                  className="shrink-0 ml-2 px-space-sm py-1 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface-variant font-label-sm text-label-sm transition-colors cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>

            {/* Quick Trending Pill Selector */}
            <div className="flex flex-col gap-space-xs">
              <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold">
                <span className="material-symbols-outlined text-[14px] text-primary">trending_up</span>
                Populate with Trending High-Impact Roles:
              </span>
              <div className="flex flex-wrap gap-space-xs">
                <button
                  type="button"
                  onClick={() => setRolePreset('Staff Product Designer at Figma', 'figma')}
                  className="px-space-md py-1 rounded-full bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary transition-all font-label-md text-label-md flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Figma • Staff Product Designer</span>
                  <span className="font-label-sm opacity-70">Design Systems</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRolePreset('Lead AI Solutions Architect at Anthropic', 'anthropic')}
                  className="px-space-md py-1 rounded-full bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary transition-all font-label-md text-label-md flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Anthropic • AI Architect</span>
                  <span className="font-label-sm opacity-70">LLMs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRolePreset('Director of Product at Stripe', 'stripe')}
                  className="px-space-md py-1 rounded-full bg-surface-container text-on-surface hover:bg-primary-container hover:text-on-primary transition-all font-label-md text-label-md flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Stripe • Director of Product</span>
                  <span className="font-label-sm opacity-70">Fintech</span>
                </button>
              </div>
            </div>

            {/* Job Description Ingestion Box */}
            <div className="flex flex-col gap-space-xs">
              <div className="flex items-center justify-between">
                <label className="font-label-md text-label-md text-on-surface-variant font-medium">
                  Target Job Description (Paste Text or Raw Requirements)
                </label>
                <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">
                  Parsed: 32 Key Signals Detected
                </span>
              </div>
              <div className="relative">
                <textarea
                  className="w-full bg-surface-container-low p-space-md rounded-DEFAULT font-body-sm text-body-sm text-on-surface focus:outline-none focus:bg-surface-container-lowest focus:shadow-md transition-all resize-none leading-relaxed"
                  rows={4}
                  value={resume.jobDescription}
                  onChange={(e) => updatePersonalInfo('jobDescription', e.target.value)}
                  placeholder="Paste full requisition here to let Genie extract unwritten competencies, seniority keywords, and hiring manager priorities..."
                />
                <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-surface-container-lowest/90 px-2 py-1 rounded-full shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-pulse"></span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    Real-time Semantic Sync
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Conversational Skill Bridge Interactive Tag Cloud */}
          <div className="bg-surface-container-lowest p-space-lg rounded-DEFAULT shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between flex-wrap gap-space-xs">
              <div className="flex items-center gap-space-xs">
                <div className="w-7 h-7 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">psychology</span>
                </div>
                <div>
                  <div className="font-title-md text-title-md text-on-surface font-bold">Interactive Skill Bridge</div>
                  <div className="font-body-sm text-body-sm text-on-surface-variant">
                    Which competencies bridge directly to this role? Tap to calibrate match weights.
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-low px-space-md py-1 rounded-full">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Selected:</span>
                <span className="font-label-md text-label-md text-primary font-bold">
                  {activeSkillsCount} Skills Active
                </span>
              </div>
            </div>

            {/* Spring Tag Cloud */}
            <div className="flex flex-wrap gap-space-sm pt-space-xs">
              {resume.skills.map((skill) => {
                const isActive = skill.active;
                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => handleToggleSkill(skill.name, skill.weight)}
                    className={`skill-chip group flex items-center gap-space-xs px-space-md py-2 rounded-full shadow-sm hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-primary-container text-on-primary'
                        : 'bg-surface-container-low text-on-surface hover:bg-surface-container-high'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-[16px] ${
                        isActive ? 'text-on-primary' : 'text-on-surface-variant'
                      }`}
                    >
                      {isActive ? 'check_circle' : 'add_circle_outline'}
                    </span>
                    <span className="font-label-md text-label-md font-semibold">{skill.name}</span>
                    <span
                      className={`px-1.5 py-0.5 rounded-full font-label-sm text-label-sm font-bold ${
                        isActive
                          ? 'bg-white/20 text-on-primary'
                          : 'bg-surface-container text-on-surface-variant'
                      }`}
                    >
                      {skill.match}% Match
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Add Custom Skill Trigger Input */}
            <div className="flex items-center gap-space-xs pt-space-xs">
              <div className="flex-1 flex items-center bg-surface-container-low rounded-full px-space-md py-1">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-1">
                  add
                </span>
                <input
                  className="bg-transparent text-on-surface font-body-sm text-body-sm w-full focus:outline-none placeholder:text-outline"
                  type="text"
                  value={customSkillInput}
                  onChange={(e) => setCustomSkillInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAddCustomSkill();
                  }}
                  placeholder="Add custom skill (e.g. Canvas Engine, WebGL, Design Strategy)..."
                />
              </div>
              <button
                type="button"
                onClick={handleAddCustomSkill}
                className="px-space-md py-1.5 rounded-full bg-surface-container-high hover:bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold transition-all cursor-pointer shadow-xs"
              >
                Add To Matrix
              </button>
            </div>
          </div>

          {/* ATS Keywords Real-time Coverage Radar Mini Bento */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
            <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm flex flex-col justify-between gap-space-xs border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Keywords Density
              </span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">24 / 28</span>
                <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">91%</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '91%' }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm flex flex-col justify-between gap-space-xs border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Executive Seniority Sync
              </span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">L6 Staff</span>
                <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">Matched</span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm flex flex-col justify-between gap-space-xs border border-outline-variant/20">
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                Quantifiable Metrics Lift
              </span>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-headline-md text-headline-md text-on-surface font-bold">+340%</span>
                <span className="font-label-sm text-label-sm text-secondary-container font-bold text-on-secondary-container px-1 rounded">
                  Projected
                </span>
              </div>
              <div className="w-full bg-surface-container-high rounded-full h-1.5 overflow-hidden">
                <div className="bg-secondary h-full rounded-full" style={{ width: '84%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLS: Glowing AI Summary Synthesizer & Diff Comparison */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg min-w-0">
          {/* Glowing Synthesizer Control Console */}
          <div className="relative bg-surface-container-lowest p-space-lg rounded-DEFAULT shadow-xl overflow-hidden border border-outline-variant/20">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary-fixed blur-3xl opacity-50 pointer-events-none"></div>
            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-secondary-fixed blur-3xl opacity-40 pointer-events-none"></div>

            <div className="relative flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-primary text-[22px]">auto_awesome</span>
                  <span className="font-title-md text-title-md text-on-surface font-bold">
                    AI Summary Synthesizer
                  </span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                  Genie Neural v3.4
                </span>
              </div>

              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Configure parameters to generate a targeted executive statement and quantified career highlights tailored directly to the {resume.targetCompany || 'target'} requisition.
              </p>

              {/* Prompt Controls Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-xs bg-surface-container-low p-space-xs rounded-lg">
                <div className="flex flex-col p-2 bg-surface-container-lowest rounded-md shadow-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Tone</span>
                  <select
                    value={tone}
                    onChange={(e) => setTone(e.target.value)}
                    className="font-label-md text-label-md text-on-surface bg-transparent focus:outline-none cursor-pointer mt-0.5 font-semibold"
                  >
                    <option>Impactful & Concise</option>
                    <option>Visionary Executive</option>
                    <option>Engineering Deep</option>
                    <option>Pragmatic Results</option>
                  </select>
                </div>

                <div className="flex flex-col p-2 bg-surface-container-lowest rounded-md shadow-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Level</span>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="font-label-md text-label-md text-on-surface bg-transparent focus:outline-none cursor-pointer mt-0.5 font-semibold"
                  >
                    <option>Staff / Principal</option>
                    <option>Senior Specialist</option>
                    <option>Lead / Director</option>
                    <option>Mid-Level Growth</option>
                  </select>
                </div>

                <div className="flex flex-col p-2 bg-surface-container-lowest rounded-md shadow-xs">
                  <span className="font-label-sm text-label-sm text-on-surface-variant">Optimization</span>
                  <select
                    value={optimization}
                    onChange={(e) => setOptimization(e.target.value)}
                    className="font-label-md text-label-md text-on-surface bg-transparent focus:outline-none cursor-pointer mt-0.5 font-semibold"
                  >
                    <option>ATS 99th-Percentile</option>
                    <option>Human Recruiter Flow</option>
                    <option>Strict Keyword Match</option>
                  </select>
                </div>
              </div>

              {/* Primary 1-Click Action Button */}
              <button
                type="button"
                onClick={handleSynthesize}
                disabled={isSynthesizing}
                className="w-full py-3.5 px-space-lg rounded-full bg-primary text-on-primary font-title-md text-title-md font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-space-xs relative overflow-hidden group cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px] transition-transform duration-500 group-hover:rotate-180">
                  auto_awesome
                </span>
                <span>{isSynthesizing ? 'Synthesizing...' : 'Synthesize Executive Summary'}</span>
                {isSynthesizing && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin ml-2"></div>
                )}
              </button>
            </div>
          </div>

          {/* Diff Highlight Comparison Box */}
          <div className="bg-surface-container-lowest p-space-lg rounded-DEFAULT shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-secondary text-[20px]">difference</span>
                <span className="font-title-md text-title-md text-on-surface font-bold">Diff Comparison</span>
              </div>
              <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-full text-label-sm font-semibold">
                <button
                  type="button"
                  onClick={() => setViewMode('diff')}
                  className={`px-space-sm py-0.5 rounded-full cursor-pointer transition-colors ${
                    viewMode === 'diff'
                      ? 'bg-surface-container-lowest shadow-xs text-on-surface font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Side-by-Side Diff
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('preview')}
                  className={`px-space-sm py-0.5 rounded-full cursor-pointer transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-surface-container-lowest shadow-xs text-on-surface font-bold'
                      : 'text-on-surface-variant hover:text-on-surface'
                  }`}
                >
                  Resume Ready
                </button>
              </div>
            </div>

            {viewMode === 'diff' ? (
              <div className="flex flex-col gap-space-md">
                {/* Legacy / Before Draft */}
                <div className="flex flex-col gap-space-xs p-space-md rounded-DEFAULT bg-surface-container-low/70">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-on-surface-variant flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-error"></span> Before (Generic Baseline)
                    </span>
                    <span className="font-label-sm text-label-sm text-error font-medium">ATS Match: 52%</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-through decoration-error/50">
                    Experienced Product Designer working on user interfaces, design systems, and web apps. Led design reviews and worked closely with product managers and engineers to build product features. Skilled in Figma, prototypes, and user interviews.
                  </p>
                </div>

                {/* AI Genie Synthesized Result */}
                <div className="flex flex-col gap-space-xs p-space-md rounded-DEFAULT bg-primary-fixed/30 relative">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase font-bold text-primary flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary-container"></span> AI Genie Tailored Output
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary-container font-extrabold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">arrow_upward</span> ATS Match: 98%
                    </span>
                  </div>

                  <p className="font-body-md text-body-md text-on-surface leading-relaxed font-medium min-h-[90px]">
                    {streamedText}
                  </p>

                  {/* Bullets */}
                  <div className="pt-space-xs flex flex-col gap-space-xs">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface-variant">
                      Synthesized High-Impact Bullets:
                    </span>
                    <ul className="flex flex-col gap-space-xs text-body-sm font-body-sm text-on-surface">
                      {variations[currentVariationIdx].bullets.map((b, idx) => (
                        <li key={idx} className="flex items-start gap-space-xs">
                          <span className="material-symbols-outlined text-primary text-[16px] shrink-0 mt-0.5">
                            verified
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-space-xs flex-wrap gap-2">
                    <div className="flex items-center gap-space-xs">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="px-space-md py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">content_copy</span>
                        <span>{copyFeedback}</span>
                      </button>
                      <button
                        type="button"
                        onClick={handleSynthesize}
                        className="px-space-md py-1 rounded-full bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm shadow-xs flex items-center gap-1 transition-all cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[14px]">refresh</span>
                        <span>Re-Roll</span>
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={handleInsertIntoMaster}
                      className="px-space-md py-1 rounded-full bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-xs hover:scale-105 transition-all cursor-pointer"
                    >
                      Insert Into Master Draft →
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-space-md p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-inner">
                <div className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                  Executive Summary Section Draft
                </div>
                <div className="font-body-md text-body-md text-on-surface leading-relaxed">
                  {streamedText}
                </div>
                <div className="p-space-sm bg-surface-container-low rounded-DEFAULT flex items-center justify-between">
                  <span className="font-label-sm text-label-sm text-on-surface">
                    Estimated Recruiter Scanning Time: <strong>14.2s</strong>
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary-container font-bold">
                    Grade A+ Impact
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Contextual Navigation Floating Dock */}
      <div className="w-full flex items-center justify-between p-space-md rounded-DEFAULT bg-surface-container-lowest shadow-sm mt-space-sm border border-outline-variant/20">
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className="px-space-lg py-2 rounded-full bg-surface-container-low text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-all font-label-lg text-label-lg flex items-center gap-space-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Back: Personal Details</span>
          </button>
          <span className="hidden sm:inline font-body-sm text-body-sm text-on-surface-variant font-medium">
            Changes saved automatically to session draft
          </span>
        </div>
        <div className="flex items-center gap-space-sm">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            className="px-space-md py-2 rounded-full bg-surface-container-low text-on-surface hover:bg-surface-container transition-all font-label-lg text-label-lg hidden md:flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">visibility</span>
            <span>Preview Layout</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('templates')}
            className="px-space-xl py-2 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold shadow-md hover:shadow-lg hover:scale-102 transition-all flex items-center gap-space-xs cursor-pointer"
          >
            <span>Proceed to Template Stylist</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </div>
    </div>
  );
};
