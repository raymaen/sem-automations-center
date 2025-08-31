"use client";
import React from "react";
import { useStore } from "../../store/store";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import info from "../../config/info.json";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../ui/table";
import { buildRSATable } from "../../utils/build-rsa-table";

const PreviewTable: React.FC = () => {
  const { campaign, adGroups, banks } = useStore();

  const previewRows = buildRSATable({ campaign, adGroups, banks });

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
              <TableHead>
                Ad Group{" "}
                <Tooltip>
                  <TooltipTrigger>
                    <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent>{info.adGroups.name}</TooltipContent>
                </Tooltip>
              </TableHead>
              <TableHead>
                Final URL{" "}
                <Tooltip>
                  <TooltipTrigger>
                    <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                  </TooltipTrigger>
                  <TooltipContent>{info.adGroups.finalUrl}</TooltipContent>
                </Tooltip>
              </TableHead>
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
                <TableCell>{row.adGroup}</TableCell>
                <TableCell>{row.finalUrl}</TableCell>
                <TableCell>{row.path1}</TableCell>
                <TableCell>{row.path2}</TableCell>
                {row.headlines.slice(0, 15).map((headline, i) => (
                  <TableCell key={`headline-${i}`}>{headline}</TableCell>
                ))}
                {row.descriptions.slice(0, 4).map((description, i) => (
                  <TableCell key={`description-${i}`}>{description}</TableCell>
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
