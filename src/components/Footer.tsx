import React from 'react';
import { useResume } from '../context/ResumeContext';

export const Footer: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen } = useResume();

  return (
    <footer className="w-full bg-surface-container-lowest/90 backdrop-blur-xl shadow-[0_-1px_8px_rgba(0,0,0,0.03)] border-t border-surface-container/60 mt-auto transition-colors duration-300">
      <div className="w-full max-w-[1720px] mx-auto px-gutter py-space-sm flex flex-col md:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-md">
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            CareerGenie Precision Suite • Build 2.8.4
          </span>
          <div className="hidden sm:flex items-center gap-space-xs">
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              PDF
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              DOCX
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              JSON
            </span>
            <span className="px-2 py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm font-semibold">
              ATS-Format
            </span>
          </div>
        </div>

        <div className="flex items-center gap-space-md">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container-high text-on-surface transition-colors font-label-md text-label-md shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">dock_to_left</span>
            <span className="font-medium">
              {isDrawerOpen ? 'Close Preview Drawer' : 'Live Preview Drawer'}
            </span>
          </button>
          <span className="font-label-sm text-label-sm text-on-surface-variant hidden lg:inline">
            © 2025 CareerGenie AI. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};
