import React, { createContext, useContext, useState, useEffect } from 'react';
import { ResumeData, ScreenTab, ExperienceItem, EducationItem, SkillItem } from '../types/resume';

interface ResumeContextType {
  resume: ResumeData;
  activeTab: ScreenTab;
  setActiveTab: (tab: ScreenTab) => void;
  isDarkMode: boolean;
  setIsDarkMode: (dark: boolean) => void;
  toggleDarkMode: () => void;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  updatePersonalInfo: (field: keyof ResumeData, value: string) => void;
  updateExperience: (id: string, updated: Partial<ExperienceItem>) => void;
  addExperience: (item: ExperienceItem) => void;
  removeExperience: (id: string) => void;
  addEducation: (item: EducationItem) => void;
  updateEducation: (id: string, updated: Partial<EducationItem>) => void;
  removeEducation: (id: string) => void;
  toggleSkill: (skillName: string) => void;
  addCustomSkill: (name: string, match?: number) => void;
  loadPreset: (presetType: 'tech-lead' | 'elena' | 'product-architect') => void;
  resetResume: () => void;
  polishSummary: () => void;
  polishAll: () => void;
  atsScore: number;
  keywordFixApplied: boolean;
  verbFixApplied: boolean;
  applyKeywordFix: () => void;
  applyVerbFix: () => void;
  atsEngine: 'workday' | 'greenhouse' | 'lever';
  setAtsEngine: (engine: 'workday' | 'greenhouse' | 'lever') => void;
  selectedTemplateTitle: string;
  setSelectedTemplateTitle: (title: string) => void;
}

