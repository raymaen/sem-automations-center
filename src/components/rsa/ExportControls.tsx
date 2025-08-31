"use client";

import React from "react";
import { useStore } from "../../store/store";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Button } from "../ui/button";
import info from "../../config/info.json";
import { buildRSATable } from "../../utils/build-rsa-table";

const ExportControls: React.FC = () => {
  const { campaign, adGroups, banks } = useStore();

  const handleExport = () => {
    if (adGroups.length === 0) {
      alert("No ad groups available to export.");
      return;
    }

    const rows = buildRSATable({ campaign, adGroups, banks }).map((row) => ({
      Campaign: row.campaign,
      "Ad Group": row.adGroup,
      "Final URL": row.finalUrl,
      "Path 1": row.path1,
      "Path 2": row.path2,
      ...row.headlines.reduce((acc, headline, i) => ({ ...acc, [`Headline ${i + 1}`]: headline }), {}),
      ...row.descriptions.reduce((acc, description, i) => ({ ...acc, [`Description ${i + 1}`]: description }), {}),
    }));

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
          <TooltipTrigger asChild>
            <div>
              <Button onClick={handleExport} className="mr-2">
                Export CSV
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent>{info.exportControls.export}</TooltipContent>
        </Tooltip>
      </div>
    </section>
  );
};

export default ExportControls;
