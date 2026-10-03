import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

interface TemplateDef {
  id: string;
  title: string;
  categoryTag: string;
  categoryFilter: string[];
  description: string;
  previewType: string;
}

const TEMPLATES: TemplateDef[] = [
  {
    id: 'cupertino-clean',
    title: 'Cupertino Clean',
    categoryTag: 'Tech • 1-Page Minimal',
    categoryFilter: ['tech', 'compact'],
    description: 'Single-column Swiss typography with 8pt strict cadence.',
    previewType: 'cupertino',
  },
  {
    id: 'nordic-monospace',
    title: 'Nordic Monospace',
    categoryTag: 'Engineering • Technical',
    categoryFilter: ['tech'],
    description: 'Code-block density calibrated for Staff & Principal Engineers.',
    previewType: 'nordic',
  },
  {
    id: 'silicon-valley-elite',
    title: 'Silicon Valley Elite',
    categoryTag: 'Executive • KPI Focus',
    categoryFilter: ['tech', 'executive'],
    description: 'Tailored for VP Product & Founder roles with KPI metrics highlight.',
    previewType: 'silicon',
  },
  {
    id: 'kyoto-grid',
    title: 'Kyoto Grid',
    categoryTag: 'Creative • Asymmetrical',
    categoryFilter: ['creative', 'compact'],
    description: 'Harmonious 35/65 asymmetric balance for designers & architects.',
    previewType: 'kyoto',
  },
  {
    id: 'wall-street-modern',
    title: 'Wall Street Modern',
    categoryTag: 'Executive • Finance',
    categoryFilter: ['executive'],
    description: 'High-finance rigor with classic serifs and quantitative bullet hierarchy.',
    previewType: 'wallstreet',
  },
  {
    id: 'atelier-berlin',
    title: 'Atelier Berlin',
    categoryTag: 'Creative • Editorial',
    categoryFilter: ['creative'],
    description: 'Bauhaus-inspired brutalist structure for visual directors.',
    previewType: 'atelier',
  },
  {
    id: 'oxford-scholar',
    title: 'Oxford Scholar',
    categoryTag: 'Academic • Multi-page',
    categoryFilter: ['academic'],
    description: 'Extensive CV format for PhD candidates, grant writers, and researchers.',
    previewType: 'oxford',
  },
  {
    id: 'austin-hyper-compact',
    title: 'Austin Hyper-Compact',
    categoryTag: 'Compact • High Density',
    categoryFilter: ['compact', 'tech'],
    description: 'Maximum space efficiency. Zero excess margin; ATS verified.',
    previewType: 'austin',
  },
  {
    id: 'zurich-helvetica-strict',
    title: 'Zurich Helvetica Strict',
    categoryTag: 'Minimalist • Swiss',
    categoryFilter: ['academic', 'tech'],
    description: 'Pure baseline adherence with left-margin temporal markers.',
    previewType: 'zurich',
  },
  {
    id: 'singapore-fintech',
    title: 'Singapore Fintech',
    categoryTag: 'FinTech • Metrics',
    categoryFilter: ['executive', 'compact'],
    description: 'Emerald status cues and metric badges for quantitative analysts.',
    previewType: 'singapore',
  },
  {
    id: 'san-francisco-dual-tone',
    title: 'San Francisco Dual-Tone',
    categoryTag: 'Creative • Product',
    categoryFilter: ['creative', 'tech'],
    description: 'Header banner accent with crisp secondary body typography.',
    previewType: 'sf',
  },
  {
    id: 'cambridge-biostatistics',
    title: 'Cambridge Biostatistics',
    categoryTag: 'Academic • Clinical',
    categoryFilter: ['academic'],
    description: 'Curated specifically for clinical trials, medtech, and lab citations.',
    previewType: 'cambridge',
  },
];

