import React from "react";
import CampaignSettings from "../components/CampaignSettings";
import HeadlineBanks from "../components/HeadlineBanks";
import AdGroups from "../components/AdGroups";
import PreviewTable from "../components/PreviewTable";
import ExportControls from "../components/ExportControls";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import Hero from "../components/Hero";
import Guide from "../components/Guide";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Hero />

      <main className="p-6">
        <Tabs defaultValue="guide" className="space-y-4">
          <TabsList>
            <TabsTrigger value="guide">Guide</TabsTrigger>
            <TabsTrigger value="campaign-settings">Campaign Settings</TabsTrigger>
            <TabsTrigger value="headline-banks">Headline Banks</TabsTrigger>
            <TabsTrigger value="ad-groups">Ad Groups</TabsTrigger>
            <TabsTrigger value="preview-export">Preview & Export</TabsTrigger>
          </TabsList>

          <TabsContent value="guide">
            <Guide />
          </TabsContent>
          <TabsContent value="campaign-settings">
            <CampaignSettings />
          </TabsContent>
          <TabsContent value="headline-banks">
            <HeadlineBanks />
          </TabsContent>
          <TabsContent value="ad-groups">
            <AdGroups />
          </TabsContent>
          <TabsContent value="preview-export">
            <PreviewTable />
            <ExportControls />
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>© 2025 RSA Builder. All rights reserved.</p>
      </footer>
    </div>
  );
}
