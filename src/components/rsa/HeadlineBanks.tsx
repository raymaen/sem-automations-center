"use client";

import React, { useState } from "react";
import { useStore } from "../../store/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HeadlineCategory, HeadlineItem } from "../../store/store";
import { v4 as uuidv4 } from "uuid";

const categoryDescriptions: Record<HeadlineCategory, { desc: string; examples: string[] }> = {
  benefit: {
    desc: "Highlight the homeowner's safety and peace of mind.",
    examples: [
      "Protect Your Family Today",
      "Peace of Mind Guaranteed",
      "Stop Break-Ins Before They Happen",
      "24/7 Safety for Loved Ones",
      "Rest Easy, You’re Protected",
    ],
  },
  offer: {
    desc: "Call out your deal or limited-time offer.",
    examples: [
      "Free Install This Month",
      "From $19.99/Month",
      "Zero Upfront Costs",
      "Limited-Time Security Deal",
      "Exclusive Online Discount",
    ],
  },
  feature: {
    desc: "Showcase unique system features or capabilities.",
    examples: [
      "Smartphone App Control",
      "HD Video Monitoring",
      "Wireless Alarm Systems",
      "Smart Locks & Sensors",
      "Easy DIY Installation",
    ],
  },
  trust: {
    desc: "Build credibility and trust signals.",
    examples: [
      "Trusted by 1M+ Families",
      "Top Rated Security Service",
      "UL-Certified Monitoring",
      "Backed by 5-Star Reviews",
      "Licensed & Insured Experts",
    ],
  },
  cta: {
    desc: "Strong call to action to drive sign-ups.",
    examples: [
      "Get a Free Quote Now",
      "Call for Same-Day Install",
      "Secure Your Home Today",
      "Schedule Free Inspection",
      "Compare Top Systems Now",
    ],
  },
  utility: {
    desc: "Flexible fillers or utility headlines.",
    examples: [
      "24/7 Monitoring Service",
      "Nationwide Coverage",
      "Fast Local Installation",
      "Custom Plans for Every Home",
      "Works with Alexa & Google",
    ],
  },
};

const HeadlineBanks: React.FC = () => {
  const { banks, setBank } = useStore();
  const [editingCategory, setEditingCategory] = useState<HeadlineCategory | null>(null);
  const [newHeadline, setNewHeadline] = useState<string>("");

  const handleSaveCategory = (category: HeadlineCategory) => {
    const filteredHeadlines = banks[category].filter((headline) => headline.text.trim().length > 0);
    setBank(category, filteredHeadlines);
    setEditingCategory(null);
  };

  const calculateMaxLength = (text: string) => {
    const semicolonCount = (text.match(/;/g) || []).length;
    return 30 + semicolonCount * 31;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    category: HeadlineCategory,
    headlineId: string
  ) => {
    const updatedHeadlines = banks[category].map((headline: HeadlineItem) => {
      if (headline.id === headlineId) {
        const updatedText = e.target.value;
        const maxLength = calculateMaxLength(updatedText);
        return {
          ...headline,
          text: updatedText.slice(0, maxLength),
          maxLength,
        };
      }
      return headline;
    });
    setBank(category, updatedHeadlines);
  };

  const isOverLimit = (headline: HeadlineItem) => {
    return headline.text.length > (headline.maxLength || calculateMaxLength(headline.text));
  };

  const handleAddHeadline = (category: HeadlineCategory) => {
    if (!newHeadline.trim()) return;

    const updatedHeadlines = [
      ...banks[category],
      ...newHeadline
        .split(";")
        .map((headline) => headline.trim())
        .filter((headline) => headline.length > 0)
        .map((headline) => ({ id: uuidv4(), category, text: headline, variants: [] })),
    ];
    setBank(category, updatedHeadlines);
    setNewHeadline("");
  };

  return (
    <section className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Headline Banks</h2>
      <Tabs>
        <TabsList>
          {(Object.keys(banks) as HeadlineCategory[]).map((category) => (
            <TabsTrigger key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {(Object.keys(banks) as HeadlineCategory[]).map((category) => (
          <TabsContent key={category} value={category}>
            {/* Category Description */}
            <div className="mb-4 p-4 bg-gray-100 rounded border border-gray-300">
              <p className="text-sm text-gray-700 font-medium">{categoryDescriptions[category]?.desc}</p>
              <p className="text-xs text-gray-500 mt-2">
                <span className="font-semibold">Examples:</span> {categoryDescriptions[category]?.examples.join(" • ")}
              </p>
            </div>

            {editingCategory === category ? (
              <div className="space-y-4">
                {banks[category].map((headline: HeadlineItem) => (
                  <div key={headline.id} className="flex items-center gap-2">
                    <Input
                      value={headline.text}
                      onChange={(e) => handleInputChange(e, category, headline.id)}
                      className={isOverLimit(headline) ? "border-red-500" : ""}
                      aria-invalid={isOverLimit(headline) ? "true" : "false"}
                    />
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        isOverLimit(headline) ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {headline.text.length}/{headline.maxLength || calculateMaxLength(headline.text)}
                    </span>
                  </div>
                ))}

                <div className="flex items-center gap-2 mt-4">
                  <Input
                    value={newHeadline}
                    onChange={(e) => setNewHeadline(e.target.value)}
                    placeholder="Add new headline"
                  />
                  <Button onClick={() => handleAddHeadline(category)}>Add</Button>
                </div>
                <Button onClick={() => handleSaveCategory(category)} className="mt-4">
                  Save
                </Button>
              </div>
            ) : (
              // View mode with nicer cards
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {banks[category].map((headline: HeadlineItem) => (
                  <div
                    key={headline.id}
                    className={`p-3 rounded border shadow-sm flex justify-between items-center ${
                      isOverLimit(headline) ? "border-red-400 bg-red-50" : "border-gray-200"
                    }`}
                  >
                    <span>{headline.text}</span>
                    <span className="text-xs text-gray-500">
                      {headline.text.length}/{headline.maxLength || calculateMaxLength(headline.text)}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {editingCategory !== category && (
              <Button onClick={() => setEditingCategory(category)} className="mt-4">
                Edit
              </Button>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default HeadlineBanks;
