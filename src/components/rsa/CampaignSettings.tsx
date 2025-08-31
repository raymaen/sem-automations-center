"use client";

import React, { useState } from "react";
import { useStore } from "../../store/store";
import { CampaignConfig } from "../../store/store";
import info from "../../config/info.json";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const CampaignSettings: React.FC = () => {
  const { campaign, setCampaign } = useStore();
  const [formState, setFormState] = useState<CampaignConfig & { descriptions: string[] }>({
    ...campaign,
    descriptions: ["", "", "", ""],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleDescriptionChange = (index: number, value: string) => {
    const updatedDescriptions = [...formState.descriptions];
    updatedDescriptions[index] = value;
    setFormState((prev) => ({ ...prev, descriptions: updatedDescriptions }));
  };

  const handleBlur = () => {
    setCampaign({
      campaignName: formState.campaignName,
      baseDomain: formState.baseDomain,
      tag: formState.tag,
      name: formState.name || "", // Ensure name is set
      descriptions: formState.descriptions, // Use current descriptions
    });
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Campaign Settings</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Campaign Name
            <span className="ml-2 text-gray-400 cursor-pointer" title={info.campaign.campaignName}>
              ⓘ
            </span>
          </label>
          <Input
            type="text"
            name="campaignName"
            value={formState.campaignName}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Base Domain
            <span className="ml-2 text-gray-400 cursor-pointer" title={info.campaign.baseDomain}>
              ⓘ
            </span>
          </label>
          <Input
            type="text"
            name="baseDomain"
            value={formState.baseDomain}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tag (Optional)
            <span className="ml-2 text-gray-400 cursor-pointer" title={info.campaign.tag}>
              ⓘ
            </span>
          </label>
          <Input
            type="text"
            name="tag"
            value={formState.tag || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Descriptions (90 chars max)
            <span className="ml-2 text-gray-400 cursor-pointer" title={info.campaign.descriptions}>
              ⓘ
            </span>
          </label>
          {formState.descriptions.map((desc, index) => (
            <div key={index} className="mt-2">
              <Textarea
                value={desc}
                onChange={(e) => handleDescriptionChange(index, e.target.value)}
                maxLength={90}
                className="block w-full"
                placeholder={`Description ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </form>
    </section>
  );
};

export default CampaignSettings;
