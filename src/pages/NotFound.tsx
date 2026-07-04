import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useThemeColors } from "../hooks/useThemeColors";
import { socialLinks } from "../config/socialLinks";
import catImg from "../assets/cats/cat.png";

type LineType = "input" | "output" | "success" | "error";
type Line = { text: string; type: LineType };

const HELP: string[] = [
  "available commands:",
  "  help              show this list",
  "  whoami            a bit about me",
  "  ls                what lives here",
  "  sudo hire aamira  ??? (go on, try it)",
  "  home              back to safety",
];

const NotFound = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();
  const [lines, setLines] = useState<Line[]>([
    {
      text: "You've wandered off the map — 404: page not found.",
      type: "output",
    },
    {
      text: "But you did find the secret terminal. Type 'help' to look around.",
      type: "output",
    },
  ]);
  const [value, setValue] = useState("");
  const [hired, setHired] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    const out: Line[] = [{ text: `visitor@aamira:~$ ${raw}`, type: "input" }];
    if (!cmd) {
      setLines((p) => [...p, ...out]);
      return;
    }
    if (cmd === "help") {
      out.push(...HELP.map((t) => ({ text: t, type: "output" as LineType })));
    } else if (cmd === "whoami") {
      out.push({
        text: "Aamira — CS student, cloud engineer, pixel-cat enthusiast.",
        type: "output",
      });
    } else if (cmd === "ls") {
      out.push({
        text: "projects/  experience/  skills/  publications/  secret_cat.png",
        type: "output",
      });
    } else if (cmd === "sudo hire aamira") {
      out.push({
        text: "✓ access granted — excellent choice. 🐱🎉",
        type: "success",
      });
      out.push({ text: "Here are the quick links you need:", type: "output" });
      setHired(true);
    } else if (cmd === "home") {
      window.location.href = "/";
      return;
    } else {
      out.push({
        text: `command not found: ${cmd}  (try 'help')`,
        type: "error",
      });
    }
    setLines((p) => [...p, ...out]);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    run(value);
    setValue("");
  };

  const lineColor = (type: LineType) => {
    switch (type) {
      case "input":
        return "#f8b6c8";
      case "success":
        return "#6ee7a8";
      case "error":
        return "#ff8a8a";
      default:
        return "#d7d7e0";
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20"
      style={{ backgroundColor: themeColors.background.primary }}
    >
      <img
        src={catImg}
        alt="A lost pixel cat"
        className="w-28 h-28 object-contain mb-4"
        style={{ imageRendering: "pixelated" }}
        width="112"
        height="112"
      />
      <h1
        className="text-6xl font-bold mb-1"
        style={{
          color: isDarkMode
            ? themeColors.colors.pink[300]
            : themeColors.colors.pink[500],
        }}
      >
        404
      </h1>
      <p
        className="mb-6 text-center"
        style={{ color: themeColors.text.secondary }}
      >
        This page ran away. But the cat knows a shortcut.
      </p>

      {/* Fake terminal */}
      <div
        className="w-full max-w-xl rounded-xl overflow-hidden shadow-2xl"
        style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        onClick={() => inputRef.current?.focus()}
      >
        <div
          className="flex items-center gap-2 px-4 py-2"
          style={{ backgroundColor: "#2a2a35" }}
        >
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ff5f56",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#ffbd2e",
              display: "inline-block",
            }}
          />
          <span
            style={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              background: "#27c93f",
              display: "inline-block",
            }}
          />
          <span className="ml-2 text-xs" style={{ color: "#9b9ba6" }}>
            aamira — zsh
          </span>
        </div>
        <div
          className="p-4 font-mono text-sm"
          style={{
            backgroundColor: "#1a1a22",
            minHeight: 220,
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          {lines.map((l, i) => (
            <div
              key={i}
              style={{
                color: lineColor(l.type),
                whiteSpace: "pre-wrap",
                lineHeight: 1.6,
              }}
            >
              {l.text}
            </div>
          ))}

          {hired && (
            <div className="flex flex-wrap gap-2 my-2">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded text-xs"
                style={{
                  background: themeColors.colors.pink[500],
                  color: "#fff",
                }}
              >
                Resume
              </a>
              <a
                href={socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded text-xs"
                style={{
                  background: themeColors.colors.pink[500],
                  color: "#fff",
                }}
              >
                LinkedIn
              </a>
              <a
                href={socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 rounded text-xs"
                style={{
                  background: themeColors.colors.pink[500],
                  color: "#fff",
                }}
              >
                GitHub
              </a>
            </div>
          )}

          <form onSubmit={onSubmit} className="flex items-center gap-2 mt-1">
            <span style={{ color: "#f8b6c8" }}>visitor@aamira:~$</span>
            <input
              ref={inputRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="flex-1 bg-transparent outline-none font-mono text-sm"
              style={{ color: "#f5f5f5", caretColor: "#f8b6c8" }}
              spellCheck={false}
              autoComplete="off"
              aria-label="Terminal command input"
            />
          </form>
          <div ref={endRef} />
        </div>
      </div>

      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:scale-105"
        style={{ backgroundColor: themeColors.colors.pink[500], color: "#fff" }}
      >
        ← Take me home
      </Link>
    </main>
  );
};

export default NotFound;