export const INITIAL_RESUME: ResumeData = {
  name: 'Elena Vance, M.Sc.',
  headline: 'Principal AI Engineer & Systems Architect',
  email: 'elena.vance@precisionai.tech',
  phone: '+1 (415) 890-4421',
  location: 'San Francisco, CA (US Citizen)',
  portfolio: 'https://elena-arch.io',
  github: 'github.com/evance-core',
  avatarUrl:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBwAIl26Bdd3JGXOK2BHEYw_pr_hiEesIBiGLiF26F5odR57ke-r7H8QWOcHEgkfiTlXFbxrqgtB0j6OGyPiKZAHrWdLy7a6tzsns5fyDl_0gFE-oor_fYFzOmfqBfjWVNohIwNO-72DIf3-no15x39wXwk6H-KMkC2_IK1QC5DmCUR9BDQ1eIxwgA5ipF5JVZuRpAyYgLlNYZJuESZVH4DCGn9FAH1OBbgu2wnrjOcsLkiSuInX6JT',
  summary:
    'Pioneering Machine Learning Architect with 8+ years leading deep-learning distributed infrastructure and high-throughput inference engines. Spearheaded transformer latency compression yielding 42% cost reduction across $18M ARR enterprise pipelines. Passionate about resilient systems and ethical alignment.',
  experiences: [
    {
      id: 'exp-1',
      role: 'Principal AI Architect',
      company: 'Synthex Labs',
      department: 'Autonomous Systems Division',
      location: 'San Francisco, CA',
      period: '2022 – Present',
      bullets: [
        'Led cross-functional group of 14 research scientists deploying multi-modal neural architectures at scale.',
        'Designed hardware-accelerated batching layer diminishing GPU idle cycles by 34% across 512 H100 nodes.',
      ],
      tags: ['Ray.io', 'PyTorch', 'CUDA'],
    },
    {
      id: 'exp-2',
      role: 'Staff ML Platform Engineer',
      company: 'Cognita Cloud',
      department: 'Infrastructure',
      location: 'Palo Alto, CA',
      period: '2019 – 2022',
      bullets: [
        'Built enterprise-scale ML pipeline handling continuous model telemetry, feature versioning, and zero-downtime rollouts.',
      ],
      tags: ['Kubernetes', 'Feast', 'Kafka'],
    },
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'M.S. in Computer Science (Artificial Intelligence Specialization)',
      school: 'Stanford University',
      honors: 'Magna Cum Laude',
      period: '2017 – 2019',
    },
  ],
  targetTitle: 'Staff Product Designer at Figma',
  targetCompany: 'Figma',
  jobDescription:
    "We are looking for a Staff Product Designer to lead Figma's core design system infrastructure and collaboration canvas. You will architect multi-modal canvas interactions, elevate token management frameworks, mentor L5 designers, and build tight integrations between Figma design paradigms and production React token pipelines.",
  skills: [
    { name: 'Figma', match: 98, weight: 14, active: true },
    { name: 'Design Systems', match: 96, weight: 12, active: true },
    { name: 'UI/UX Architecture', match: 94, weight: 10, active: true },
    { name: 'Prototyping', match: 91, weight: 8, active: true },
    { name: 'React & Design Tokens', match: 89, weight: 9, active: true },
    { name: 'User Research', match: 86, weight: 7, active: true },
    { name: 'Design Ops', match: 92, weight: 6, active: false },
    { name: 'Interaction Spec', match: 84, weight: 5, active: false },
    { name: 'Cross-Functional Leadership', match: 88, weight: 7, active: false },
    { name: 'Accessibility (WCAG 2.2)', match: 81, weight: 4, active: false },
    { name: 'A/B Experimentation', match: 78, weight: 6, active: false },
  ],
  selectedTemplateId: 'cupertino-clean',
  accentColor: 'emerald',
  fontFamily: 'plus-jakarta',
  density: 'balanced',
};

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);
  const [activeTab, setActiveTab] = useState<ScreenTab>('details');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [atsScore, setAtsScore] = useState<number>(94);
  const [keywordFixApplied, setKeywordFixApplied] = useState<boolean>(false);
  const [verbFixApplied, setVerbFixApplied] = useState<boolean>(false);
  const [atsEngine, setAtsEngine] = useState<'workday' | 'greenhouse' | 'lever'>('workday');
  const [selectedTemplateTitle, setSelectedTemplateTitle] = useState<string>('Cupertino Clean');

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const updatePersonalInfo = (field: keyof ResumeData, value: string) => {
    setResume((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateExperience = (id: string, updated: Partial<ExperienceItem>) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, ...updated } : exp)),
    }));
  };

  const addExperience = (item: ExperienceItem) => {
    setResume((prev) => ({
      ...prev,
      experiences: [...prev.experiences, item],
    }));
  };

  const removeExperience = (id: string) => {
    setResume((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((exp) => exp.id !== id),
    }));
  };

  const addEducation = (item: EducationItem) => {
    setResume((prev) => ({
      ...prev,
      education: [...prev.education, item],
    }));
  };

  const updateEducation = (id: string, updated: Partial<EducationItem>) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, ...updated } : edu)),
    }));
  };

  const removeEducation = (id: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== id),
    }));
  };

  const toggleSkill = (skillName: string) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.name === skillName ? { ...s, active: !s.active } : s)),
    }));
  };

  const addCustomSkill = (name: string, match = 95) => {
    if (!name.trim()) return;
    setResume((prev) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          name: name.trim(),
          match,
          weight: 7,
          active: true,
        },
      ],
    }));
  };

  const loadPreset = (presetType: 'tech-lead' | 'elena' | 'product-architect') => {
    if (presetType === 'tech-lead') {
      setResume((prev) => ({
        ...prev,
        name: 'Marcus Sterling, Ph.D.',
        headline: 'Director of Distributed Systems & Cloud Infrastructure',
        email: 'm.sterling@infra-nexus.dev',
        phone: '+1 (415) 728-9901',
        location: 'San Francisco, CA • Remote',
        portfolio: 'https://sterling-systems.io',
        github: 'github.com/msterling-infra',
        summary:
          'Distinguished infrastructure executive with 12+ years optimizing hyperscale cloud networks, leading global teams across 4 continents, and decreasing cloud compute expenditure by $42M annually.',
        experiences: [
          {
            id: 'exp-lead-1',
            role: 'VP of Infrastructure & Platform Architecture',
            company: 'Nexus HyperScale Corp',
            department: 'Cloud Native Core',
            location: 'San Francisco, CA',
            period: '2020 – Present',
            bullets: [
              'Spearheaded Kubernetes bare-metal fleet deployment spanning 2,400+ physical servers across 8 global regions.',
              'Achieved 99.999% SLA across $450M annualized merchant payment pipelines.',
            ],
            tags: ['Distributed Consensus', 'eBPF', 'Rust', 'Go'],
          },
          {
            id: 'exp-lead-2',
            role: 'Principal Systems Architect',
            company: 'TerraData Dynamics',
            department: 'Core Storage Engine',
            location: 'Mountain View, CA',
            period: '2016 – 2020',
            bullets: [
              'Architected distributed LSM-tree database engine processing 8M write IOPS with p99 latency < 2.4ms.',
            ],
            tags: ['C++', 'RocksDB', 'Raft'],
          },
        ],
      }));
    } else {
      setResume(INITIAL_RESUME);
    }
  };

  const resetResume = () => {
    setResume({
      ...INITIAL_RESUME,
      name: '',
      headline: '',
      email: '',
      phone: '',
      location: '',
      portfolio: '',
      github: '',
      summary: '',
    });
  };

  const polishSummary = () => {
    setResume((prev) => ({
      ...prev,
      summary:
        'Accomplished AI Architect with proven expertise directing resilient, petabyte-scale distributed training workloads and cutting production inference costs by 42% via novel GPU kernel scheduling.',
    }));
  };

  const polishAll = () => {
    polishSummary();
    setResume((prev) => ({
      ...prev,
      headline: 'Principal AI Systems Architect • High-Throughput Inference',
      experiences: prev.experiences.map((exp) => ({
        ...exp,
        bullets: exp.bullets.map((b) =>
          b.startsWith('Spearheaded') || b.startsWith('Orchestrated')
            ? b
            : `Spearheaded end-to-end delivery of ${b.toLowerCase()}`
        ),
      })),
    }));
  };

  const applyKeywordFix = () => {
    setKeywordFixApplied(true);
    setAtsScore(97);
  };

  const applyVerbFix = () => {
    setVerbFixApplied(true);
    setAtsScore(99);
  };

  return (
    <ResumeContext.Provider
      value={{
        resume,
        activeTab,
        setActiveTab,
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        isDrawerOpen,
        setIsDrawerOpen,
        updatePersonalInfo,
        updateExperience,
        addExperience,
        removeExperience,
        addEducation,
        updateEducation,
        removeEducation,
        toggleSkill,
        addCustomSkill,
        loadPreset,
        resetResume,
        polishSummary,
        polishAll,
        atsScore,
        keywordFixApplied,
        verbFixApplied,
        applyKeywordFix,
        applyVerbFix,
        atsEngine,
        setAtsEngine,
        selectedTemplateTitle,
        setSelectedTemplateTitle,
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = (): ResumeContextType => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
