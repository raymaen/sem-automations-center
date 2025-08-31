# RSA Builder – Project README (v1)

A lightweight, single‑page React/Preact tool for generating **Responsive Search Ads (RSAs)** at scale, enforcing best practices, and exporting a **Google Ads Editor‑ready CSV**. Optimized for fast iteration

This app is a Responsive Search Ad (RSA) builder for Google Ads.

It helps marketers quickly generate large sets of ad headlines while following Google’s best practices.

Users can enter headlines grouped into categories such as benefits, offers, features, trust/authority, and CTAs.

Each headline can also include A/B test variants, separated by a special syntax (like |).

The app supports creating multiple ad groups, each with its own final URL, display paths, and group-specific headlines.

From the global headline banks and ad group inputs, the app assembles 15-headline RSAs per ad group.

It automatically checks for duplicate headlines, character limits, and variant exclusivity.

A live preview table shows the ads that will be generated, with warnings and character counts.

The final output can be exported as a CSV in a format ready to import into Google Ads Editor.

The UI is kept simple and functional, built with Next.js, TypeScript, and Tailwind, and data is stored locally in the browser.

---

## 0) Goals & Scope

- **Speed**: Rapidly compose headline banks per category (Benefits, Offers, Features, Trust/Authority, CTAs, Utility/Theme‑specific) and reuse across ad groups.
- **Quality**: Enforce RSA best practices (diversity of headline types, character limits, no duplicates, per‑adgroup unique insertions).
- **Simplicity**: Minimal, utilitarian UI; single page; data persisted in `localStorage`.
- **Export**: Visual preview table → export **CSV** that matches **Google Ads Editor** import schema.

---

## 1) Tech Stack

- **Runtime/UI**: **Preact**NEXTJS + TAILWIND CSS React‑compatible, smaller footprint already installed. If strict React is desired
- **Language**: **TypeScript**.
- **Styling**: **Tailwind CSS** (utility‑first, fast to iterate). Optional: shadcn/ui only if needed; keep minimal by default.
- **State**: Local component state + a tiny store (Zustand) **or** React Context; pick one (defaults to Zustand for clarity & testability).
- **CSV**: Simple custom CSV serializer (no heavy lib). Ensure Excel‑safe quoting.

---

## 2) Data Model (Types)

```ts
// Category taxonomy for headline bank
export type HeadlineCategory = "benefit" | "offer" | "feature" | "trust" | "cta" | "utility"; // theme/adgroup specific

// A headline can stand alone or be a member of a variant set (paired/linked variants)
export interface HeadlineVariant {
  id: string; // uuid
  text: string; // the headline text
  chars: number; // computed length
}

export interface HeadlineItem {
  id: string; // uuid for this line in bank
  category: HeadlineCategory;
  variants: HeadlineVariant[]; // 1..n; if >1 these are mutually exclusive per ad
  pinned?: boolean; // optional future use (pin to slot)
  notes?: string;
}

// Campaign-level config (step 0)
export interface CampaignConfig {
  campaignName: string;
  baseDomain: string; // for final urls default
  tag?: string; // internal tag for this tool
}

// Ad group definitions
export interface AdGroupConfig {
  id: string; // uuid
  name: string;
  finalUrl: string; // default final URL for this ad group
  path1?: string; // <= 15 chars
  path2?: string; // <= 15 chars
  adsCount: number; // default 2
  utilityHeadlines: HeadlineItem[]; // adgroup-specific headlines (with variants)
  allocateUtilityCount: number; // number of utility headlines to insert per RSA (0..3)
}

// Export row = one RSA creative (per ad) for an ad group
export interface RSAExportRow {
  campaign: string;
  adGroup: string;
  finalUrl: string;
  path1?: string;
  path2?: string;
  headlines: string[]; // length up to 15
  descriptions: string[]; // optional future: up to 4
}
```

**Notes**

- Headline character limit: **≤ 30**. (Flag >30 as error.)
- Description character limit (future): **≤ 90**.
- Default RSA plan: **15 headlines/ad**. Baseline (shared) ≈ 12, utility (adgroup) ≈ 3 (configurable).
- Paired variants (within a `HeadlineItem`) **must not** appear together in the same ad; rotate variants across ads.

---

## 3) Best‑Practice Rules (Enforced)

1. **Diversity per RSA**: include a balanced mix across categories. Default target mix for 15 headlines:

   - Benefits: 4–5
   - Offers: 2–3
   - Features: 2–3
   - Trust/Authority: 2–3
   - CTAs: 1–2
   - Utility (adgroup‑specific): 0–3 (configurable via `allocateUtilityCount`)

2. **No duplicates** (case‑insensitive, trimmed). Warn and de‑dup at assembly time.
3. **Length checks**: Headline >30 chars → error state (red count).
4. **Variant exclusivity**: two variants from the same `HeadlineItem` never appear in the same ad.
5. **Ads per Ad Group**: default **2**, support **2–3**.
6. **Optional**: Avoid starting multiple headlines with same stem (simple heuristic to increase variety).

