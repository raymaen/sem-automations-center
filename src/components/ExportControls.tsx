"use client";

import React from "react";
import { useStore } from "../store/store";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Button } from "./ui/button";
import info from "../config/info.json";

const ExportControls: React.FC = () => {
  const { campaign, adGroups, banks, exportData } = useStore();

  const handleExport = () => {
    if (adGroups.length === 0) {
      alert("No ad groups available to export.");
      return;
    }

    const rows = adGroups.map((group) => {
      const headlines = banks.benefit
        .slice(0, 15) // Limit to 15 headlines
        .map((item) => item.variants[0]?.text || "");

      return {
        Campaign: campaign.campaignName,
        "Ad Group": group.name,
        "Final URL": group.finalUrl,
        Headlines: headlines.join(", "),
      };
    });

    const csvContent = [Object.keys(rows[0]).join(","), ...rows.map((row) => Object.values(row).join(","))].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "export.csv");
    link.click();
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Export Controls</h2>
      <div className="flex items-center">
        <Tooltip>
          <TooltipTrigger>
            <Button onClick={handleExport} className="mr-2">
              Export CSV
            </Button>
          </TooltipTrigger>
          <TooltipContent>{info.exportControls.export}</TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
};

export default ExportControls;
