import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useThemeColors } from "../hooks/useThemeColors";
import { socialLinks } from "../config/socialLinks";

type Command = { id: string; label: string; hint?: string; action: () => void };

const CommandPalette = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToSection = (id: string) => {
    setOpen(false);
    navigate("/");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
  };

  const commands: Command[] = [
    { id: "about", label: "Go to About", action: () => goToSection("about") },
    {
      id: "projects",
      label: "Go to Projects",
      action: () => goToSection("projects"),
    },
    {
      id: "experience",
      label: "Go to Experience",
      action: () => goToSection("experience"),
    },
    {
      id: "skills",
      label: "Go to Skills",
      action: () => goToSection("skills"),
    },
    {
      id: "publications",
      label: "Go to Publications",
      action: () => goToSection("publications"),
    },
    {
      id: "contact",
      label: "Go to Contact",
      action: () => {
        setOpen(false);
        navigate("/contact");
      },
    },
    {
      id: "theme",
      label: "Toggle dark / light mode",
      action: () => {
        toggleDarkMode();
        setOpen(false);
      },
    },
    {
      id: "github",
      label: "Open GitHub",
      hint: "external",
      action: () => {
        window.open(socialLinks.github, "_blank");
        setOpen(false);
      },
    },
    {
      id: "linkedin",
      label: "Open LinkedIn",
      hint: "external",
      action: () => {
        window.open(socialLinks.linkedin, "_blank");
        setOpen(false);
      },
    },
    {
      id: "resume",
      label: "Open Resume",
      hint: "external",
      action: () => {
        window.open("/resume.pdf", "_blank");
        setOpen(false);
      },
    },
  ];

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase()),
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  if (!open) return null;

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[active]?.action();
    }
  };

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100050,
        background: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingTop: "15vh",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "90%",
          maxWidth: 520,
          background: isDarkMode ? themeColors.colors.dark[900] : "#ffffff",
          borderRadius: 14,
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          overflow: "hidden",
          border: `1px solid ${themeColors.card.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "12px 16px",
            borderBottom: `1px solid ${themeColors.card.border}`,
          }}
        >
          <Search
            className="h-4 w-4"
            style={{ color: themeColors.text.secondary }}
          />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder="Type a command or search..."
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: themeColors.text.primary,
              fontSize: 15,
            }}
          />
          <kbd style={{ fontSize: 11, color: themeColors.text.tertiary }}>
            esc
          </kbd>
        </div>
        <ul
          style={{
            listStyle: "none",
            margin: 0,
            padding: 6,
            maxHeight: 320,
            overflowY: "auto",
          }}
        >
          {filtered.length === 0 && (
            <li
              style={{
                padding: 14,
                color: themeColors.text.tertiary,
                fontSize: 14,
              }}
            >
              No results
            </li>
          )}
          {filtered.map((c, i) => (
            <li key={c.id}>
              <button
                onClick={() => c.action()}
                onMouseEnter={() => setActive(i)}
                style={{
                  width: "100%",
                  textAlign: "left",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 12px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  background:
                    i === active
                      ? isDarkMode
                        ? themeColors.colors.dark[800]
                        : themeColors.colors.pink[50]
                      : "transparent",
                  color: themeColors.text.primary,
                  fontSize: 14,
                }}
              >
                <span>{c.label}</span>
                {c.hint && (
                  <span
                    style={{ fontSize: 11, color: themeColors.text.tertiary }}
                  >
                    {c.hint}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CommandPalette;
