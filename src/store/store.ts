import { create } from "zustand";
import { persist } from "zustand/middleware";

// Types
export type HeadlineCategory = "benefit" | "offer" | "feature" | "trust" | "cta" | "utility";

export interface HeadlineVariant {
  id: string;
  text: string;
  chars: number;
}

export interface HeadlineItem {
  id: string;
  category: HeadlineCategory;
  text: string; // Added text property
  variants: HeadlineVariant[];
  pinned?: boolean;
  notes?: string;
  maxLength?: number; // Added maxLength property
}

export interface CampaignConfig {
  campaignName: string;
  baseDomain: string;
  tag: string; // Ensure tag is always a string
  name: string; // Add name property
  description1: string; // Add description1 property
  description2: string; // Add description2 property
  description3: string; // Add description3 property
  description4: string; // Add description4 property
}

export interface AdGroupConfig {
  id: string;
  name: string;
  finalUrl: string;
  path1?: string;
  path2?: string;
  adsCount: number;
  utilityHeadlines: HeadlineItem[];
  customHeadlines: string[]; // New property for custom headlines
}

export interface Store {
  campaign: CampaignConfig;
  banks: Record<HeadlineCategory, HeadlineItem[]>;
  adGroups: AdGroupConfig[];
  setCampaign: (campaign: CampaignConfig) => void;
  setBank: (category: HeadlineCategory, items: HeadlineItem[]) => void;
  addAdGroup: (group: AdGroupConfig) => void;
  updateAdGroup: (id: string, group: Partial<AdGroupConfig>) => void;
  removeAdGroup: (id: string) => void;
  exportData: () => string;
}
// Short descriptions + examples for each headline bank (Home Security)
export const categoryDescriptions: Record<HeadlineCategory, { desc: string; examples: string[] }> = {
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

// Zustand Store
export const useStore = create<Store>()(
  persist<Store>(
    (set, get) => ({
      campaign: {
        campaignName: "",
        baseDomain: "",
        tag: "",
        name: "",
        description1: "",
        description2: "",
        description3: "",
        description4: "",
      },
      banks: {
        benefit: [],
        offer: [],
        feature: [],
        trust: [],
        cta: [],
        utility: [],
      },
      adGroups: [],
      setCampaign: (campaign) => set(() => ({ campaign })),
      setBank: (category, items) => set((state) => ({ banks: { ...state.banks, [category]: items } })),
      addAdGroup: (group) => set((state) => ({ adGroups: [...state.adGroups, group] })),
      updateAdGroup: (id, group) =>
        set((state) => ({
          adGroups: state.adGroups.map((g) => (g.id === id ? { ...g, ...group } : g)),
        })),
      removeAdGroup: (id) => set((state) => ({ adGroups: state.adGroups.filter((g) => g.id !== id) })),
      exportData: () => {
        const state = get();
        const rows = [
          ["Group Name", "Final URL", "Path1", "Path2", "Ads Count"],
          ...state.adGroups.map((group) => [
            group.name,
            group.finalUrl,
            group.path1 || "",
            group.path2 || "",
            group.adsCount.toString(),
          ]),
        ];
        return rows.map((row) => row.join(",")).join("\n");
      },
    }),
    { name: "rsa-builder-store" }
  )
);
