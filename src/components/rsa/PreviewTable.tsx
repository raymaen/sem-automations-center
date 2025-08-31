"use client";
import React from "react";
import { useStore } from "../../store/store";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import info from "../../config/info.json";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";

const PreviewTable: React.FC = () => {
  const { campaign, adGroups, banks } = useStore();

  // Updated generatePreview to calculate final URL by combining domain and ad group URL
  const generatePreview = () => {
    return adGroups.flatMap((group) => {
      const ads = Array.from({ length: group.adsCount }, (_, adIndex) => {
        const bankHeadlines = Object.values(banks).flatMap((bank) =>
          bank.map((item) => {
            const variants = item.text.split(";").map((variant) => variant.trim());
            return variants[adIndex % variants.length] || "";
          })
        );

        const adGroupHeadlines = group.customHeadlines || [];

        // Combine and prioritize ad group headlines over bank headlines
        const headlines = [...adGroupHeadlines, ...bankHeadlines].slice(0, 15); // Limit to 15 headlines

        const descriptions = (campaign.descriptions || []).slice(0, 4); // Add fallback for descriptions

        // Calculate final URL by combining domain and ad group URL
        const finalUrl = `${campaign.baseDomain}/${group.finalUrl}`;

        return {
          campaign: campaign.name,
          adGroup: `${group.name} - Ad ${adIndex + 1}`,
          finalUrl,
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Campaign</TableHead>
              <TableHead>Ad Group</TableHead>
              <TableHead>Final URL</TableHead>
              <TableHead>Path 1</TableHead>
              <TableHead>Path 2</TableHead>
              {Array.from({ length: 15 }, (_, i) => (
                <TableHead key={i}>Headline {i + 1}</TableHead>
              ))}
              {Array.from({ length: 4 }, (_, i) => (
                <TableHead key={i}>Description {i + 1}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {previewRows.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.campaign}</TableCell>
                <TableCell>
                  {row.adGroup}
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>{info.adGroups.name}</TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  {row.finalUrl}
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>{info.adGroups.finalUrl}</TooltipContent>
                  </Tooltip>
                </TableCell>
                <TableCell>{row.path1}</TableCell>
                <TableCell>{row.path2}</TableCell>
                {row.headlines.map((headline, i) => (
                  <TableCell key={i}>{headline}</TableCell>
                ))}
                {row.descriptions.map((description, i) => (
                  <TableCell key={i}>{description}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default PreviewTable;
