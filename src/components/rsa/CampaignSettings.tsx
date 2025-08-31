"use client";

import React from "react";
import { useStore } from "../../store/store";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const CampaignSettings: React.FC = () => {
  const { campaign, setCampaign } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setCampaign({ ...campaign, [name]: value });
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Campaign Settings</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Campaign Name</label>
          <Input
            type="text"
            name="campaignName"
            value={campaign.campaignName}
            onChange={handleChange}
            className="mt-1"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Base Domain</label>
          <Input type="text" name="baseDomain" value={campaign.baseDomain} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Tag (Optional)</label>
          <Input type="text" name="tag" value={campaign.tag} onChange={handleChange} className="mt-1" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description 1</label>
          <div className="relative">
            <Textarea
              name="description1"
              value={campaign.description1}
              onChange={handleChange}
              maxLength={90}
              className="block w-full mt-1"
            />
            <span
              className={`absolute bottom-1 right-2 text-xs px-2 py-1 rounded ${
                campaign.description1.length > 90 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              {campaign.description1.length}/90
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description 2</label>
          <div className="relative">
            <Textarea
              name="description2"
              value={campaign.description2}
              onChange={handleChange}
              maxLength={90}
              className="block w-full mt-1"
            />
            <span
              className={`absolute bottom-1 right-2 text-xs px-2 py-1 rounded ${
                campaign.description2.length > 90 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              {campaign.description2.length}/90
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description 3</label>
          <div className="relative">
            <Textarea
              name="description3"
              value={campaign.description3}
              onChange={handleChange}
              maxLength={90}
              className="block w-full mt-1"
            />
            <span
              className={`absolute bottom-1 right-2 text-xs px-2 py-1 rounded ${
                campaign.description3.length > 90 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              {campaign.description3.length}/90
            </span>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description 4</label>
          <div className="relative">
            <Textarea
              name="description4"
              value={campaign.description4}
              onChange={handleChange}
              maxLength={90}
              className="block w-full mt-1"
            />
            <span
              className={`absolute bottom-1 right-2 text-xs px-2 py-1 rounded ${
                campaign.description4.length > 90 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              {campaign.description4.length}/90
            </span>
          </div>
        </div>
      </form>
    </section>
  );
};

export default CampaignSettings;
