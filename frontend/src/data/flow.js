export const flow = {
  start: {
    message:
      "Welcome to My Broker Search. Tell us what you need help with and we’ll point you in the right direction.",
    options: [
      { label: "Social Media Marketing", next: "social_1" },
      { label: "Website / IDX", next: "website_1" },
      { label: "Ads / Lead Generation", next: "ads_1" },
      { label: "CRM / Automation", next: "crm_1" },
      { label: "Pricing", next: "pricing_1" },
      { label: "Book a Call", next: "lead_capture" },
    ],
  },

  social_1: {
    message: "What best describes your business?",
    options: [
      { label: "Solo Agent", next: "social_2" },
      { label: "Team", next: "social_2" },
      { label: "Brokerage", next: "social_2" },
    ],
  },

  social_2: {
    message: "What market are you in?",
    input: true,
    next: "social_3",
  },

  social_3: {
    message: "What do you need the most help with right now?",
    options: [
      { label: "Content Creation", next: "lead_capture" },
      { label: "Consistency", next: "lead_capture" },
      { label: "Branding", next: "lead_capture" },
      { label: "Lead Generation", next: "lead_capture" },
    ],
  },

  website_1: {
    message: "Do you already have a website in place?",
    options: [
      { label: "Yes", next: "website_2" },
      { label: "No", next: "website_2" },
    ],
  },

  website_2: {
    message: "What are you looking for?",
    options: [
      { label: "New Website", next: "lead_capture" },
      { label: "Website Updates", next: "lead_capture" },
      { label: "IDX Integration", next: "lead_capture" },
      { label: "Not Sure Yet", next: "lead_capture" },
    ],
  },

  ads_1: {
    message: "Are you currently running ads?",
    options: [
      { label: "Yes", next: "ads_2" },
      { label: "No", next: "ads_2" },
    ],
  },

  ads_2: {
    message: "What type of leads are you trying to generate?",
    options: [
      { label: "Buyer Leads", next: "lead_capture" },
      { label: "Seller Leads", next: "lead_capture" },
      { label: "Both Buyer & Seller Leads", next: "lead_capture" },
    ],
  },

  crm_1: {
    message: "Are you using a CRM right now?",
    options: [
      { label: "Yes", next: "crm_2" },
      { label: "No", next: "crm_2" },
    ],
  },

  crm_2: {
    message: "What do you need the most help with?",
    options: [
      { label: "Lead Tracking", next: "lead_capture" },
      { label: "Follow-Up Automation", next: "lead_capture" },
      { label: "All-in-One Setup", next: "lead_capture" },
    ],
  },

  pricing_1: {
    message: "Which service are you interested in pricing for?",
    options: [
      { label: "Social Media Marketing", next: "lead_capture" },
      { label: "Website / IDX", next: "lead_capture" },
      { label: "Ads / Lead Generation", next: "lead_capture" },
      { label: "CRM / Automation", next: "lead_capture" },
    ],
  },

  lead_capture: {
    message:
      "Great — we’ve got what we need! Drop your info below and someone from My Broker Search will reach out shortly!",
    form: true,
  },
}