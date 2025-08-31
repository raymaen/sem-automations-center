"use client";
import React from "react";
import { useStore } from "../store/store";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import info from "../config/info.json";

const PreviewTable: React.FC = () => {
  const { campaign, adGroups, banks } = useStore();

  const generatePreview = () => {
    return adGroups.flatMap((group) => {
      const ads = Array.from({ length: group.adsCount }, (_, adIndex) => {
        const headlines = Object.values(banks)
          .flatMap((bank) =>
            bank.map((item) => {
              const variants = item.text.split(";").map((variant) => variant.trim());
              // Rotate variants across ads in the ad group
              return variants[adIndex % variants.length] || "";
            })
          )
          .slice(0, 15); // Limit to 15 headlines

        const descriptions = (campaign.descriptions || []).slice(0, 4); // Add fallback for descriptions

        return {
          campaign: campaign.name,
          adGroup: `${group.name} - Ad ${adIndex + 1}`,
          finalUrl: group.finalUrl,
          path1: group.path1 || "",
          path2: group.path2 || "",
          headlines,
          descriptions,
        };
      });

      return ads;
    });
  };

  const previewRows = generatePreview();

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Preview Table</h2>
      {previewRows.length === 0 ? (
        <p className="text-gray-500">No preview available. Add ad groups and headlines to see the preview.</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Campaign</th>
              <th className="border border-gray-300 px-4 py-2">Ad Group</th>
              <th className="border border-gray-300 px-4 py-2">Final URL</th>
              <th className="border border-gray-300 px-4 py-2">Path 1</th>
              <th className="border border-gray-300 px-4 py-2">Path 2</th>
              {Array.from({ length: 15 }, (_, i) => (
                <th key={i} className="border border-gray-300 px-4 py-2">
                  Headline {i + 1}
                </th>
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <th key={i} className="border border-gray-300 px-4 py-2">
                  Description {i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {previewRows.map((row, index) => (
              <tr key={index}>
                <td className="border border-gray-300 px-4 py-2">{row.campaign}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.adGroup}
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>{info.adGroups.name}</TooltipContent>
                  </Tooltip>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {row.finalUrl}
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>{info.adGroups.finalUrl}</TooltipContent>
                  </Tooltip>
                </td>
                <td className="border border-gray-300 px-4 py-2">{row.path1}</td>
                <td className="border border-gray-300 px-4 py-2">{row.path2}</td>
                {row.headlines.map((headline, i) => (
                  <td key={i} className="border border-gray-300 px-4 py-2">
                    {headline}
                  </td>
                ))}
                {row.descriptions.map((description, i) => (
                  <td key={i} className="border border-gray-300 px-4 py-2">
                    {description}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default PreviewTable;
