"use client";

import React, { useState } from "react";
import { useStore } from "../../store/store";
import { AdGroupConfig } from "../../store/store";
import { v4 as uuidv4 } from "uuid";
import info from "../../config/info.json";
import { Tooltip, TooltipTrigger, TooltipContent } from "../ui/tooltip";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const AdGroups: React.FC = () => {
  const { adGroups, addAdGroup, updateAdGroup, removeAdGroup } = useStore();
  const [newGroup, setNewGroup] = useState<Partial<AdGroupConfig> & { newHeadline?: string }>({
    name: "",
    finalUrl: "",
    adsCount: 2,
    path1: "",
    path2: "",
    utilityHeadlines: [],
    customHeadlines: [],
    newHeadline: "", // Add newHeadline property
  });
  const [editingGroupId, setEditingGroupId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
    field: keyof AdGroupConfig
  ) => {
    setNewGroup({ ...newGroup, [field]: e.target.value });
  };

  const calculateMaxLength = (text: string) => {
    const semicolonCount = (text.match(/;/g) || []).length;
    return 30 + semicolonCount * 31;
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof AdGroupConfig,
    groupId: string
  ) => {
    const updatedGroup = adGroups.find((group) => group.id === groupId);
    if (updatedGroup) {
      if (field === "customHeadlines") {
        const updatedHeadlines = e.target.value
          .split(";")
          .map((headline) => headline.trim())
          .filter((headline) => headline.length > 0)
          .map((headline) => headline.slice(0, calculateMaxLength(headline)));
        updateAdGroup(groupId, { customHeadlines: updatedHeadlines });
      } else {
        updateAdGroup(groupId, { [field]: e.target.value });
      }
    }
  };

  const handleSaveGroup = (groupId: string) => {
    const group = adGroups.find((g) => g.id === groupId);
    if (group) {
      const filteredHeadlines = group.customHeadlines
        .map((headline) => headline.trim())
        .filter((headline) => headline.length > 0);
      updateAdGroup(groupId, { customHeadlines: filteredHeadlines });
    }
    setEditingGroupId(null);
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
      customHeadlines: newGroup.customHeadlines || [], // Include custom headlines
    } as AdGroupConfig);

    setNewGroup({
      name: "",
      finalUrl: "",
      adsCount: 2,
      path1: "",
      path2: "",
      utilityHeadlines: [],
      customHeadlines: [],
    });
    setError("");
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Ad Groups</h2>

      <div className="space-y-4">
        {adGroups.map((group) => (
          <div key={group.id} className="p-4 border rounded shadow-md bg-gray-50">
            {editingGroupId === group.id ? (
              <div>
                <h3 className="text-lg font-semibold mb-2">Editing: {group.name}</h3>
                <label className="block text-sm font-medium text-gray-700">Group Name</label>
                <Textarea
                  value={group.name}
                  onChange={(e) => handleEditInputChange(e, "name", group.id)}
                  className="block w-full mb-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="block text-sm font-medium text-gray-700">Final URL</label>
                <Textarea
                  value={group.finalUrl}
                  onChange={(e) => handleEditInputChange(e, "finalUrl", group.id)}
                  className="block w-full mb-4 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                <label className="block text-sm font-medium text-gray-700">Custom Headlines</label>
                <div className="border rounded p-4 bg-white space-y-2">
                  {Array.isArray(group.customHeadlines) &&
                    group.customHeadlines.map((headline, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Input
                          type="text"
                          value={headline}
                          onChange={(e) => {
                            const updatedHeadlines = [...group.customHeadlines];
                            updatedHeadlines[index] = e.target.value;
                            updateAdGroup(group.id, { customHeadlines: updatedHeadlines });
                          }}
                          className={headline.length > calculateMaxLength(headline) ? "border-red-500" : ""}
                          aria-invalid={headline.length > calculateMaxLength(headline) ? "true" : "false"}
                        />
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            headline.length > calculateMaxLength(headline)
                              ? "bg-red-100 text-red-600"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {headline.length}/{calculateMaxLength(headline)}
                        </span>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            const updatedHeadlines = group.customHeadlines.filter((_, i) => i !== index);
                            updateAdGroup(group.id, { customHeadlines: updatedHeadlines });
                          }}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      type="text"
                      placeholder="Add new headline"
                      value={newGroup.newHeadline || ""}
                      onChange={(e) => setNewGroup({ ...newGroup, newHeadline: e.target.value })}
                      className="block w-full mb-2"
                    />
                    <Button
                      onClick={() => {
                        if (newGroup.newHeadline?.trim()) {
                          const updatedHeadlines = [...(group.customHeadlines || []), newGroup.newHeadline.trim()];
                          updateAdGroup(group.id, { customHeadlines: updatedHeadlines });
                          setNewGroup({ ...newGroup, newHeadline: "" });
                        }
                      }}
                    >
                      Add
                    </Button>
                  </div>
                </div>
                <Button onClick={() => handleSaveGroup(group.id)} className="mt-4">
                  Save
                </Button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">{group.name}</h3>
                <p className="text-sm text-gray-600 mb-2">Final URL: {group.finalUrl}</p>
                <div className="border rounded p-4 bg-gray-100">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Custom Headlines</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {group.customHeadlines.map((headline, index) => (
                      <div
                        key={index}
                        className={`p-3 rounded border shadow-sm flex justify-between items-center ${
                          headline.length > calculateMaxLength(headline)
                            ? "border-red-400 bg-red-50"
                            : "border-gray-200"
                        }`}
                      >
                        <span>{headline}</span>
                        <span className="text-xs text-gray-500">
                          {headline.length}/{calculateMaxLength(headline)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => setEditingGroupId(group.id)}>Edit</Button>
                  <Button variant="destructive" onClick={() => removeAdGroup(group.id)}>
                    Remove
                  </Button>
                </div>
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
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Path 1</label>
          <div className="relative">
            <Input
              type="text"
              value={newGroup.path1}
              onChange={(e) => handleInputChange(e, "path1")}
              maxLength={15}
              className="block w-full mt-1"
            />
            <span
              className={`absolute bottom-1 right-2 text-xs px-2 py-1 rounded ${
                (newGroup.path1 || "").length > 15 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              {(newGroup.path1 || "").length}/15
            </span>
          </div>
        </div>
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Path 2</label>
          <div className="relative">
            <Input
              type="text"
              value={newGroup.path2}
              onChange={(e) => handleInputChange(e, "path2")}
              maxLength={15}
              className="block w-full mt-1"
            />
            <span
              className={`absolute bottom-1 right-2 text-xs px-2 py-1 rounded ${
                (newGroup.path2 || "").length > 15 ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
              }`}
            >
              {(newGroup.path2 || "").length}/15
            </span>
          </div>
        </div>
        <label className="block text-sm font-medium text-gray-700">
          Custom Headlines
          <Tooltip>
            <TooltipTrigger>
              <span className="ml-2 text-gray-400 cursor-pointer">ⓘ</span>
            </TooltipTrigger>
            <TooltipContent>Custom headlines specific to this ad group.</TooltipContent>
          </Tooltip>
        </label>
        <div className="space-y-2">
          {newGroup.customHeadlines?.map((headline, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                type="text"
                value={headline}
                onChange={(e) => {
                  const updatedHeadlines = [...(newGroup.customHeadlines || [])];
                  updatedHeadlines[index] = e.target.value;
                  setNewGroup({ ...newGroup, customHeadlines: updatedHeadlines });
                }}
                className="block w-full mb-2"
              />
              <Button
                variant="destructive"
                onClick={() => {
                  const updatedHeadlines = (newGroup.customHeadlines || []).filter((_, i) => i !== index);
                  setNewGroup({ ...newGroup, customHeadlines: updatedHeadlines });
                }}
              >
                Remove
              </Button>
            </div>
          ))}
          <div className="flex items-center gap-2 mt-2">
            <Input
              type="text"
              placeholder="Add new headline"
              value={newGroup.newHeadline || ""}
              onChange={(e) => setNewGroup({ ...newGroup, newHeadline: e.target.value })}
              className="block w-full mb-2"
            />
            <Button
              onClick={() => {
                if (newGroup.newHeadline?.trim()) {
                  const updatedHeadlines = [...(newGroup.customHeadlines || []), newGroup.newHeadline.trim()];
                  setNewGroup({ ...newGroup, customHeadlines: updatedHeadlines, newHeadline: "" });
                }
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <Button onClick={handleAddGroup} className="mt-2">
          Add Ad Group
        </Button>
      </div>
    </section>
  );
};

export default AdGroups;
