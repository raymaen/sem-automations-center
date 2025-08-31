"use client";

import React from "react";

const Guide: React.FC = () => {
  return (
    <section className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <article className="prose max-w-none text-gray-800">
        <h1 className="text-3xl font-bold text-blue-600 mb-4">Responsive Search Ads (RSA) Builder Guide</h1>
        <p className="leading-relaxed">
          Responsive Search Ads (RSAs) allow Google’s machine learning to mix and match different headlines and
          descriptions to show the best ad for each search query. They are the default search ad type and can deliver
          5–15% higher CTR compared to standard ads.
          <br />
          This guide explains how to use the RSA Builder app effectively, step by step, while following best practices.
        </p>
        <hr className="my-6 border-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">1. Campaign Settings</h2>
        <p className="mb-4">Here you set the foundation for your ads.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Campaign Name</strong>: Pick something descriptive (e.g. “Home Security Services Miami –
            Discovery”).
          </li>
          <li>
            <strong>Base Domain / Final URL</strong>: Always send users to a <strong>relevant service page</strong>, not
            your homepage.
          </li>
          <li>
            <strong>Tag (Optional)</strong>: Use to track internally.
          </li>
          <li>
            <strong>Descriptions (up to 4)</strong>:
            <ul className="list-disc list-inside pl-6 space-y-1">
              <li>Each can be 90 characters max.</li>
              <li>Provide at least 2 unique descriptions.</li>
              <li>Highlight benefits, trust, offers, or pricing.</li>
              <li>Avoid repeating headlines.</li>
            </ul>
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          💡{" "}
          <em>
            Tip: Use Display Paths (Path 1, Path 2) to reinforce offers or locations (e.g. <code>/free-quote</code>,{" "}
            <code>/kansas</code>).
          </em>
        </p>
        <hr className="my-6 border-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">2. Headline Banks</h2>
        <p className="mb-4">This is where you create your pool of headlines, grouped by type.</p>
        <p className="font-medium">Categories</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Benefit</strong> → Customer outcomes (e.g. “Cleaner House in 2 Hours”).
          </li>
          <li>
            <strong>Offer</strong> → Prices/deals (e.g. “$99 Home Security”).
          </li>
          <li>
            <strong>Feature</strong> → Service details (e.g. “Family-Owned, Free Inspection”).
          </li>
          <li>
            <strong>Trust / Authority</strong> → Social proof (e.g. “5 Star Rated With 500+ Reviews”).
          </li>
          <li>
            <strong>CTA</strong> → Direct actions (e.g. “Call Now for a Free Quote”).
          </li>
          <li>
            <strong>Utility</strong> → Ad group-specific (installation, repair, location).
          </li>
        </ul>
        <p className="mt-4 font-medium">Best Practices</p>
        <ul className="list-disc list-inside pl-6 space-y-1">
          <li>
            Aim for <strong>10–15 unique headlines</strong>.
          </li>
          <li>
            Keep each headline <strong>≤30 characters</strong>.
          </li>
          <li>
            Use <strong>different angles</strong> (don’t repeat wording).
          </li>
          <li>Include keywords in some, but not all, headlines.</li>
          <li>Vary length to let Google test short vs long assets.</li>
          <li>
            <strong>Connected Variants</strong>: Place multiple variations on one line separated by a semicolon{" "}
            <code>;</code>.
            <ul className="list-disc list-inside pl-6 space-y-1">
              <li>
                Example: <code>Lowest Prices; We Offer the Lowest Prices</code>.
              </li>
              <li>The app ensures they rotate across ads, never together.</li>
            </ul>
          </li>
        </ul>
        <hr className="my-6 border-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">3. Ad Groups</h2>
        <p className="mb-4">Organize your assets into groups with specific targeting.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Group Name</strong>: Example: “Alarm Installation”.
          </li>
          <li>
            <strong>Final URL</strong>: Landing page specific to this group.
          </li>
          <li>
            <strong>Custom Headlines</strong>: Add group-specific lines (e.g. “Expert Alarm Installation”).
          </li>
          <li>
            <strong>Number of Ads</strong>: Usually 2 per group (up to 3).
          </li>
          <li>
            <strong>Utility Headlines Allocation</strong>: Choose how many slots (0–3) to fill with group-specific
            lines.
          </li>
        </ul>
        <p className="mt-4 text-sm text-gray-600">
          💡{" "}
          <em>
            Tip: Keep baseline headlines consistent across groups, then add a few custom ones for each service
            variation.
          </em>
        </p>
        <hr className="my-6 border-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">4. Preview &amp; Export</h2>
        <p className="mb-4">Review before launching.</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            The <strong>preview table</strong> shows each RSA as it will export to Google Ads Editor.
          </li>
          <li>Columns include Campaign, Ad Group, Final URL, Paths, Headline 1–15, and Description 1–4.</li>
          <li>Errors/warnings highlight duplicates or over-limit characters.</li>
          <li>
            Export generates a <strong>CSV</strong> ready to import into Google Ads Editor.
          </li>
        </ul>
        <hr className="my-6 border-gray-300" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-3">RSA Best Practices Recap</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <strong>Quantity</strong>: Give Google more options (aim for 15 headlines + 4 descriptions).
          </li>
          <li>
            <strong>Diversity</strong>: Don’t repeat the same phrasing. Cover offers, benefits, trust, features, CTAs.
          </li>
          <li>
            <strong>Keyword Use</strong>: Match user intent in some headlines, but not all.
          </li>
          <li>
            <strong>Pinning</strong>: Use sparingly. If you pin, provide multiple options per pinned slot (H1, H2, H3).
          </li>
          <li>
            <strong>Extensions</strong>: Add sitelinks, callouts, promotions, and other assets in Google Ads for higher
            Ad Rank.
          </li>
          <li>
            <strong>Monitor &amp; Iterate</strong>: After launch, check the <strong>Asset Report</strong> to see which
            headlines and descriptions perform best. Refine over time.
          </li>
        </ul>
        <hr className="my-6 border-gray-300" />
        <p className="text-sm text-gray-600">
          ✅ Using this workflow and best practices ensures your ads stay relevant, diverse, and optimized for Google’s
          machine learning.
        </p>
      </article>
    </section>
  );
};

export default Guide;
