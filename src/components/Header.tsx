import React from 'react';
import { useResume } from '../context/ResumeContext';
import { ScreenTab } from '../types/resume';

export const Header: React.FC = () => {
  const { activeTab, setActiveTab, isDarkMode, toggleDarkMode, resume } = useResume();

  const navItems: { id: ScreenTab; label: string }[] = [
    { id: 'details', label: '1. Details' },
    { id: 'job-and-ai-match', label: '2. Job & AI Match' },
    { id: 'templates', label: '3. Templates' },
    { id: 'ats-checker', label: '4. ATS Checker' },
    { id: 'export-and-analyze', label: '5. Export & Analyze' },
    { id: 'live-example', label: 'Live Example / Demo' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur-2xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container/60 transition-colors duration-300">
      <div className="h-16 w-full px-gutter flex items-center justify-between gap-space-md max-w-[1720px] mx-auto">
        {/* Brand & AI Engine Badge */}
        <div className="flex items-center gap-space-md shrink-0">
          <div
            className="flex items-center gap-space-sm cursor-pointer"
            onClick={() => setActiveTab('details')}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white shadow-sm overflow-hidden">
              <span className="material-symbols-outlined text-[20px]">description</span>
            </div>
            <span className="font-title-md text-title-md text-on-surface tracking-tight font-bold hidden sm:inline">
              CareerGenie
            </span>
          </div>
          <div className="hidden xl:flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm shadow-[0_2px_6px_-1px_rgba(15,23,42,0.02)]">
            <span className="w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
            <span className="font-medium text-tertiary-container">AI Engine v3.4 Active</span>
          </div>
        </div>

        {/* Center Workflow Navigation */}
        <nav
          className="hidden lg:flex items-center bg-surface-container-low p-1 rounded-full overflow-x-auto shadow-inner"
          aria-label="Workflow navigation"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`px-space-md py-1.5 rounded-full transition-all duration-200 whitespace-nowrap text-sm cursor-pointer font-medium ${
                  isActive
                    ? 'bg-surface-container-lowest text-primary shadow-[0_2px_8px_rgba(15,23,42,0.08)] font-semibold'
                    : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action Island: Auto-Save + Dark/Light Theme Switch + Avatar */}
        <div className="flex items-center gap-space-sm shrink-0">
          <div className="flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest text-on-surface-variant font-label-md text-label-md shadow-[0_2px_6px_-1px_rgba(15,23,42,0.04)]">
            <span className="material-symbols-outlined text-[16px] text-tertiary-container">
              cloud_done
            </span>
            <span className="hidden md:inline font-medium text-on-surface">Auto-Save Enabled</span>
          </div>

          {/* Apple & HarmonyOS Style Interactive Dark/Light Switch */}
          <button
            id="theme-toggle"
            aria-label="Toggle Dark/Light Mode"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onClick={toggleDarkMode}
            className="relative group flex items-center p-1 rounded-full bg-surface-container-low hover:bg-surface-container transition-all duration-300 cursor-pointer shadow-sm border border-outline-variant/30 focus:outline-none"
          >
            <div className="relative w-14 h-7 rounded-full bg-surface-container-highest/60 p-0.5 flex items-center justify-between px-1.5 transition-colors duration-300">
              <span className="material-symbols-outlined text-[15px] text-amber-500 z-10 select-none">
                light_mode
              </span>
              <span className="material-symbols-outlined text-[15px] text-indigo-300 z-10 select-none">
                dark_mode
              </span>
              <div
                className="absolute top-0.5 w-6 h-6 rounded-full bg-surface-container-lowest shadow-[0_2px_8px_rgba(0,0,0,0.18)] flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
                style={{
                  transform: isDarkMode ? 'translateX(28px)' : 'translateX(2px)',
                }}
              >
                <span
                  className={`material-symbols-outlined text-[14px] ${
                    isDarkMode ? 'text-indigo-400' : 'text-amber-500'
                  }`}
                >
                  {isDarkMode ? 'dark_mode' : 'sunny'}
                </span>
              </div>
            </div>
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md z-50">
              {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="flex items-center pl-space-xs">
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-surface-container-highest shadow-sm"
              src={resume.avatarUrl}
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      {/* Mobile Tab Scroller for smaller screens */}
      <div className="lg:hidden flex items-center gap-1 overflow-x-auto px-4 py-2 border-t border-surface-container-high/40 bg-surface-container-low/70">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-primary text-on-primary shadow-xs'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
