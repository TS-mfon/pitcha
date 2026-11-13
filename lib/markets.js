/**
 * Pitcha Ecosystem Market Configurations
 * Expands Pitcha beyond Nigeria to Kenya, India, and Global Silicon Valley standards.
 */

export const MARKETS = {
  nigeria: {
    id: "nigeria",
    name: "Nigeria",
    flag: "🇳🇬",
    currency: "Naira (₦)",
    context: "Naira volatility, USSD/SMS fallback, Lagos/Kano trade corridors, payment trust, informal cash economy",
    judgeLens: "Holds founders to real Nigerian market realities: fuel costs, purchasing power, network instability, and merchant distrust of tech.",
    examples: [
      "AI credit scoring for informal market traders in Lagos",
      "Solar-powered cold storage pay-as-you-go for tomato farmers in Kano",
      "WhatsApp micro-insurance for motorcycle taxi riders in Ibadan",
    ],
  },
  kenya: {
    id: "kenya",
    name: "Kenya",
    flag: "🇰🇪",
    currency: "Kenyan Shillings (KES)",
    context: "M-Pesa dominance, Safaricom Daraja APIs, SACCO credit unions, agri-produce supply chains, Nairobi Silicon Savannah",
    judgeLens: "Evaluates integration with M-Pesa rails, SACCO farmer networks, county regulatory frameworks, and East African cross-border trade.",
    examples: [
      "M-Pesa automated cashflow lending for tea & coffee SACCOs in Eldoret",
      "Smart solar water pumps for rural smallholders in Kisumu",
      "WhatsApp logistics coordination for boda-boda fleets in Nairobi",
    ],
  },
  india: {
    id: "india",
    name: "India",
    flag: "🇮🇳",
    currency: "Indian Rupee (₹)",
    context: "UPI volume, ONDC, Bharat vernacular internet, razor-thin unit economics, tier-2/tier-3 distribution",
    judgeLens: "Evaluates zero-MDR UPI economics, CAC at scale, vernacular voice-first UI, and competing against hyper-funded giants.",
    examples: [
      "Voice-first UPI billing app for Kirana store owners in Tier-2 Jaipur",
      "AI crop disease diagnosis & mandi price aggregator for Punjab farmers",
      "Micro-pension and mutual fund SIPs for gig delivery workers in Pune",
    ],
  },
  global: {
    id: "global",
    name: "Global / Silicon Valley",
    flag: "🌎",
    currency: "US Dollars ($)",
    context: "YC standard benchmarks, high ARR multiples, PLG customer acquisition, gross margin efficiency, global enterprise SaaS",
    judgeLens: "Evaluates defensibility against Big Tech, net revenue retention (NRR), moat, sales cycles, and global scalability.",
    examples: [
      "Autonomous AI security compliance auditor for enterprise Fintechs",
      "DevOps agent that auto-resolves production outages from Datadog alerts",
      "Figma-to-production engine with zero-drift component syncing",
    ],
  },
};

export function getMarket(marketId) {
  return MARKETS[marketId] || MARKETS.nigeria;
}
