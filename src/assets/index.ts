// Main assets module - consolidates common assets
import aboutMeJournalPng from "./journal.PNG";
import aboutMeJournalWebp800 from "./journal.PNG";
import aboutMeJournalWebp400 from "./journal.PNG";
// Profile / journal carousel images
import profile1 from "./cats/cat.png";
import profile2 from "./cats/frog.png";
import profile3 from "./cats/strawberry.png";
import comingSoon from "./coming_soon.png";
import dividerPng from "./divider.PNG";
import dividerWebp from "./divider-original.webp";
import divider from "./divider-original.webp";

// For backward compatibility
const aboutMeJournal = aboutMeJournalPng;

// Re-export all asset modules
export * from "./stars";
export * from "./stickers";
export * from "./project_icons";
export * from "./techstack";

// Export main assets
export const mainAssets = {
  aboutMeJournal,
  aboutMeJournalPng,
  aboutMeJournalWebp800,
  aboutMeJournalWebp400,
  profile1,
  profile2,
  profile3,
  comingSoon,
  divider,
  dividerPng,
  dividerWebp,
};

export {
  aboutMeJournal,
  aboutMeJournalPng,
  aboutMeJournalWebp800,
  aboutMeJournalWebp400,
  profile1,
  profile2,
  profile3,
  comingSoon,
  divider,
  dividerPng,
  dividerWebp,
};

export default {
  mainAssets,
};
