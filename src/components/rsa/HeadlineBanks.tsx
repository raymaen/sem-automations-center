"use client";

import React, { useState } from "react";
import { useStore } from "../../store/store";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { HeadlineCategory, HeadlineItem } from "../../store/store";
import { v4 as uuidv4 } from "uuid";

const HeadlineBanks: React.FC = () => {
  const { banks, setBank } = useStore();
  const [editingCategory, setEditingCategory] = useState<HeadlineCategory | null>(null);
  const [newHeadline, setNewHeadline] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: HeadlineCategory,
    headlineId: string
  ) => {
    const updatedHeadlines = banks[category].map((headline: HeadlineItem) =>
      headline.id === headlineId ? { ...headline, text: e.target.value } : headline
    );
    setBank(category, updatedHeadlines);
  };

  const handleAddHeadline = (category: HeadlineCategory) => {
    if (!newHeadline.trim()) return;

    const updatedHeadlines = [...banks[category], { id: uuidv4(), category, text: newHeadline.trim(), variants: [] }];
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
            {editingCategory === category ? (
              <div className="space-y-4">
                {banks[category].map((headline: HeadlineItem) => (
                  <div key={headline.id} className="flex items-center gap-2">
                    <Input
                      value={headline.text}
                      onChange={(e) => handleInputChange(e, category, headline.id)}
                      className={headline.text.length > 30 ? "border-red-500" : ""}
                      aria-invalid={headline.text.length > 30 ? "true" : "false"}
                    />
                    {headline.text.length > 30 && <span className="text-red-500 text-sm">Exceeds 30 characters</span>}
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
                <Button onClick={() => setEditingCategory(null)} className="mt-4">
                  Save
                </Button>
              </div>
            ) : (
              <ul className="list-disc pl-5 space-y-2">
                {banks[category].map((headline: HeadlineItem) => (
                  <li key={headline.id} className={headline.text.length > 30 ? "text-red-500" : ""}>
                    {headline.text}
                  </li>
                ))}
              </ul>
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
