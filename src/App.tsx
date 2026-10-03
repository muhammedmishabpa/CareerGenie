import React from 'react';
import { ResumeProvider, useResume } from './context/ResumeContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LivePreviewDrawer } from './components/LivePreviewDrawer';
import { DetailsScreen } from './screens/DetailsScreen';
import { JobMatchScreen } from './screens/JobMatchScreen';
import { TemplatesScreen } from './screens/TemplatesScreen';
import { AtsCheckerScreen } from './screens/AtsCheckerScreen';
import { ExportScreen } from './screens/ExportScreen';
import { LiveExampleScreen } from './screens/LiveExampleScreen';

const MainContent: React.FC = () => {
  const { activeTab } = useResume();

  return (
    <main className="w-full pt-16 bg-surface flex-1 transition-colors duration-300">
      <div className="flex flex-col w-full pb-12">
        {activeTab === 'details' && <DetailsScreen />}
        {activeTab === 'job-and-ai-match' && <JobMatchScreen />}
        {activeTab === 'templates' && <TemplatesScreen />}
        {activeTab === 'ats-checker' && <AtsCheckerScreen />}
        {activeTab === 'export-and-analyze' && <ExportScreen />}
        {activeTab === 'live-example' && <LiveExampleScreen />}
      </div>
    </main>
  );
};

export default function App() {
  return (
    <ResumeProvider>
      <div className="min-h-screen flex flex-col bg-surface text-on-surface">
        <Header />
        <MainContent />
        <Footer />
        <LivePreviewDrawer />
      </div>
    </ResumeProvider>
  );
}