---

## 4) UI/UX

**Philosophy**: Single page, ugly‑is‑fine, keyboard‑friendly, copy/paste friendly.

### Layout (top → bottom)

1. **Campaign Settings (Step 0)**

   - Inputs: Campaign Name, Base Domain, Internal Tag.
   - Persist on blur.

2. **Headline Banks (Global)**

   - For each category (benefit, offer, feature, trust, cta):

     - Collapsible card with a **big textarea** (one headline per line).
     - **Variant syntax**: same line, variants separated by `|` (pipe). Example:

       - `Lowest Prices|We Offer the Lowest Prices`
       - Parsed into `HeadlineItem` with `variants.length = 2`.

     - Live per‑line character counter; red if >30.
     - Inline count of valid lines.

3. **Ad Groups**

   - Repeater list of ad groups with: Name, Final URL, Path1, Path2, Ads Count (2 default), Allocate Utility Count (0–3).
   - **Utility Headlines** textarea with same `|` variant syntax & counters.

4. **Preview & Export**

   - Button: **Generate Preview** → renders a table where each row = one RSA creative (per ad) in each ad group.
   - Show counts by category per RSA (tiny badges) and warnings (duplicates, over‑length, under‑filled).
   - **Export CSV** button generates Editor‑ready CSV.

---

## 5) Parsing & Validation

- **Parsing**: Split textarea by newlines; ignore blank lines; split by `|` for variants; trim whitespace.
- **Counting**: Compute char length after trim (no HTML).
- **De‑dupe**: Maintain a Set of normalized strings (`toLowerCase().replace(/\s+/g,' ')`).
- **Errors/Warnings**:

  - Error if any headline >30.
  - Warning if a category’s supply can’t satisfy target mix.
  - Warning if utility allocation exceeds available utility items.

---

## 6) Assembly Algorithm (Per Ad Group → Per Ad)

Inputs:

- Global banks grouped by category → arrays of `HeadlineItem`.
- Ad group config → `utilityHeadlines` and `allocateUtilityCount`.
- `adsCount` (usually 2).

Process:

1. **Prepare Pools**

   - From global banks build category pools (as arrays of `HeadlineItem`).
   - From ad group, build utility pool.

2. **Plan Mix**

   - Start with default 15‑slot mix (see §3). Allow a small tolerance (±1) to use available inventory.
   - Reserve `allocateUtilityCount` slots for utility.

3. **Variant Rotation**

   - For each `HeadlineItem` used across multiple ads, round‑robin its `variants` so that Ad1 uses variant\[0], Ad2 uses variant\[1], etc.

4. **Fill Slots**

   - Fill per the planned mix, randomly shuffled within category to add variety, while:

     - Avoiding duplicates within the same ad.
     - Enforcing variant exclusivity.
     - Falling back across categories if some pools are empty.

5. **Finalize**

   - Truncate to 15 headlines; report warnings if <15.
   - Map to `RSAExportRow` with campaign/adgroup URLs/paths.

**Pseudocode**

```ts
function assembleRSAAds(cfg: CampaignConfig, ag: AdGroupConfig, banks: BankByCategory) {
  const rows: RSAExportRow[] = [];
  for (let a = 0; a < ag.adsCount; a++) {
    const plan = planMix(15, ag.allocateUtilityCount, banksAvailability(banks), utilityCount(ag));
    const usedIds = new Set<string>();
    const headlines: string[] = [];

    // helper pulls next variant for an item, offset by ad index
    const pickVariant = (item: HeadlineItem, adIndex: number) => {
      const v = item.variants[adIndex % item.variants.length];
      return { text: v.text, key: `${item.id}:${v.id}` };
    };

    for (const cat of plan.sequence) {
      const pool = getPool(cat, banks, ag.utilityHeadlines);
      const item = pickNextItem(pool, usedIds); // avoids duplicates and same item reuse
      if (!item) continue;
      const { text, key } = pickVariant(item, a);
      if (!usedIds.has(key)) {
        headlines.push(text);
        usedIds.add(key);
      }
    }

    rows.push({
      campaign: cfg.campaignName,
      adGroup: ag.name,
      finalUrl: ag.finalUrl || defaultUrl(cfg.baseDomain),
      path1: ag.path1,
      path2: ag.path2,
      headlines,
      descriptions: [], // future
    });
  }
  return rows;
}
```

---

## 7) CSV Export (Google Ads Editor)

**Columns (minimum viable for RSAs):**

- `Campaign`
- `Ad group`
- `Ad type` → `Responsive search ad`
- `Final URL`
- `Path 1` (<=15)
- `Path 2` (<=15)
- `Headline 1` … `Headline 15`
- _(Optional later)_ `Description 1` … `Description 4`

**Example header**

```
Campaign,Ad group,Ad type,Final URL,Path 1,Path 2,Headline 1,Headline 2,Headline 3,Headline 4,Headline 5,Headline 6,Headline 7,Headline 8,Headline 9,Headline 10,Headline 11,Headline 12,Headline 13,Headline 14,Headline 15
```

