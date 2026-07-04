// Social Links Configuration
// Reads from environment variables, with safe fallbacks so the links always
// work even if the VITE_* env vars aren't set on the host (e.g. Vercel).

const GITHUB_URL =
  import.meta.env.VITE_GITHUB_URL || "https://github.com/Script-Kitty01";
const LINKEDIN_URL =
  import.meta.env.VITE_LINKEDIN_URL ||
  "https://www.linkedin.com/in/aamira-bushra/";
const EMAIL = import.meta.env.VITE_EMAIL || "bushraaamira06@gmail.com";

export const socialLinks = {
  // Main social profiles
  github: GITHUB_URL,
  linkedin: LINKEDIN_URL,
  email: EMAIL,

  // GitHub repository URLs
  repositories: {
    projectOne:
      import.meta.env.VITE_GITHUB_PROJECT1_URL ||
      "https://github.com/Script-Kitty01",
    projectTwo:
      import.meta.env.VITE_GITHUB_PROJECT2_URL ||
      "https://github.com/Script-Kitty01",
    projectThree:
      import.meta.env.VITE_GITHUB_PROJECT3_URL ||
      "https://github.com/Script-Kitty01/Decen",
    projectFour:
      import.meta.env.VITE_GITHUB_PROJECT4_URL ||
      "https://github.com/Script-Kitty01/CryptoTrade",
  },

  // Formatted display names (extracted from the URLs)
  display: {
    github: GITHUB_URL.replace("https://", ""),
    linkedin: LINKEDIN_URL.replace("https://", ""),
    email: EMAIL,
  },
};

export default socialLinks;
