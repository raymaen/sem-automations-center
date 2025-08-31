"use client";

import React, { useState } from "react";
import { useStore } from "../store/store";
import { AdGroupConfig } from "../store/store";
import { v4 as uuidv4 } from "uuid";
import info from "../config/info.json";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const AdGroups: React.FC = () => {
  const { adGroups, addAdGroup, updateAdGroup, removeAdGroup } = useStore();
  const [newGroup, setNewGroup] = useState<Partial<AdGroupConfig>>({
    name: "",
    finalUrl: "",
    adsCount: 2,
    path1: "",
    path2: "",
    utilityHeadlines: [],
    allocateUtilityCount: 0,
    customHeadlines: [], // New property for custom headlines
  });
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: keyof AdGroupConfig
  ) => {
    setNewGroup({ ...newGroup, [field]: e.target.value });
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof AdGroupConfig,
    groupId: string
  ) => {
    const updatedGroup = adGroups.find((group) => group.id === groupId);
    if (updatedGroup) {
      updateAdGroup(groupId, { [field]: e.target.value });
    }
  };

  const handleAddGroup = () => {
    if (!newGroup.name || !newGroup.finalUrl) {
      setError("Group Name and Final URL are required.");
      return;
    }

    addAdGroup({
      id: uuidv4(),
      name: newGroup.name,
      finalUrl: newGroup.finalUrl,
      path1: newGroup.path1 || "",
      path2: newGroup.path2 || "",
      adsCount: newGroup.adsCount || 2,
      utilityHeadlines: [],
      allocateUtilityCount: newGroup.allocateUtilityCount || 0,
      customHeadlines: newGroup.customHeadlines || [], // Include custom headlines
    } as AdGroupConfig);

    setNewGroup({
      name: "",
      finalUrl: "",
      adsCount: 2,
      path1: "",
      path2: "",
      utilityHeadlines: [],
      allocateUtilityCount: 0,
      customHeadlines: [],
    });
    setError("");
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Ad Groups</h2>

      <div className="space-y-4">
        {adGroups.map((group) => (
          <div key={group.id} className="p-4 border rounded">
            {editingGroupId === group.id ? (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Group Name
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>{info.adGroups.name}</TooltipContent>
                  </Tooltip>
                </label>
                <Textarea
                  value={group.name}
                  onChange={(e) => handleEditInputChange(e, "name", group.id)}
                  className="block w-full mb-2"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Final URL
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>{info.adGroups.finalUrl}</TooltipContent>
                  </Tooltip>
                </label>
                <Textarea
                  value={group.finalUrl}
                  onChange={(e) => handleEditInputChange(e, "finalUrl", group.id)}
                  className="block w-full mb-2"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Custom Headlines
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>Custom headlines specific to this ad group.</TooltipContent>
                  </Tooltip>
                </label>
                <Textarea
                  value={group.customHeadlines?.join(", ") || ""}
                  onChange={(e) => handleEditInputChange(e, "customHeadlines", group.id)}
                  className="block w-full mb-2"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Path 1
                  <span className="ml-2 text-gray-400 cursor-pointer" title={info.adGroups.path1}>
                    ⓘ
                  </span>
                </label>
                <input
                  type="text"
                  value={group.path1}
                  onChange={(e) => handleEditInputChange(e, "path1", group.id)}
                  className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Path 2
                  <span className="ml-2 text-gray-400 cursor-pointer" title={info.adGroups.path2}>
                    ⓘ
                  </span>
                </label>
                <input
                  type="text"
                  value={group.path2}
                  onChange={(e) => handleEditInputChange(e, "path2", group.id)}
                  className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Ads Count
                  <span className="ml-2 text-gray-400 cursor-pointer" title={info.adGroups.adsCount}>
                    ⓘ
                  </span>
                </label>
                <input
                  type="number"
                  value={group.adsCount}
                  onChange={(e) => handleEditInputChange(e, "adsCount", group.id)}
                  className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <label className="block text-sm font-medium text-gray-700">
                  Allocate Utility Count
                  <span className="ml-2 text-gray-400 cursor-pointer" title={info.adGroups.allocateUtilityCount}>
                    ⓘ
                  </span>
                </label>
                <input
                  type="number"
                  value={group.allocateUtilityCount}
                  onChange={(e) => handleEditInputChange(e, "allocateUtilityCount", group.id)}
                  className="block w-full mb-2 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                <Button onClick={() => setEditingGroupId(null)} className="mt-2">
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-medium">{group.name}</h3>
                <p>Final URL: {group.finalUrl}</p>
                <p>Custom Headlines: {group.customHeadlines?.join(", ") || "None"}</p>
                <Button onClick={() => setEditingGroupId(group.id)} className="mt-2">
                  Edit
                </Button>
                <Button onClick={() => removeAdGroup(group.id)} className="mt-2 ml-2" variant="destructive">
                  Remove
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-2">Add New Ad Group</h3>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <label className="block text-sm font-medium text-gray-700">
          Group Name
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
            </TooltipTrigger>
            <TooltipContent>{info.adGroups.name}</TooltipContent>
          </Tooltip>
        </label>
        <Textarea
          placeholder="Group Name"
          value={newGroup.name || ""}
          onChange={(e) => handleInputChange(e, "name")}
          className="block w-full mb-2"
        />
        <label className="block text-sm font-medium text-gray-700">
          Final URL
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
            </TooltipTrigger>
            <TooltipContent>{info.adGroups.finalUrl}</TooltipContent>
          </Tooltip>
        </label>
        <Textarea
          placeholder="Final URL"
          value={newGroup.finalUrl || ""}
          onChange={(e) => handleInputChange(e, "finalUrl")}
          className="block w-full mb-2"
        />
        <label className="block text-sm font-medium text-gray-700">
          Custom Headlines
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
            </TooltipTrigger>
            <TooltipContent>Custom headlines specific to this ad group.</TooltipContent>
          </Tooltip>
        </label>
        <Textarea
          placeholder="Custom Headlines (comma-separated)"
          value={newGroup.customHeadlines?.join(", ") || ""}
          onChange={(e) => handleInputChange(e, "customHeadlines")}
          className="block w-full mb-2"
        />
        <Button onClick={handleAddGroup} className="mt-2">
          Add Ad Group
        </Button>
      </div>
    </section>
  );
};

export default AdGroups;
