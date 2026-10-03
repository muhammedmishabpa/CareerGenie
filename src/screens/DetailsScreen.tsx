import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

export const DetailsScreen: React.FC = () => {
  const {
    resume,
    updatePersonalInfo,
    setActiveTab,
    loadPreset,
    resetResume,
    polishSummary,
    polishAll,
    addExperience,
    removeExperience,
    addEducation,
  } = useResume();

  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [isAddingRole, setIsAddingRole] = useState<boolean>(false);
  const [newRole, setNewRole] = useState({
    role: '',
    company: '',
    period: '',
    bullet: '',
    tags: '',
  });

  const [isAddingDegree, setIsAddingDegree] = useState<boolean>(false);
  const [newDegree, setNewDegree] = useState({
    degree: '',
    school: '',
    period: '',
  });

  const handleChipInject = (field: 'name' | 'headline' | 'location' | 'portfolio' | 'github', val: string) => {
    updatePersonalInfo(field, val);
  };

  const handleSaveRole = () => {
    if (!newRole.role || !newRole.company) return;
    addExperience({
      id: `exp-${Date.now()}`,
      role: newRole.role,
      company: newRole.company,
      period: newRole.period || '2023 – Present',
      bullets: [newRole.bullet || 'Designed and executed high-impact initiatives yielding tangible business acceleration.'],
      tags: newRole.tags ? newRole.tags.split(',').map((t) => t.trim()) : ['Cloud', 'Systems'],
    });
    setNewRole({ role: '', company: '', period: '', bullet: '', tags: '' });
    setIsAddingRole(false);
  };

  const handleSaveDegree = () => {
    if (!newDegree.degree || !newDegree.school) return;
    addEducation({
      id: `edu-${Date.now()}`,
      degree: newDegree.degree,
      school: newDegree.school,
      period: newDegree.period || '2020 – 2024',
    });
    setNewDegree({ degree: '', school: '', period: '' });
    setIsAddingDegree(false);
  };

  const wordCount = resume.summary
    ? resume.summary.trim().split(/\s+/).length
    : 0;

  return (
    <div className="w-full px-gutter md:px-margin-desktop py-space-md md:py-space-lg max-w-[1720px] mx-auto">
      {/* Header Control Bar: Workflow Breadcrumbs & Live Action Triggers */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md mb-space-lg">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-label-sm text-label-sm uppercase tracking-wider">
            <span className="text-primary font-bold">Step 01 / 05</span>
            <span>•</span>
            <span>Profile Calibration</span>
            <span>•</span>
            <span className="inline-flex items-center text-tertiary-container gap-1 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-ping"></span>
              Bi-directional Sync
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Personal & Professional Identity
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Synthesize your core career credentials with real-time semantic ATS alignment.
          </p>
        </div>

        {/* Action Pill Bar */}
        <div className="flex flex-wrap items-center gap-space-xs bg-surface-container-low p-1.5 rounded-full shadow-sm">
          <button
            type="button"
            onClick={() => loadPreset('tech-lead')}
            className="px-space-md py-1.5 rounded-full bg-surface-container-lowest text-primary font-label-md text-label-md shadow-sm hover:shadow transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">magic_button</span>
            <span>Load Tech Lead Preset</span>
          </button>
          <button
            type="button"
            onClick={polishAll}
            className="px-space-md py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center gap-1.5 shadow-[0_4px_16px_rgba(79,70,229,0.25)] cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">auto_awesome</span>
            <span>AI Polish All</span>
          </button>
          <button
            type="button"
            onClick={resetResume}
            className="px-space-md py-1.5 rounded-full text-on-surface-variant hover:text-error hover:bg-surface-container-lowest transition-all font-label-md text-label-md flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">refresh</span>
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Asymmetric Split Workspace (5 cols Form : 7 cols Live Canvas) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT PANEL: Dynamic Form (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Smart Autofill Chips Drawer */}
          <div className="bg-surface-container-low rounded-lg p-space-md shadow-sm">
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-md text-label-md text-on-surface flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-primary">insights</span>
                Smart Contextual Prefills
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant">Tap to inject field</span>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handleChipInject('name', 'Elena Vance, M.Sc.')}
                className="chip-pill px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:text-primary hover:shadow-sm font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px] text-primary">person</span>
                Elena Vance
              </button>
              <button
                type="button"
                onClick={() => handleChipInject('headline', 'Principal AI Engineer & Systems Architect')}
                className="chip-pill px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:text-primary hover:shadow-sm font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px] text-secondary">workspace_premium</span>
                Principal AI Engineer
              </button>
              <button
                type="button"
                onClick={() => handleChipInject('location', 'San Francisco, CA • Remote')}
                className="chip-pill px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:text-primary hover:shadow-sm font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px] text-tertiary-container">location_on</span>
                San Francisco / Hybrid
              </button>
              <button
                type="button"
                onClick={() => handleChipInject('portfolio', 'https://elena-arch.io')}
                className="chip-pill px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:text-primary hover:shadow-sm font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px] text-primary">language</span>
                elena-arch.io
              </button>
              <button
                type="button"
                onClick={() => handleChipInject('github', 'github.com/evance-core')}
                className="chip-pill px-3 py-1 rounded-full bg-surface-container-lowest text-on-surface hover:text-primary hover:shadow-sm font-label-sm text-label-sm transition-all flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[13px] text-inverse-surface">terminal</span>
                github/evance-core
              </button>
            </div>
          </div>

          {/* Section Card: Personal Essentials & Avatar */}
          <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between pb-space-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">badge</span>
                </div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Personal Coordinates
                </h2>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                98% Signal
              </span>
            </div>

            {/* Avatar Uploader Row */}
            <div className="flex items-center gap-space-md bg-surface-container-low p-space-md rounded-DEFAULT">
              <div className="relative group shrink-0">
                <img
                  alt="Avatar"
                  className="w-16 h-16 rounded-full object-cover shadow-sm group-hover:opacity-90 transition-opacity ring-2 ring-surface-container-highest"
                  src={resume.avatarUrl}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">Visual Identity</span>
                  <span className="text-tertiary-container font-label-sm text-label-sm font-medium">ATS Headshot Sync Active</span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Recommended 1024x1024px PNG/WebP with crisp studio separation.
                </p>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={() => updatePersonalInfo('headline', `${resume.headline} [Optimized]`)}
                    className="text-primary hover:text-primary-container font-label-sm text-label-sm font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">auto_fix_high</span> Enhance Portrait
                  </button>
                  <span className="text-outline-variant">•</span>
                  <button
                    type="button"
                    onClick={() => updatePersonalInfo('avatarUrl', '')}
                    className="text-on-surface-variant hover:text-error font-label-sm text-label-sm cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md pt-space-xs">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Full Legal Name
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all"
                    type="text"
                    value={resume.name}
                    onChange={(e) => updatePersonalInfo('name', e.target.value)}
                    placeholder="Jane Doe"
                  />
                  <span className="absolute right-3 text-tertiary-container" title="Autofill Verified">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Professional Target Headline
                </label>
                <div className="relative flex items-center">
                  <input
                    className="w-full px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all pr-24"
                    type="text"
                    value={resume.headline}
                    onChange={(e) => updatePersonalInfo('headline', e.target.value)}
                    placeholder="Role Title, Domain"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      updatePersonalInfo(
                        'headline',
                        'Principal AI Architect & Distributed Systems Leader'
                      )
                    }
                    className="absolute right-2.5 px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 hover:bg-inverse-primary transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">smart_toy</span> Optimize
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Direct Email
                </label>
                <input
                  className="w-full px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all"
                  type="email"
                  value={resume.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Mobile Phone
                </label>
                <input
                  className="w-full px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all"
                  type="tel"
                  value={resume.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Location / Visa Status
                </label>
                <input
                  className="w-full px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all"
                  type="text"
                  value={resume.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Portfolio / Hub
                </label>
                <input
                  className="w-full px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all"
                  type="text"
                  value={resume.portfolio}
                  onChange={(e) => updatePersonalInfo('portfolio', e.target.value)}
                />
              </div>

              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                  Repository / Code Profile
                </label>
                <input
                  className="w-full px-space-md py-2.5 rounded-full bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all"
                  type="text"
                  value={resume.github}
                  onChange={(e) => updatePersonalInfo('github', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section Card: Executive Summary & Narrative Synthesis */}
          <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">subject</span>
                </div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Executive Narrative
                </h2>
              </div>
              <button
                type="button"
                onClick={polishSummary}
                className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-surface-container-high text-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">auto_fix_high</span>
                <span>AI Tone: Strategic</span>
              </button>
            </div>
            <div className="relative">
              <textarea
                className="w-full p-space-md rounded-DEFAULT bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none shadow-sm transition-all resize-none leading-relaxed"
                rows={4}
                value={resume.summary}
                onChange={(e) => updatePersonalInfo('summary', e.target.value)}
              />
              <div className="absolute bottom-3 right-3 flex items-center gap-2 bg-surface-container-lowest/80 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-sm">
                <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  {wordCount} Words • High Impact
                </span>
              </div>
            </div>
          </div>

          {/* Section Card: Career Trajectory */}
          <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">history_edu</span>
                </div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Career Trajectory
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingRole(!isAddingRole)}
                className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm hover:opacity-95 transition-opacity cursor-pointer"
              >
                <span className="material-symbols-outlined text-[14px]">
                  {isAddingRole ? 'close' : 'add'}
                </span>
                <span>{isAddingRole ? 'Cancel' : 'Add Role'}</span>
              </button>
            </div>

            {/* Inline Add Form */}
            {isAddingRole && (
              <div className="p-4 rounded-xl bg-surface-container-low border border-primary/20 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Add Experience Entry</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Role Title (e.g. Lead Staff Architect)"
                    value={newRole.role}
                    onChange={(e) => setNewRole({ ...newRole, role: e.target.value })}
                    className="p-2 rounded-lg bg-surface-container-lowest text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Company (e.g. Google Cloud)"
                    value={newRole.company}
                    onChange={(e) => setNewRole({ ...newRole, company: e.target.value })}
                    className="p-2 rounded-lg bg-surface-container-lowest text-xs"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Period (e.g. 2021 – Present)"
                    value={newRole.period}
                    onChange={(e) => setNewRole({ ...newRole, period: e.target.value })}
                    className="p-2 rounded-lg bg-surface-container-lowest text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Tech Tags (e.g. Kubernetes, Go, Rust)"
                    value={newRole.tags}
                    onChange={(e) => setNewRole({ ...newRole, tags: e.target.value })}
                    className="p-2 rounded-lg bg-surface-container-lowest text-xs"
                  />
                </div>
                <textarea
                  placeholder="Key accomplishment bullet..."
                  value={newRole.bullet}
                  onChange={(e) => setNewRole({ ...newRole, bullet: e.target.value })}
                  className="w-full p-2 rounded-lg bg-surface-container-lowest text-xs"
                  rows={2}
                />
                <button
                  type="button"
                  onClick={handleSaveRole}
                  className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Role
                </button>
              </div>
            )}

            {/* Timeline Items */}
            <div className="flex flex-col gap-space-sm" id="timeline-container">
              {resume.experiences.map((exp) => (
                <div
                  key={exp.id}
                  className="group relative flex flex-col gap-2 p-space-md bg-surface-container-low hover:bg-surface-container-high/60 transition-all rounded-DEFAULT cursor-grab active:cursor-grabbing border border-outline-variant/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-outline-variant text-[18px]">
                        drag_indicator
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface font-bold">
                        {exp.role}
                      </span>
                      <span className="text-on-surface-variant">•</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                        {exp.company}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-label-sm text-label-sm px-2 py-0.5 rounded-full bg-surface-container-lowest text-on-surface-variant shadow-xs">
                        {exp.period}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeExperience(exp.id)}
                        className="p-1 rounded-full hover:bg-error-container hover:text-error text-on-surface-variant transition-colors cursor-pointer"
                        title="Remove Role"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </div>
                  {exp.bullets.map((b, idx) => (
                    <p key={idx} className="font-body-sm text-body-sm text-on-surface pl-6">
                      {b}
                    </p>
                  ))}
                  <div className="flex items-center gap-2 pl-6 pt-1 flex-wrap">
                    {exp.tags.map((t, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold"
                      >
                        {t}
                      </span>
                    ))}
                    <button
                      type="button"
                      onClick={polishSummary}
                      className="text-primary font-label-sm text-label-sm hover:underline ml-auto flex items-center gap-0.5 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[13px]">auto_fix_normal</span> Polish
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section Card: Academic Foundation */}
          <div className="bg-surface-container-lowest rounded-lg p-space-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[18px]">school</span>
                </div>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Academic Credentials
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsAddingDegree(!isAddingDegree)}
                className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm hover:bg-surface-container-high transition-colors cursor-pointer"
              >
                {isAddingDegree ? 'Cancel' : 'Add Degree'}
              </button>
            </div>

            {isAddingDegree && (
              <div className="p-4 rounded-xl bg-surface-container-low border border-primary/20 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-primary">Add Degree Entry</h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Degree (e.g. B.S. in Computer Science)"
                    value={newDegree.degree}
                    onChange={(e) => setNewDegree({ ...newDegree, degree: e.target.value })}
                    className="p-2 rounded-lg bg-surface-container-lowest text-xs"
                  />
                  <input
                    type="text"
                    placeholder="University (e.g. UC Berkeley)"
                    value={newDegree.school}
                    onChange={(e) => setNewDegree({ ...newDegree, school: e.target.value })}
                    className="p-2 rounded-lg bg-surface-container-lowest text-xs"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Period (e.g. 2013 – 2017)"
                  value={newDegree.period}
                  onChange={(e) => setNewDegree({ ...newDegree, period: e.target.value })}
                  className="w-full p-2 rounded-lg bg-surface-container-lowest text-xs"
                />
                <button
                  type="button"
                  onClick={handleSaveDegree}
                  className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  Save Degree
                </button>
              </div>
            )}

            {resume.education.map((edu) => (
              <div
                key={edu.id}
                className="flex items-center justify-between p-space-md bg-surface-container-low rounded-DEFAULT"
              >
                <div className="flex flex-col">
                  <span className="font-label-lg text-label-lg text-on-surface font-bold">
                    {edu.degree}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant font-medium">
                    {edu.school} {edu.honors ? `• ${edu.honors}` : ''}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-full bg-surface-container-lowest text-on-surface-variant font-medium">
                  {edu.period}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT PANEL: Floating High-Fidelity A4/Letter Live Resume Canvas (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-md sticky top-20">
          {/* Live Quality & Verification HUD Header */}
          <div className="bg-surface-container-lowest/90 backdrop-blur-md rounded-lg p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border border-outline-variant/20">
            <div className="flex items-center gap-space-md w-full sm:w-auto">
              <div className="relative w-12 h-12 shrink-0 flex items-center justify-center">
                <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                  <circle
                    className="text-surface-container-highest stroke-current"
                    cx="18"
                    cy="18"
                    fill="none"
                    r="15.5"
                    strokeWidth="3"
                  />
                  <circle
                    className="text-tertiary-container stroke-current"
                    cx="18"
                    cy="18"
                    fill="none"
                    r="15.5"
                    strokeDasharray="97, 100"
                    strokeLinecap="round"
                    strokeWidth="3"
                  />
                </svg>
                <span className="absolute font-label-sm text-label-sm font-bold text-on-surface">
                  100%
                </span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-title-md text-title-md text-on-surface font-bold">
                    Personal Profile 100% Complete
                  </span>
                  <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  High ATS Signal • Stanford/FAANG Compatible Standard
                </span>
              </div>
            </div>

            {/* Quick Canvas Zoom / Layout Switches */}
            <div className="flex items-center gap-1.5 self-end sm:self-center">
              <span className="px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                A4 Sheet
              </span>
              <div className="h-4 w-px bg-surface-container-highest"></div>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(70, z - 10))}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_out</span>
              </button>
              <span className="font-label-sm text-label-sm font-bold text-on-surface tabular-nums">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(130, z + 10))}
                className="p-1.5 rounded-full hover:bg-surface-container text-on-surface-variant cursor-pointer"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[18px]">zoom_in</span>
              </button>
            </div>
          </div>

          {/* The Skeuomorphic Digital Paper Document Canvas */}
          <div
            id="resume-canvas"
            style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
            className="relative w-full bg-surface-container-lowest rounded-lg shadow-xl overflow-hidden p-8 md:p-12 transition-all min-h-[780px] flex flex-col justify-between border border-outline-variant/30"
          >
            <div className="absolute inset-0 pointer-events-none rounded-lg bg-gradient-to-b from-primary/5 via-transparent to-transparent"></div>

            {/* Document Header */}
            <div className="flex flex-col gap-6 relative z-10">
              <div className="flex items-start justify-between gap-6 pb-6 border-b border-surface-container-highest">
                <div className="flex flex-col gap-1.5 max-w-[70%]">
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-extrabold" id="preview-name">
                    {resume.name || 'Elena Vance, M.Sc.'}
                  </h1>
                  <p className="font-headline-sm text-headline-sm text-primary font-semibold" id="preview-headline">
                    {resume.headline || 'Principal AI Engineer & Systems Architect'}
                  </p>
                  <div className="flex flex-wrap items-center gap-y-1 gap-x-3 text-on-surface-variant font-body-sm text-body-sm mt-1">
                    <span className="flex items-center gap-1" id="preview-email">
                      <span className="material-symbols-outlined text-[14px]">mail</span>
                      {resume.email || 'elena.vance@precisionai.tech'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1" id="preview-phone">
                      <span className="material-symbols-outlined text-[14px]">call</span>
                      {resume.phone || '+1 (415) 890-4421'}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1" id="preview-location">
                      <span className="material-symbols-outlined text-[14px]">location_on</span>
                      {resume.location || 'San Francisco, CA'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 font-label-sm text-label-sm text-secondary pt-1">
                    <span className="hover:underline flex items-center gap-0.5" id="preview-portfolio">
                      {resume.portfolio || 'https://elena-arch.io'}
                    </span>
                    <span>/</span>
                    <span className="hover:underline flex items-center gap-0.5" id="preview-github">
                      {resume.github || 'github.com/evance-core'}
                    </span>
                  </div>
                </div>

                {/* Avatar */}
                {resume.avatarUrl && (
                  <div className="w-24 h-24 rounded-lg overflow-hidden shadow-md shrink-0 border border-outline-variant/30">
                    <img
                      alt="Avatar"
                      className="w-full h-full object-cover"
                      src={resume.avatarUrl}
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              {/* Executive Synopsis */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between pb-1">
                  <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                    Executive Synopsis
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary-container font-semibold">
                    ATS Calibrated • Rank: Top 2%
                  </span>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed text-justify" id="preview-summary">
                  {resume.summary ||
                    'Pioneering Machine Learning Architect with 8+ years leading deep-learning distributed infrastructure and high-throughput inference engines.'}
                </p>
              </div>

              {/* Experience Timeline */}
              <div className="flex flex-col gap-4 pt-4 border-t border-surface-container-highest">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                  Core Experience
                </span>
                <div className="flex flex-col gap-4">
                  {resume.experiences.map((exp) => (
                    <div key={exp.id} className="flex flex-col gap-1">
                      <div className="flex items-baseline justify-between">
                        <span className="font-title-md text-title-md text-on-surface font-bold">
                          {exp.role}
                        </span>
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-body-sm text-body-sm text-secondary font-medium">
                          {exp.company} {exp.department ? `• ${exp.department}` : ''}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {exp.location}
                        </span>
                      </div>
                      <ul className="list-disc list-inside text-on-surface-variant font-body-sm text-body-sm space-y-1 mt-1 pl-1">
                        {exp.bullets.map((b, idx) => (
                          <li key={idx}>{b}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="flex flex-col gap-2 pt-4 border-t border-surface-container-highest">
                <span className="font-label-md text-label-md uppercase tracking-wider text-primary font-bold">
                  Education & Credentials
                </span>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="flex items-baseline justify-between">
                    <div>
                      <span className="font-title-md text-title-md text-on-surface font-bold">
                        {edu.school}
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {edu.degree}
                      </p>
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      {edu.period}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Paper Watermark */}
            <div className="relative z-10 pt-8 mt-auto flex items-center justify-between font-label-sm text-label-sm text-outline-variant border-t border-surface-container-highest">
              <span>CareerGenie Render Engine v2.8 • ID #CG-88294</span>
              <span className="flex items-center gap-1 text-tertiary-container font-semibold">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                ATS Parsing Check: Pass (100/100)
              </span>
            </div>
          </div>

          {/* Floating Continue Dock Sticky Pill Button */}
          <div className="sticky bottom-4 z-30 flex items-center justify-between bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-full shadow-xl">
            <div className="flex items-center gap-space-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary-container animate-pulse"></span>
              <span className="font-label-md text-label-md">Ready for matching algorithms</span>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('job-and-ai-match')}
              className="px-space-lg py-2 rounded-full bg-primary text-on-primary font-label-lg text-label-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 shadow-[0_4px_20px_rgba(79,70,229,0.4)] cursor-pointer"
            >
              <span>Continue to Job & AI Match</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