export const TemplatesScreen: React.FC = () => {
  const {
    selectedTemplateTitle,
    setSelectedTemplateTitle,
    setActiveTab,
    resume,
    updatePersonalInfo,
  } = useResume();

  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [promptInput, setPromptInput] = useState<string>(
    'Design an ultra-clean dual-column layout for a FinTech VP with emerald accents, metric callout tiles, and high-density timeline.'
  );
  const [isSynthesizing, setIsSynthesizing] = useState<boolean>(false);
  const [accentColor, setAccentColor] = useState<string>('emerald');
  const [fontFamily, setFontFamily] = useState<string>('plus-jakarta');
  const [density, setDensity] = useState<'compact' | 'balanced' | 'relaxed'>('balanced');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['cupertino-clean']);
  const [showDock, setShowDock] = useState<boolean>(true);

  const filterTabs = [
    { id: 'all', label: 'All Blueprints (12)' },
    { id: 'tech', label: 'Minimalist Tech' },
    { id: 'executive', label: 'Executive Modern' },
    { id: 'creative', label: 'Creative & Visual' },
    { id: 'compact', label: 'Compact 1-Page' },
    { id: 'academic', label: 'Academic & Research' },
  ];

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCategory = activeFilter === 'all' || tpl.categoryFilter.includes(activeFilter);
    const matchesSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.categoryTag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSynthesizeCanvas = () => {
    setIsSynthesizing(true);
    setTimeout(() => {
      setIsSynthesizing(false);
      setSelectedTemplateTitle('Singapore Fintech');
      setAccentColor('emerald');
      setShowDock(true);
    }, 900);
  };

  const handleSelectTemplate = (tpl: TemplateDef) => {
    setSelectedTemplateTitle(tpl.title);
    setShowDock(true);
  };

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    );
  };

  const handleConfirmTemplate = () => {
    updatePersonalInfo('selectedTemplateId', selectedTemplateTitle.toLowerCase().replace(/\s+/g, '-'));
    setActiveTab('ats-checker');
  };

  return (
    <div className="relative w-full overflow-hidden px-gutter md:px-margin-desktop py-space-xl max-w-[1520px] mx-auto">
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-gradient-to-tr from-primary/10 via-secondary-container/10 to-transparent blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-40 right-10 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-tertiary-fixed/20 via-surface-variant/40 to-transparent blur-3xl pointer-events-none -z-10"></div>

      {/* Editorial Header & Studio Context */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-space-lg mb-space-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-surface-container text-primary font-label-md text-label-md mb-space-sm shadow-sm font-semibold">
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>Section 03 • Visual Engine & Spatial Typographies</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Curated Blueprint Gallery & AI Prompt Studio
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-space-xs">
            Select an ATS-compliant, typographically structured canvas or generate bespoke editorial layouts with high-fidelity LLM styling prompts.
          </p>
        </div>

        {/* Quick Metrics Strip */}
        <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-sm rounded-lg shadow-sm border border-outline-variant/20">
          <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-DEFAULT bg-surface-container-low">
            <span className="material-symbols-outlined text-tertiary-container text-[20px]">verified</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                ATS Score
              </span>
              <span className="font-title-md text-title-md text-on-surface leading-tight font-bold">
                99.4% Avg
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-xs px-space-md py-space-xs rounded-DEFAULT bg-surface-container-low">
            <span className="material-symbols-outlined text-primary text-[20px]">dataset</span>
            <div className="flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Engine
              </span>
              <span className="font-title-md text-title-md text-on-surface leading-tight font-bold">
                12 Presets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Template Customizer & Prompt Studio Card */}
      <div className="relative w-full rounded-lg bg-surface-container-lowest shadow-md p-space-lg mb-space-xl overflow-hidden border border-outline-variant/20">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary/5 rounded-full blur-2xl pointer-events-none"></div>

        {/* Studio Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-space-sm pb-space-md mb-space-md border-b border-surface-container/60">
          <div className="flex items-center gap-space-sm">
            <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-primary shadow-sm">
              <span className="material-symbols-outlined text-[22px]">magic_button</span>
            </div>
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Prompt-to-Layout Synthesis Studio
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Instruct our layout parser to compose an exclusive typography hierarchy and column schema.
              </p>
            </div>
          </div>
          <div className="inline-flex items-center gap-space-xs px-space-md py-1 rounded-full bg-secondary-fixed/50 text-on-secondary-fixed-variant font-label-md text-label-md font-semibold">
            <span className="w-2 h-2 rounded-full bg-secondary animate-ping"></span>
            <span>Adaptive CSS Grid Ready</span>
          </div>
        </div>

        {/* Prompt Input Shell */}
        <div className="flex flex-col gap-space-md">
          <div className="relative flex flex-col md:flex-row items-stretch gap-space-sm bg-surface-container-low p-space-sm rounded-DEFAULT">
            <div className="flex items-center pl-space-sm text-on-surface-variant">
              <span className="material-symbols-outlined text-[20px]">prompt_suggestion</span>
            </div>
            <input
              className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none px-space-xs py-space-sm"
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Describe role, aesthetic tone, accent requirements, or column structures..."
            />
            <button
              type="button"
              onClick={handleSynthesizeCanvas}
              disabled={isSynthesizing}
              className="flex items-center justify-center gap-space-xs px-space-lg py-space-sm rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-sm hover:shadow-md hover:scale-[1.01] transition-all whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">
                {isSynthesizing ? 'refresh' : 'auto_fix_high'}
              </span>
              <span>{isSynthesizing ? 'Compiling Grid...' : 'Synthesize Canvas'}</span>
            </button>
          </div>

          {/* Live Style Generator Micro-Tokens Strip */}
          <div className="flex flex-wrap items-center justify-between gap-space-md pt-space-xs">
            {/* Color Picker Tokens */}
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Accent Pigment:
              </span>
              <div className="flex items-center gap-space-xs" id="paletteGroup">
                {[
                  { id: 'emerald', bg: 'bg-[#006e4b]' },
                  { id: 'indigo', bg: 'bg-[#4f46e5]' },
                  { id: 'cyan', bg: 'bg-[#00687a]' },
                  { id: 'slate', bg: 'bg-[#283044]' },
                  { id: 'ruby', bg: 'bg-[#ba1a1a]' },
                ].map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setAccentColor(c.id)}
                    className={`w-7 h-7 rounded-full shadow-sm flex items-center justify-center text-white transition-transform hover:scale-110 cursor-pointer ${c.bg}`}
                  >
                    {accentColor === c.id && (
                      <span className="material-symbols-outlined text-[14px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Font Pairing Dropdown */}
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Type Specimen:
              </span>
              <div className="flex items-center bg-surface-container-low px-space-md py-1.5 rounded-full">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant mr-space-xs">
                  format_size
                </span>
                <select
                  value={fontFamily}
                  onChange={(e) => setFontFamily(e.target.value)}
                  className="bg-transparent font-label-md text-label-md text-on-surface focus:outline-none cursor-pointer"
                >
                  <option value="plus-jakarta">Plus Jakarta Sans • Neo-Grotesque</option>
                  <option value="serif-editorial">Editorial Serif • Monospaced Subtext</option>
                  <option value="inter-compact">Inter Display • Compact Standard</option>
                  <option value="geist-mono">Nordic Code • Monospace Grid</option>
                </select>
              </div>
            </div>

            {/* Density Toggle */}
            <div className="flex items-center gap-space-sm">
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-bold">
                Layout Density:
              </span>
              <div className="inline-flex bg-surface-container-low p-1 rounded-full text-label-sm font-label-sm">
                {(['compact', 'balanced', 'relaxed'] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDensity(d)}
                    className={`px-space-sm py-1 rounded-full transition-all capitalize cursor-pointer ${
                      density === d
                        ? 'bg-surface-container-lowest text-primary font-bold shadow-sm'
                        : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Suggestion Chiplet */}
            <div className="hidden xl:flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm">
              <span className="material-symbols-outlined text-[16px] text-tertiary-container">psychology</span>
              <span>
                LLM Suggests: <strong>2-Column Asymmetric (70/30)</strong>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Taxonomy Navigation Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex items-center gap-space-xs overflow-x-auto w-full sm:w-auto pb-space-xs sm:pb-0">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              className={`px-space-md py-1.5 rounded-full font-label-md text-label-md transition-all whitespace-nowrap cursor-pointer ${
                activeFilter === tab.id
                  ? 'bg-primary text-on-primary shadow-sm font-bold'
                  : 'bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest shadow-sm w-full sm:w-64 border border-outline-variant/20">
          <span className="material-symbols-outlined text-[18px] text-on-surface-variant">search</span>
          <input
            className="bg-transparent w-full text-body-sm font-body-sm text-on-surface placeholder:text-outline focus:outline-none"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search templates..."
          />
        </div>
      </div>

      {/* 12-Card Template Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-space-lg">
        {filteredTemplates.map((tpl) => {
          const isSelected = selectedTemplateTitle === tpl.title;
          const isBookmarked = bookmarkedIds.includes(tpl.id);

          return (
            <div
              key={tpl.id}
              onClick={() => handleSelectTemplate(tpl)}
              className={`template-card group flex flex-col rounded-lg bg-surface-container-lowest shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 p-space-md border cursor-pointer ${
                isSelected ? 'ring-2 ring-primary border-primary' : 'border-outline-variant/20'
              }`}
            >
              <div className="relative w-full aspect-[210/297] rounded-DEFAULT bg-surface-container-lowest overflow-hidden shadow-sm flex flex-col p-4 border border-surface-container-high">
                {/* Visual miniature layout wireframes based on previewType */}
                {tpl.previewType === 'cupertino' && (
                  <div className="flex flex-col h-full">
                    <div className="flex items-start justify-between pb-3">
                      <div>
                        <div className="w-24 h-2.5 rounded bg-on-surface mb-1"></div>
                        <div className="w-16 h-1.5 rounded bg-primary"></div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="w-12 h-1 rounded bg-outline-variant"></div>
                        <div className="w-10 h-1 rounded bg-outline-variant"></div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-surface-container-highest my-2"></div>
                    <div className="space-y-1.5 mb-3">
                      <div className="w-14 h-1.5 rounded bg-primary/70"></div>
                      <div className="w-full h-1 rounded bg-surface-dim"></div>
                      <div className="w-5/6 h-1 rounded bg-surface-dim"></div>
                    </div>
                    <div className="space-y-2 mb-3">
                      <div className="w-20 h-1.5 rounded bg-on-surface/80"></div>
                      <div className="pl-2 space-y-1">
                        <div className="w-1/2 h-1.5 rounded bg-on-surface-variant"></div>
                        <div className="w-full h-1 rounded bg-surface-dim"></div>
                        <div className="w-4/5 h-1 rounded bg-surface-dim"></div>
                      </div>
                    </div>
                    <div className="mt-auto pt-2 flex gap-1">
                      <span className="w-6 h-2 rounded bg-surface-container"></span>
                      <span className="w-8 h-2 rounded bg-surface-container"></span>
                      <span className="w-7 h-2 rounded bg-surface-container"></span>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'nordic' && (
                  <div className="flex flex-col h-full font-mono">
                    <div className="bg-surface-container-low p-2 rounded mb-2 flex items-center justify-between">
                      <div className="w-20 h-2 bg-on-surface rounded-xs"></div>
                      <div className="w-3 h-3 rounded-full bg-tertiary-container"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 mb-2">
                      <div className="h-1 bg-surface-dim rounded"></div>
                      <div className="h-1 bg-surface-dim rounded"></div>
                      <div className="h-1 bg-surface-dim rounded"></div>
                    </div>
                    <div className="space-y-1.5 mb-2">
                      <div className="w-16 h-1.5 bg-secondary rounded"></div>
                      <div className="w-full h-1 bg-surface-dim rounded"></div>
                      <div className="w-full h-1 bg-surface-dim rounded"></div>
                    </div>
                    <div className="mt-auto space-y-1">
                      <div className="flex gap-1">
                        <span className="w-10 h-2 bg-secondary-fixed rounded"></span>
                        <span className="w-10 h-2 bg-secondary-fixed rounded"></span>
                      </div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'silicon' && (
                  <div className="flex flex-col h-full">
                    <div className="text-center pb-2">
                      <div className="w-28 h-2.5 mx-auto rounded bg-on-surface mb-1"></div>
                      <div className="w-20 h-1.5 mx-auto rounded bg-primary mb-1"></div>
                    </div>
                    <div className="w-full h-0.5 bg-surface-container my-1.5"></div>
                    <div className="grid grid-cols-3 gap-1.5 my-2">
                      <div className="bg-surface-container-low p-1 rounded text-center">
                        <div className="w-6 h-1 mx-auto bg-primary rounded mb-0.5"></div>
                        <div className="w-8 h-1 mx-auto bg-surface-dim rounded"></div>
                      </div>
                      <div className="bg-surface-container-low p-1 rounded text-center">
                        <div className="w-6 h-1 mx-auto bg-primary rounded mb-0.5"></div>
                        <div className="w-8 h-1 mx-auto bg-surface-dim rounded"></div>
                      </div>
                      <div className="bg-surface-container-low p-1 rounded text-center">
                        <div className="w-6 h-1 mx-auto bg-primary rounded mb-0.5"></div>
                        <div className="w-8 h-1 mx-auto bg-surface-dim rounded"></div>
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-2 mt-auto">
                      <div className="w-16 h-1.5 rounded bg-on-surface"></div>
                      <div className="w-full h-1 rounded bg-surface-dim"></div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'kyoto' && (
                  <div className="flex h-full gap-2">
                    <div className="w-1/3 bg-surface-container-low rounded p-2 flex flex-col justify-between">
                      <div>
                        <div className="w-8 h-8 rounded-full bg-primary-container mb-2"></div>
                        <div className="w-10 h-2 bg-on-surface rounded mb-1"></div>
                        <div className="space-y-1">
                          <div className="w-10 h-1 bg-surface-dim rounded"></div>
                          <div className="w-8 h-1 bg-surface-dim rounded"></div>
                        </div>
                      </div>
                      <div className="w-6 h-1 bg-primary rounded"></div>
                    </div>
                    <div className="w-2/3 flex flex-col justify-between py-1">
                      <div className="space-y-2">
                        <div className="w-24 h-2 bg-on-surface rounded"></div>
                        <div className="w-full h-1 bg-surface-dim rounded"></div>
                        <div className="w-3/4 h-1 bg-surface-dim rounded"></div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="w-16 h-1.5 bg-secondary rounded"></div>
                        <div className="w-full h-1 bg-surface-dim rounded"></div>
                      </div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'wallstreet' && (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 pb-2">
                      <div className="w-2.5 h-10 bg-primary rounded-xs"></div>
                      <div>
                        <div className="w-28 h-2.5 bg-on-surface rounded mb-1"></div>
                        <div className="w-20 h-1 bg-outline rounded"></div>
                      </div>
                    </div>
                    <div className="w-full h-px bg-surface-container-highest my-1"></div>
                    <div className="space-y-2 mt-2">
                      <div className="w-20 h-1.5 bg-on-surface rounded"></div>
                      <div className="w-full h-1 bg-surface-dim rounded"></div>
                      <div className="w-4/5 h-1 bg-surface-dim rounded"></div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'atelier' && (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-20 h-5 bg-inverse-surface rounded-xs"></div>
                      <div className="w-6 h-6 rounded-full bg-secondary-fixed"></div>
                    </div>
                    <div className="w-12 h-1 bg-primary mb-2"></div>
                    <div className="w-full h-1 bg-surface-dim rounded mb-1"></div>
                    <div className="grid grid-cols-2 gap-2 mt-auto">
                      <div className="bg-surface-container-low p-2 rounded">
                        <div className="w-10 h-1.5 bg-on-surface rounded mb-1"></div>
                      </div>
                      <div className="bg-surface-container-low p-2 rounded">
                        <div className="w-10 h-1.5 bg-on-surface rounded mb-1"></div>
                      </div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'oxford' && (
                  <div className="flex flex-col h-full text-center">
                    <div className="w-32 h-2 mx-auto bg-on-surface rounded mb-1"></div>
                    <div className="w-24 h-1 mx-auto bg-outline rounded mb-1"></div>
                    <div className="w-full h-px bg-surface-container-high my-1"></div>
                    <div className="space-y-1.5 my-2 text-left">
                      <div className="w-24 h-1.5 bg-on-surface rounded"></div>
                      <div className="w-full h-1 bg-surface-dim rounded"></div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'austin' && (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center mb-1">
                      <div className="w-20 h-2 bg-on-surface rounded"></div>
                      <div className="w-14 h-1 bg-primary rounded"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 my-1">
                      <div className="space-y-1">
                        <div className="w-12 h-1 bg-on-surface rounded"></div>
                        <div className="w-full h-0.5 bg-surface-dim rounded"></div>
                      </div>
                      <div className="space-y-1">
                        <div className="w-12 h-1 bg-on-surface rounded"></div>
                        <div className="w-full h-0.5 bg-surface-dim rounded"></div>
                      </div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'zurich' && (
                  <div className="flex flex-col h-full">
                    <div className="w-16 h-2 bg-on-surface mb-1"></div>
                    <div className="w-full h-1 bg-primary mb-3"></div>
                    <div className="flex gap-2 mb-3">
                      <div className="w-1/4">
                        <div className="w-10 h-1 bg-outline rounded"></div>
                      </div>
                      <div className="w-3/4 space-y-1">
                        <div className="w-20 h-1.5 bg-on-surface rounded"></div>
                        <div className="w-full h-1 bg-surface-dim rounded"></div>
                      </div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'singapore' && (
                  <div className="flex flex-col h-full">
                    <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-DEFAULT mb-2">
                      <div>
                        <div className="w-20 h-2 bg-on-surface rounded mb-0.5"></div>
                        <div className="w-12 h-1 bg-tertiary-container rounded"></div>
                      </div>
                      <div className="w-8 h-8 rounded bg-surface-container flex items-center justify-center text-[10px] text-tertiary-container font-bold">
                        99
                      </div>
                    </div>
                    <div className="space-y-1.5 mb-2">
                      <div className="w-14 h-1.5 bg-on-surface rounded"></div>
                      <div className="w-full h-1 bg-surface-dim rounded"></div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'sf' && (
                  <div className="flex flex-col h-full -m-4">
                    <div className="h-8 bg-primary-container p-2 flex items-center justify-between">
                      <div className="w-20 h-2 bg-on-primary rounded"></div>
                      <div className="w-10 h-1 bg-on-primary-container rounded"></div>
                    </div>
                    <div className="p-3 space-y-2 flex-1 flex flex-col">
                      <div className="w-full h-1 bg-surface-dim rounded"></div>
                      <div className="w-5/6 h-1 bg-surface-dim rounded"></div>
                    </div>
                  </div>
                )}

                {tpl.previewType === 'cambridge' && (
                  <div className="flex flex-col h-full">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-7 h-7 rounded bg-secondary-fixed flex items-center justify-center text-secondary font-bold text-xs">
                        Rx
                      </div>
                      <div>
                        <div className="w-24 h-2 bg-on-surface rounded"></div>
                        <div className="w-16 h-1 bg-outline rounded"></div>
                      </div>
                    </div>
                    <div className="w-full h-0.5 bg-surface-container-highest my-1"></div>
                  </div>
                )}

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-inverse-surface/80 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 flex flex-col items-center justify-center gap-space-sm p-space-md text-center">
                  <span className="font-title-md text-title-md text-inverse-on-surface font-bold">
                    {tpl.title}
                  </span>
                  <span className="font-body-sm text-body-sm text-inverse-on-surface/80">
                    {tpl.description}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectTemplate(tpl);
                    }}
                    className="use-btn px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:scale-105 transition-transform mt-space-xs cursor-pointer"
                  >
                    Select Preset
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-space-sm">
                <div>
                  <h3 className="font-title-md text-title-md text-on-surface font-bold">
                    {tpl.title}
                  </h3>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {tpl.categoryTag}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={(e) => toggleBookmark(tpl.id, e)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                    isBookmarked
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-container-low hover:bg-primary hover:text-on-primary text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {isBookmarked ? 'bookmark' : 'bookmark_add'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Selection Float Dock */}
      {showDock && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 bg-surface-container-lowest/95 backdrop-blur-xl px-space-lg py-space-sm rounded-full shadow-2xl flex items-center gap-space-md border border-outline-variant/30">
          <div className="flex items-center gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-tertiary-container animate-pulse"></span>
            <span className="font-label-md text-label-md text-on-surface font-medium">
              Active Template: <strong className="text-primary font-bold">{selectedTemplateTitle}</strong>
            </span>
          </div>
          <div className="w-px h-5 bg-surface-container-highest"></div>
          <button
            type="button"
            onClick={handleConfirmTemplate}
            className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:scale-105 transition-transform cursor-pointer"
          >
            Apply to Editor Canvas & Next →
          </button>
        </div>
      )}
    </div>
  );
};
