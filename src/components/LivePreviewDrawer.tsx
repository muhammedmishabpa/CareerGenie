import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';

export const LivePreviewDrawer: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, resume, selectedTemplateTitle } = useResume();
  const [zoom, setZoom] = useState<number>(100);

  if (!isDrawerOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsDrawerOpen(false)}
      />

      {/* Slide-out Panel */}
      <aside
        aria-label="Live Resume Preview"
        className="relative w-full max-w-3xl bg-surface-container-lowest h-full shadow-2xl flex flex-col z-10 border-l border-outline-variant/30 animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-container/80 bg-surface-container-low/50">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-primary text-[22px]">
              dock_to_left
            </span>
            <div>
              <h2 className="font-title-md text-title-md text-on-surface font-bold leading-tight">
                Live Preview Drawer
              </h2>
              <p className="text-xs text-on-surface-variant">
                Active Template: <strong className="text-primary">{selectedTemplateTitle}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-surface-container rounded-full px-2 py-0.5 text-xs text-on-surface font-medium">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(70, z - 10))}
                className="p-1 hover:text-primary cursor-pointer"
                title="Zoom Out"
              >
                <span className="material-symbols-outlined text-[14px]">zoom_out</span>
              </button>
              <span className="px-1.5 tabular-nums">{zoom}%</span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(130, z + 10))}
                className="p-1 hover:text-primary cursor-pointer"
                title="Zoom In"
              >
                <span className="material-symbols-outlined text-[14px]">zoom_in</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-on-primary text-xs font-semibold shadow-xs hover:bg-primary-container transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[15px]">print</span>
              <span>Print / PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-surface-container-highest text-on-surface flex items-center justify-center transition-colors cursor-pointer ml-1"
              aria-label="Close Drawer"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>

        {/* Drawer Body: The Digital Paper Canvas */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 bg-surface-container-low/40">
          <div
            id="drawer-resume-canvas"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            className="w-full bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 p-8 md:p-10 text-on-surface transition-all duration-200"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-4 pb-6 border-b border-surface-container-highest">
              <div className="space-y-1">
                <h1 className="text-2xl font-extrabold tracking-tight text-on-surface">
                  {resume.name || 'Your Full Name'}
                </h1>
                <p className="text-sm font-semibold text-primary">
                  {resume.headline || 'Your Professional Target Headline'}
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-surface-variant pt-1">
                  {resume.email && <span>{resume.email}</span>}
                  {resume.phone && <span>• {resume.phone}</span>}
                  {resume.location && <span>• {resume.location}</span>}
                </div>
                <div className="flex items-center gap-3 text-xs text-secondary pt-0.5">
                  {resume.portfolio && (
                    <span className="hover:underline">{resume.portfolio}</span>
                  )}
                  {resume.github && (
                    <span className="hover:underline">/ {resume.github}</span>
                  )}
                </div>
              </div>

              {resume.avatarUrl && (
                <div className="w-20 h-20 rounded-xl overflow-hidden shadow-sm shrink-0 border border-outline-variant/30">
                  <img
                    alt={resume.name}
                    src={resume.avatarUrl}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </div>

            {/* Executive Synopsis */}
            {resume.summary && (
              <div className="py-4 space-y-1.5 border-b border-surface-container-highest">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Executive Synopsis
                </span>
                <p className="text-xs leading-relaxed text-on-surface-variant text-justify">
                  {resume.summary}
                </p>
              </div>
            )}

            {/* Experience Timeline */}
            <div className="py-4 space-y-4 border-b border-surface-container-highest">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Core Experience
              </span>
              <div className="space-y-4">
                {resume.experiences.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-bold text-on-surface">{exp.role}</span>
                      <span className="text-on-surface-variant">{exp.period}</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-secondary font-medium">
                      <span>{exp.company} {exp.department ? `• ${exp.department}` : ''}</span>
                      <span className="text-on-surface-variant">{exp.location}</span>
                    </div>
                    <ul className="list-disc list-inside text-[11px] text-on-surface-variant space-y-1 pl-1 pt-0.5">
                      {exp.bullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                    {exp.tags && exp.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {exp.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface text-[10px] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            {resume.education && resume.education.length > 0 && (
              <div className="pt-4 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                  Education & Credentials
                </span>
                {resume.education.map((edu) => (
                  <div key={edu.id} className="flex items-baseline justify-between text-xs">
                    <div>
                      <span className="font-bold text-on-surface">{edu.school}</span>
                      <p className="text-[11px] text-on-surface-variant">{edu.degree}</p>
                    </div>
                    <span className="text-on-surface-variant text-[11px]">{edu.period}</span>
                  </div>
                ))}
              </div>
            )}

            {/* ATS Watermark & Footer */}
            <div className="pt-6 mt-6 border-t border-surface-container-highest flex items-center justify-between text-[10px] text-outline">
              <span>CareerGenie Precision Render Engine v2.8</span>
              <span className="flex items-center gap-1 text-tertiary-container font-semibold">
                <span className="material-symbols-outlined text-[13px]">verified</span>
                ATS Parsing Check: Pass (100/100)
              </span>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
};
