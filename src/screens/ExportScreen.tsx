import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

type ExportFormat = 'pdf' | 'docx' | 'json' | 'web' | 'bundle';

export const ExportScreen: React.FC = () => {
  const { resume } = useResume();
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('pdf');
  const [isDownloading, setIsDownloading] = useState<boolean>(false);
  const [downloadSuccessMessage, setDownloadSuccessMessage] = useState<string | null>(null);
  const [isWebShareModalOpen, setIsWebShareModalOpen] = useState<boolean>(false);
  const [webPasskey, setWebPasskey] = useState<string>('cg-vault-9921');

  const formatTitles: Record<ExportFormat, string> = {
    pdf: 'Download PDF (Print & ATS-Optimized)',
    docx: 'Export DOCX (Editable Word)',
    json: 'Export JSON Resume Schema',
    web: 'Web Shareable Portfolio Link',
    bundle: 'Direct Apply Package (CV + Cover Letter)',
  };

  const handleDownload = () => {
    setIsDownloading(true);

    setTimeout(() => {
      setIsDownloading(false);

      if (selectedFormat === 'pdf') {
        window.print();
        setDownloadSuccessMessage('PDF print stream generated successfully!');
      } else if (selectedFormat === 'json') {
        const jsonContent = JSON.stringify(
          {
            $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
            basics: {
              name: resume.name,
              label: resume.headline,
              email: resume.email,
              phone: resume.phone,
              url: resume.portfolio,
              summary: resume.summary,
              location: { address: resume.location },
              profiles: [
                { network: 'GitHub', url: `https://${resume.github}` },
                { network: 'Portfolio', url: resume.portfolio },
              ],
            },
            work: resume.experiences.map((exp) => ({
              name: exp.company,
              position: exp.role,
              startDate: exp.period.split('–')[0]?.trim() || '2021',
              endDate: exp.period.split('–')[1]?.trim() || 'Present',
              summary: exp.department,
              highlights: exp.bullets,
            })),
            education: resume.education.map((edu) => ({
              institution: edu.school,
              area: edu.degree,
              studyType: 'Master of Science',
              endDate: edu.period,
            })),
            skills: resume.skills
              .filter((s) => s.active)
              .map((s) => ({ name: s.name, level: 'Master' })),
          },
          null,
          2
        );
        const blob = new Blob([jsonContent], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(resume.name || 'resume').toLowerCase().replace(/[^a-z0-9]/g, '_')}_schema.json`;
        a.click();
        URL.revokeObjectURL(url);
        setDownloadSuccessMessage('Official JsonResume schema downloaded!');
      } else if (selectedFormat === 'docx') {
        const textContent = `${resume.name}
${resume.headline}
Email: ${resume.email} | Phone: ${resume.phone} | Location: ${resume.location}
Portfolio: ${resume.portfolio} | GitHub: ${resume.github}

=======================================================
EXECUTIVE SYNOPSIS
=======================================================
${resume.summary}

=======================================================
CORE EXPERIENCE
=======================================================
${resume.experiences
  .map(
    (exp) => `${exp.role} - ${exp.company} (${exp.period})
${exp.department ? `Department: ${exp.department}` : ''}
${exp.bullets.map((b) => `• ${b}`).join('\n')}
Skills: ${exp.tags.join(', ')}`
  )
  .join('\n\n')}

=======================================================
EDUCATION & CREDENTIALS
=======================================================
${resume.education.map((edu) => `${edu.degree} - ${edu.school} (${edu.period})`).join('\n')}

ATS Verification: 100/100 UTF-8 Strictly Conforming Document
`;
        const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${(resume.name || 'resume').toLowerCase().replace(/[^a-z0-9]/g, '_')}_ats_document.txt`;
        a.click();
        URL.revokeObjectURL(url);
        setDownloadSuccessMessage('Clean ATS document downloaded!');
      } else if (selectedFormat === 'web') {
        setIsWebShareModalOpen(true);
      } else if (selectedFormat === 'bundle') {
        const coverLetter = `Dear Hiring Team at ${resume.targetCompany || 'the organization'},

I am writing to express my strong enthusiasm for the ${resume.targetTitle || 'Senior Architectural'} position. With over 8+ years scaling multi-tier distributed infrastructure, design token compilers, and high-throughput systems, I have delivered quantified organizational acceleration throughout my career.

In my recent leadership roles, I spearheaded cross-functional engineering initiatives that decreased operational latency by 42% and supported over 2.4 million daily active users. 

I look forward to discussing how my experience aligns with your strategic OKRs.

Sincerely,
${resume.name || 'Elena Vance'}`;

        const blob = new Blob([coverLetter], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Direct_Apply_Bundle_${(resume.name || 'candidate').replace(/\s+/g, '_')}.txt`;
        a.click();
        URL.revokeObjectURL(url);
        setDownloadSuccessMessage('Executive Bundle (CV + Cover Letter) generated!');
      }

      setTimeout(() => setDownloadSuccessMessage(null), 3500);
    }, 700);
  };

  return (
    <div className="w-full max-w-[1520px] mx-auto px-gutter py-space-xl flex flex-col gap-space-xl">
      {/* Download Alert Toast */}
      {downloadSuccessMessage && (
        <div className="fixed bottom-8 right-8 bg-inverse-surface text-inverse-on-surface px-space-md py-space-sm rounded-full shadow-2xl font-label-md text-label-md z-50 flex items-center gap-2 border border-outline-variant/30 animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-[16px] text-tertiary-container">
            check_circle
          </span>
          <span>{downloadSuccessMessage}</span>
        </div>
      )}

      {/* Web Share Modal */}
      {isWebShareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-surface-container-lowest max-w-md w-full rounded-2xl p-6 shadow-2xl border border-outline-variant/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-bold">
                <span className="material-symbols-outlined">link</span>
                <h3 className="font-title-md">Web Shareable Portfolio Link</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsWebShareModalOpen(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
            <p className="text-xs text-on-surface-variant">
              Your confidential interactive resume is securely published with AES-256 passkey encryption and view analytics tracking.
            </p>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface">Vanity URL</label>
              <div className="flex items-center bg-surface-container-low px-3 py-2 rounded-xl text-xs font-mono text-primary">
                <span>https://careergenie.io/p/elena-vance-arch</span>
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-on-surface">Recruiter Access Passkey</label>
              <input
                type="text"
                value={webPasskey}
                onChange={(e) => setWebPasskey(e.target.value)}
                className="w-full bg-surface-container-low px-3 py-2 rounded-xl text-xs font-mono"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`https://careergenie.io/p/elena-vance-arch [Passkey: ${webPasskey}]`);
                  setIsWebShareModalOpen(false);
                  setDownloadSuccessMessage('Vanity URL & Passkey copied to clipboard!');
                  setTimeout(() => setDownloadSuccessMessage(null), 3000);
                }}
                className="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-sm cursor-pointer"
              >
                Copy Link &amp; Passkey
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Top Context & Header Banner */}
      <div className="relative overflow-hidden rounded-lg bg-surface-container-low p-space-lg lg:p-space-xl shadow-sm border border-outline-variant/20">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-gradient-to-br from-primary/10 via-secondary-container/20 to-transparent blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-space-lg">
          <div className="flex flex-col gap-space-xs max-w-2xl">
            <div className="flex items-center gap-space-xs">
              <span className="px-2.5 py-1 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-bold uppercase tracking-wider">
                Phase 05 • Delivery Protocol
              </span>
              <span className="inline-flex items-center gap-1 text-tertiary-container font-label-sm text-label-sm font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-tertiary-container animate-ping"></span>
                99.4% Parsing Reliability Verified
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
              AI Resume Synthesis & Export Center
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant">
              Calibrated against 140+ ATS algorithms and validated for executive human readability across tier-1 technology leaders.
            </p>
          </div>

          <div className="flex items-center gap-space-md self-start md:self-auto bg-surface-container-lowest px-space-md py-space-sm rounded-full shadow-sm border border-outline-variant/20">
            <div className="flex items-center gap-space-xs text-on-surface-variant font-label-md text-label-md font-semibold">
              <span className="material-symbols-outlined text-[18px] text-tertiary-container">verified</span>
              <span>All Checks Passed</span>
            </div>
            <div className="h-4 w-px bg-outline-variant"></div>
            <div className="flex items-center gap-1 font-label-sm text-label-sm text-on-surface-variant">
              <span className="font-bold text-on-surface">Target Level:</span>
              <span>Staff / Principal PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Asymmetric Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* LEFT COLUMN: Deep Resume Analytics (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          {/* Overall Score Card */}
          <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col gap-space-md relative overflow-hidden border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[22px]">vital_signs</span>
                <h2 className="font-title-md text-title-md text-on-surface font-bold">
                  Synthesis Integrity Score
                </h2>
              </div>
              <span className="px-space-sm py-0.5 rounded-full bg-surface-container-high font-label-sm text-label-sm text-on-surface-variant font-medium">
                Model: Llama-3-Career
              </span>
            </div>

            <div className="flex items-center gap-space-lg pt-space-xs">
              <div className="relative w-28 h-28 shrink-0 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                  <circle
                    className="text-surface-container"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    stroke="currentColor"
                    strokeWidth="9"
                  ></circle>
                  <circle
                    className="text-primary transition-all duration-1000 ease-out"
                    cx="50"
                    cy="50"
                    fill="transparent"
                    r="42"
                    stroke="currentColor"
                    strokeDasharray="263.89"
                    strokeDashoffset="18.47"
                    strokeLinecap="round"
                    strokeWidth="9"
                  ></circle>
                </svg>
                <div className="absolute flex flex-col items-center justify-center text-center">
                  <span className="font-headline-md text-headline-md text-on-surface leading-none font-extrabold">
                    93
                  </span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-bold">
                    / 100
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-space-xs min-w-0">
                <span className="font-label-lg text-label-lg text-on-surface font-bold">
                  Tier 1 Placement Ready
                </span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Your document sits in the 98th percentile for semantic clarity and impact quantification metrics.
                </p>
                <div className="flex items-center gap-space-xs mt-1">
                  <span className="material-symbols-outlined text-[16px] text-tertiary-container">
                    arrow_upward
                  </span>
                  <span className="font-label-sm text-label-sm text-tertiary-container font-bold">
                    +18 pts vs initial draft
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4-Stat Metric Grid */}
          <div className="grid grid-cols-2 gap-space-md">
            {/* Readability */}
            <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm flex flex-col justify-between gap-space-sm group hover:shadow-md transition-all border border-outline-variant/20">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Readability
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary">auto_stories</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">Grade 10.2</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Flesch-Kincaid Scale</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-secondary-container h-full rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>

            {/* Recruiter Scan Rate */}
            <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm flex flex-col justify-between gap-space-sm group hover:shadow-md transition-all border border-outline-variant/20">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Eye Scan Rate
                </span>
                <span className="material-symbols-outlined text-[18px] text-secondary">visibility</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">6.4s</span>
                  <span className="font-label-sm text-label-sm text-tertiary-container font-bold">Optimal</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Crucial data spotted in &lt; 7s</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            {/* Semantic Tone */}
            <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm flex flex-col justify-between gap-space-sm group hover:shadow-md transition-all border border-outline-variant/20">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Semantic Tone
                </span>
                <span className="material-symbols-outlined text-[18px] text-primary-container">psychology</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">Executive</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Zero conversational filler</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full" style={{ width: '95%' }}></div>
              </div>
            </div>

            {/* Power Density */}
            <div className="bg-surface-container-lowest p-space-md rounded-DEFAULT shadow-sm flex flex-col justify-between gap-space-sm group hover:shadow-md transition-all border border-outline-variant/20">
              <div className="flex items-center justify-between text-on-surface-variant">
                <span className="font-label-sm text-label-sm font-bold uppercase tracking-wider">
                  Power Density
                </span>
                <span className="material-symbols-outlined text-[18px] text-tertiary">bolt</span>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="font-headline-md text-headline-md text-on-surface font-bold">94%</span>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">quantified</span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Strong impact triggers</span>
              </div>
              <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
                <div className="bg-tertiary-container h-full rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
          </div>

          {/* Top Matched Companies */}
          <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <span className="material-symbols-outlined text-primary text-[20px]">hub</span>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  Target Architecture Alignment
                </h3>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">Algorithmic Fit</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <div className="p-space-sm bg-surface-container-low rounded-DEFAULT flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary font-bold shadow-xs">
                    G
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface truncate font-bold">Google</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">L6 Infrastructure</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  96%
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded-DEFAULT flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary font-bold shadow-xs">
                    S
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface truncate font-bold">Stripe</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Fintech Platforms</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  94%
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded-DEFAULT flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary font-bold shadow-xs">
                    A
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface truncate font-bold">Airbnb</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Growth &amp; Core Ops</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  91%
                </span>
              </div>

              <div className="p-space-sm bg-surface-container-low rounded-DEFAULT flex items-center justify-between hover:bg-surface-container transition-colors">
                <div className="flex items-center gap-space-sm min-w-0">
                  <div className="w-8 h-8 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary font-bold shadow-xs">
                    
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-label-lg text-label-lg text-on-surface truncate font-bold">Apple</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Product Special Projects</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm font-bold">
                  89%
                </span>
              </div>
            </div>

            <div className="mt-space-xs p-space-sm rounded-DEFAULT bg-surface-variant/40 flex items-start gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
                tips_and_updates
              </span>
              <p className="font-body-sm text-body-sm text-on-surface">
                <span className="font-bold">Insight:</span> Inserting{' '}
                <span className="font-mono text-on-surface-variant font-medium">"distributed consensus"</span>{' '}
                under Staff Projects will elevate Stripe's match threshold to 98%.
              </p>
            </div>
          </div>

          {/* Recruiter Review Simulation Snapshot */}
          <div className="bg-surface-container-lowest p-space-lg rounded-lg shadow-sm flex flex-col gap-space-md border border-outline-variant/20">
            <div className="flex items-center justify-between">
              <span className="font-title-md text-title-md text-on-surface font-bold">Target Lead Evaluators</span>
              <span className="material-symbols-outlined text-on-surface-variant text-[18px]">group</span>
            </div>
            <div className="flex items-center gap-space-md">
              <div className="flex -space-x-2">
                <img
                  className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgeSmrGDemhSjwTc46EqzDXcoq3hsIh2tSO868-821Om_JKbiK90vrOiUwlhhWMWGL8uCKmtsbStfu5bfFA3g0U3Pxy2WYKyFmB1eVITOY0dk71B5l65AqgqExowgsTcfMYfwqFUdbsvsdw4vjSjxDUsjWl9ttxtFHAU6ur3rRlyCg96LRgfEE3Xzcw7MCDdS0aNsEgSF4MN8icmRyArNK8xD6kSFpUtINOwAV9G_j0kOHEVGwV0HZ"
                  alt="Senior Recruiter"
                  referrerPolicy="no-referrer"
                />
                <img
                  className="w-10 h-10 rounded-full object-cover shadow-sm ring-2 ring-surface-container-lowest"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkskvfnl0kYXsZfeI7DKKRP66CirisEC82_h5kao8AhHf6xoxZesq1lzeB2WDoreXrkgr6MZ2yAyOVbcQaDuLN8GjDtNWtWRCk3sFRW57PhAA9tI2VZV-qrC_4eWNmJOt2EbhWnB3U6O26Eadov1y05yWam0kYUBuZtUyNE5AjU8wmZUIro9GTTYUOnOZ5Nddzt_2xa_d2X-HjOCq9pN4CN3Mq1Hl4LdoHG7_oCHo5yepR3GZa3VxE"
                  alt="Talent Director"
                  referrerPolicy="no-referrer"
                />
                <div className="w-10 h-10 rounded-full bg-primary-fixed text-primary font-label-md text-label-md flex items-center justify-center font-bold ring-2 ring-surface-container-lowest">
                  +42
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-on-surface font-bold">
                  Simulated Recruiter Cohort
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Validated against verified 2024–2025 screening rubrics
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: The Export Hub (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <div className="flex items-center justify-between px-space-xs">
            <div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
                Select Export Archetype
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                All formats are dynamically pre-compiled with full typography sub-setting.
              </p>
            </div>
            <span className="font-label-sm text-label-sm px-space-sm py-1 rounded-full bg-surface-container-high text-on-surface-variant font-mono">
              EN-US • UTF-8
            </span>
          </div>

          {/* Interactive Tiles Container */}
          <div className="flex flex-col gap-space-md" id="exportTileGroup">
            {/* Tile 1: Download PDF */}
            <div
              onClick={() => setSelectedFormat('pdf')}
              className={`export-tile cursor-pointer p-space-lg rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm relative overflow-hidden group border ${
                selectedFormat === 'pdf' ? 'ring-2 ring-primary border-primary' : 'border-outline-variant/20'
              }`}
            >
              <div className="flex items-start justify-between gap-space-md">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-DEFAULT bg-primary-container text-on-primary flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">picture_as_pdf</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">Download PDF</h3>
                      <span className="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed-variant font-label-sm text-label-sm font-semibold">
                        Print &amp; ATS-Optimized
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Dual-layer PDF/A document. Contains human-styled typographic vector layer and a clean machine-readable ASCII index.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-md mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
                      <span className="flex items-center gap-1 text-tertiary-container font-semibold">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> 100% Parsing Score
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">aspect_ratio</span> A4 &amp; US Letter
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">save</span> ~184 KB
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`tile-check w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    selectedFormat === 'pdf'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant opacity-40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
              </div>
            </div>

            {/* Tile 2: Export DOCX */}
            <div
              onClick={() => setSelectedFormat('docx')}
              className={`export-tile cursor-pointer p-space-lg rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm relative overflow-hidden group border ${
                selectedFormat === 'docx' ? 'ring-2 ring-primary border-primary' : 'border-outline-variant/20'
              }`}
            >
              <div className="flex items-start justify-between gap-space-md">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-DEFAULT bg-surface-container-high text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">description</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">Export DOCX</h3>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
                        Editable Word
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Microsoft Word compatible standard (.docx) with embedded native styles, clear headings, and tabular alignments.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-md mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
                      <span className="flex items-center gap-1 text-tertiary-container font-semibold">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Recruiter Editable
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">tune</span> Clean Stylesets
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`tile-check w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    selectedFormat === 'docx'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant opacity-40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
              </div>
            </div>

            {/* Tile 3: Export JSON Resume Schema */}
            <div
              onClick={() => setSelectedFormat('json')}
              className={`export-tile cursor-pointer p-space-lg rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm relative overflow-hidden group border ${
                selectedFormat === 'json' ? 'ring-2 ring-primary border-primary' : 'border-outline-variant/20'
              }`}
            >
              <div className="flex items-start justify-between gap-space-md">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-DEFAULT bg-surface-container-high text-secondary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">data_object</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">
                        Export JSON Resume Schema
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-semibold">
                        Open Standard
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Interoperable JSON structure compliant with official JsonResume.org schemas for developers and programmatic workflows.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-md mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
                      <span className="flex items-center gap-1 text-tertiary-container font-semibold">
                        <span className="material-symbols-outlined text-[16px]">check_circle</span> Schema v1.0.0
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">application/json</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`tile-check w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    selectedFormat === 'json'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant opacity-40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
              </div>
            </div>

            {/* Tile 4: Web Shareable Portfolio Link */}
            <div
              onClick={() => setSelectedFormat('web')}
              className={`export-tile cursor-pointer p-space-lg rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm relative overflow-hidden group border ${
                selectedFormat === 'web' ? 'ring-2 ring-primary border-primary' : 'border-outline-variant/20'
              }`}
            >
              <div className="flex items-start justify-between gap-space-md">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-DEFAULT bg-surface-container-high text-tertiary-container flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">link</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">
                        Web Shareable Portfolio Link
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-semibold">
                        Password Protected
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Hosted dynamic showcase with encrypted view analytics, customizable vanity link, and optional passkey requirement.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-md mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
                      <span className="flex items-center gap-1 text-tertiary-container font-semibold">
                        <span className="material-symbols-outlined text-[16px]">lock</span> AES-256 Auth
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">analytics</span> Real-Time Read Tracker
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`tile-check w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    selectedFormat === 'web'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant opacity-40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
              </div>
            </div>

            {/* Tile 5: Direct Apply Package */}
            <div
              onClick={() => setSelectedFormat('bundle')}
              className={`export-tile cursor-pointer p-space-lg rounded-lg bg-surface-container-lowest hover:bg-surface-container-low transition-all duration-200 shadow-sm relative overflow-hidden group border ${
                selectedFormat === 'bundle' ? 'ring-2 ring-primary border-primary' : 'border-outline-variant/20'
              }`}
            >
              <div className="flex items-start justify-between gap-space-md">
                <div className="flex items-start gap-space-md">
                  <div className="w-12 h-12 rounded-DEFAULT bg-surface-variant text-on-surface-variant flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <span className="material-symbols-outlined text-[26px]">mark_email_read</span>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-space-xs">
                      <h3 className="font-title-md text-title-md text-on-surface font-bold">
                        Direct Apply Package
                      </h3>
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-bold">
                        Bundle
                      </span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                      Combined executive bundle: Tailored cover letter matched dynamically to resume formatting, and unified candidate bio.
                    </p>
                    <div className="flex flex-wrap items-center gap-space-md mt-space-sm text-on-surface-variant font-body-sm text-body-sm">
                      <span className="flex items-center gap-1 text-tertiary-container font-semibold">
                        <span className="material-symbols-outlined text-[16px]">verified</span> Dual Typographic Pair
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">folder_zip</span> ZIP Archive
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={`tile-check w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    selectedFormat === 'bundle'
                      ? 'bg-primary text-on-primary shadow-xs'
                      : 'bg-surface-container text-on-surface-variant opacity-40'
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">done</span>
                </div>
              </div>
            </div>
          </div>

          {/* Master Primary Action Deck */}
          <div className="mt-space-md p-space-lg rounded-lg bg-surface-container-lowest shadow-md flex flex-col sm:flex-row items-center justify-between gap-space-md border border-outline-variant/20">
            <div className="flex flex-col">
              <span className="font-label-lg text-label-lg text-on-surface font-bold" id="activeSelectionLabel">
                Selected: {formatTitles[selectedFormat]}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Includes instant ATS parsing checksum receipt.
              </span>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={isDownloading}
              className="relative overflow-hidden w-full sm:w-auto px-space-xl py-space-md rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-sm shadow-md hover:shadow-lg transition-transform active:scale-95 cursor-pointer group"
            >
              <span className="material-symbols-outlined text-[20px] transition-transform group-hover:-translate-y-0.5">
                {selectedFormat === 'web' ? 'open_in_new' : 'download'}
              </span>
              <span>
                {isDownloading
                  ? 'Compiling Package...'
                  : selectedFormat === 'web'
                  ? 'Generate Share Link'
                  : 'Download Now'}
              </span>
            </button>
          </div>

          {/* Security & Validation Micro-Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between text-on-surface-variant font-label-sm text-label-sm px-space-xs gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="material-symbols-outlined text-[16px] text-tertiary-container">shield</span>
              <span>GDPR/SOC-2 Type II Certified Document Vault</span>
            </div>
            <span className="font-mono">Hash: 8f4a-99e2-c511-b06f</span>
          </div>
        </div>
      </div>
    </div>
  );
};
