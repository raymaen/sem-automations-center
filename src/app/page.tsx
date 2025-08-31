import React from "react";
import CampaignSettings from "../components/CampaignSettings";
import HeadlineBanks from "../components/HeadlineBanks";
import AdGroups from "../components/AdGroups";
import PreviewTable from "../components/PreviewTable";
import ExportControls from "../components/ExportControls";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">RSA Builder</h1>
      </header>

      <main className="p-6 space-y-8">
        {/* Campaign Settings Section */}
        <CampaignSettings />

        {/* Headline Banks Section */}
        <HeadlineBanks />

        {/* Ad Groups Section */}
        <AdGroups />

        {/* Preview and Export Section */}
        <PreviewTable />
        <ExportControls />
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 RSA Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}