**Serialization rules**

- Wrap any field containing commas or quotes in quotes; escape quotes as `""`.
- Ensure UTF‑8 with BOM if targeting Excel (config option).
- Newlines within fields are not allowed; sanitize to spaces.

---

## 8) Components (Suggested)

- `App`: layout, tabs/sections.
- `CampaignForm`: campaign name, base domain, tag.
- `HeadlineBank`: generic component used for categories (props: title, categoryKey, value, onChange). Handles textarea parsing + counters.
- `AdGroupList`: manages repeatable ad groups (add/remove/clone).
- `AdGroupCard`: inputs + utility headline textarea + allocate count.
- `PreviewTable`: renders assembled RSAs with per‑row badges & warnings.
- `ExportControls`: Generate Preview + Export CSV.

---

## 9) State & Persistence

- **Store shape** (Zustand or Context):

```ts
interface Store {
  campaign: CampaignConfig;
  banks: Record<HeadlineCategory, HeadlineItem[]>; // global banks
  adGroups: AdGroupConfig[];
  setCampaign(...): void;
  setBank(cat: HeadlineCategory, textBlock: string): void; // raw textarea in, parsed to items
  addAdGroup(...): void; updateAdGroup(...): void; removeAdGroup(id: string): void;
  generatePreview(): RSAExportRow[];
}
```

- Persist entire store to `localStorage` (debounced). Provide "Reset All" and per‑section clear.

---

## 10) Validation & Warnings (UI)

- Per‑line character indicator (`28/30`, `31/30` → red).
- Category supply meter (how many valid items vs target mix).
- Per ad group: path length check (≤15), final URL presence.
- Preview row badges: category counts actually used; warnings if <15 headlines, >30 chars (blocked), duplicates removed.

---

## 11) Keyboard & Paste UX

- Textareas accept multi‑line paste.
- `|` creates variants on the same line.
- `Ctrl/Cmd + Enter` to add/commit.
- Tooltip hint: "Use `|` to add an A/B variant of the same concept. Variants won’t appear in the same ad."

---

## 13) Testing Checklist

- [ ] Character limits enforced and visible.
- [ ] Variant exclusivity across ads.
- [ ] No duplicates inside a single ad.
- [ ] Utility allocation respected per ad group.
- [ ] CSV imports successfully to Google Ads Editor (test file).
- [ ] State persists/reloads from `localStorage`.
- [ ] Edge cases: empty banks; only 1 ad; 3 ads; zero utility.

---

## 14) Example

**Benefit bank (textarea):**

```
Lowest Prices|We Offer the Lowest Prices
Same‑Day Service
We Clean After the Job
```

**Offer bank (textarea):**

```
$99 Special
Limited‑Time Deal
```

**Trust bank (textarea):**

```
5‑Star Rated
1,000+ Happy Customers
#1 Ranked Locally
```

**CTA bank (textarea):**

```
Get a Free Quote
Book Today
Call Now
```

**Ad Group: “Air Duct Installation”**

- Ads: 2
- Paths: `install`, `quote`
- Utility headlines textarea:

```
Air Duct Installation|Air Duct Install Experts
Installation Options Available
Expert Installation for All Air Ducts
```

- Allocate Utility: 3

**Result**: 2 rows (Ad1, Ad2) in preview + export.

---

## 15) Open Questions for You (Answer inline; we’ll update v2)

1. **Exact CSV schema** you use for Google Ads Editor (please paste a sample header/row you currently import).
2. Do you want **Descriptions** (up to 4) in v1, or only Headlines?
3. Should we support **pinning** headlines to positions (e.g., H1 pinned CTA), or let Google optimize? (Default: no pinning.)
4. Any **forbidden phrases** or brand compliance rules we should lint?
5. For category **mix targets**, keep defaults in §3 or provide your own numbers per vertical?
6. Should the tool generate **Display Path** automatically from ad group name (slugified/truncated), or manual only?
7. Do you want **import/export JSON** of the whole project (besides `localStorage`) for sharing between machines?

---

## 16) Roadmap (Post‑v1 Enhancements)

- Descriptions support with their own banks and validation (≤90 chars).
- Simple **headline scorer** (novelty, stem diversity, sentiment flags).
- **Dedup suggestions** (e.g., detect near‑duplicates by stemming/Levenshtein).
- **Templates per vertical** (e.g., Air Duct Cleaning starter banks).
- **Multi‑campaign** projects with tagging.
- **Bulk ad group import** from CSV.

---

## 17) Definition of Done (v1)

- Single‑page app builds with nextjs

  - Enter banks with `|` variants + counters.
  - Define ad groups (2–3 ads each) with utility headlines & allocation.
  - Generate preview with warnings and category badges.
  - Export a valid CSV that imports cleanly into Google Ads Editor.

- README (this file) reflects shipped behavior.
