import React from "react";
import CampaignSettings from "../../components/rsa/CampaignSettings";
import HeadlineBanks from "../../components/rsa/HeadlineBanks";
import AdGroups from "../../components/rsa/AdGroups";
import PreviewTable from "../../components/rsa/PreviewTable";
import ExportControls from "../../components/rsa/ExportControls";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../../components/ui/tabs";
import Hero from "../../components/rsa/Hero";
import Guide from "../../components/rsa/Guide";
import { FaBook, FaCogs, FaLightbulb, FaLayerGroup, FaTable } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Hero />

      <main className="p-6">
        <Tabs defaultValue="campaign-settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="campaign-settings">
              <FaCogs className="inline-block mr-2" /> 1. Setup Campaign
            </TabsTrigger>
            <TabsTrigger value="headline-banks">
              <FaLightbulb className="inline-block mr-2" /> 2. Headline Suggestions
            </TabsTrigger>
            <TabsTrigger value="ad-groups">
              <FaLayerGroup className="inline-block mr-2" /> 3. Manage Ad Groups
            </TabsTrigger>
            <TabsTrigger value="preview-export">
              <FaTable className="inline-block mr-2" /> 4. Preview & Export Ads
            </TabsTrigger>{" "}
            <TabsTrigger value="guide">
              <FaBook className="inline-block mr-2" /> How to Use
            </TabsTrigger>
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
    </div>
  );
}
