import { useEffect, useState } from "react";
import { useThemeColors } from "../hooks/useThemeColors";

// Slim progress bar pinned to the top of the viewport that fills as the page scrolls.
const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const themeColors = useThemeColors();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;
          const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setProgress(Math.min(100, Math.max(0, pct)));
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "3px",
        width: `${progress}%`,
        zIndex: 100000,
        background: `linear-gradient(90deg, ${themeColors.colors.pink[400]}, ${themeColors.colors.pink[600]})`,
        boxShadow: `0 0 8px ${themeColors.colors.pink[400]}`,
        transition: "width 0.1s ease-out",
        pointerEvents: "none",
      }}
    />
  );
};

export default ScrollProgress;
