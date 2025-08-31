import { CampaignConfig, AdGroupConfig, HeadlineCategory, HeadlineItem } from "../store/store";

interface RSATableInput {
  campaign: CampaignConfig;
  adGroups: AdGroupConfig[];
  banks: Record<HeadlineCategory, HeadlineItem[]>;
}

export const MAX_HEADLINES = 15;

/**
 * Builds RSA table rows for all ad groups and ads in a campaign.
 * Each ad group can have multiple ads (adsCount).
 * Each ad gets up to MAX_HEADLINES (15) headlines + campaign descriptions.
 *
 * Special logic:
 * - Headlines can contain ";" to define multiple variants.
 *   Example: "Low Prices; Best Prices"
 *   → Ad #1 will use "Low Prices", Ad #2 will use "Best Prices".
 * - If no ";" is present, the headline is shared across all ads.
 * - Custom headlines defined per ad group override bank headlines
 *   and also follow the ";" variant logic.
 */
export const buildRSATable = (state: RSATableInput) => {
  const { campaign, adGroups, banks } = state;

  return adGroups.flatMap((group) => {
    // For each ad in the ad group
    return Array.from({ length: group.adsCount }, (_, adIndex) => {
      /**
       * Step 1: Collect bank headlines
       * Flatten all bank categories → for each headline
       * split by ";" → pick the variant for this adIndex
       */
      const bankHeadlines = Object.values(banks).flatMap((bank) =>
        bank.map((item) => {
          const variants = item.text
            .split(";")
            .map((variant) => variant.trim())
            .filter(Boolean);
          // Pick the correct variant for this ad
          return variants[adIndex % variants.length] || "";
        })
      );

      /**
       * Step 2: Collect ad group custom headlines
       * Custom headlines are always prioritized over bank headlines.
       * They also support ";" split variants per ad.
       */
      const adGroupHeadlines = (group.customHeadlines || []).map((headline) => {
        const variants = headline
          .split(";")
          .map((variant) => variant.trim())
          .filter(Boolean);
        return variants[adIndex % variants.length] || "";
      });

      /**
       * Step 3: Merge headlines into final set of 15
       * - Start with bank headlines
       * - Append custom ad group headlines at the end
       * - Fill/rotate so we always have MAX_HEADLINES (15)
       */
      const headlines = Array.from({ length: MAX_HEADLINES }, (_, i) => {
        // Fill from bank headlines until space runs out
        if (i < MAX_HEADLINES - adGroupHeadlines.length) {
          return bankHeadlines[i % bankHeadlines.length] || "";
        }
        // Fill the rest from custom ad group headlines
        const customIndex = (i - (MAX_HEADLINES - adGroupHeadlines.length)) % adGroupHeadlines.length;
        return adGroupHeadlines[customIndex] || "";
      });

      /**
       * Step 4: Descriptions
       * Campaign-level descriptions (max 4 provided).
       */
      const descriptions = [
        campaign.description1,
        campaign.description2,
        campaign.description3,
        campaign.description4,
      ].filter(Boolean);

      /**
       * Step 5: Final URL
       * Combine base domain + ad group finalUrl
       */
      const finalUrl = `${campaign.baseDomain}/${group.finalUrl}`;

      return {
        campaign: campaign.campaignName,
        adGroup: group.name,
        finalUrl,
        path1: group.path1 || "",
        path2: group.path2 || "",
        headlines,
        descriptions,
      };
    });
  });
};
