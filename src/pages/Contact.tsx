import React, { useState } from "react";
import {
  Mail,
  Github,
  Linkedin,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useThemeColors } from "../hooks/useThemeColors";
import Aurora from "../components/ui/aurora";
import BackButton from "../components/BackButton";
import { socialLinks } from "../config/socialLinks";

type FormStatus = "idle" | "submitting" | "success" | "error";

const Contact = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Web3Forms access key (safe to expose on the client). Falls back to the real key
  // so the form works on the deployed site even without the env var set.
  const accessKey =
    (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY as string | undefined) ||
    "1a688ea2-8dca-48e2-8d1f-9998b5f9f41f";

  // Scroll to top when component mounts
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessKey || accessKey === "your-web3forms-access-key") {
      setStatus("error");
      setErrorMsg(
        "The contact form is not configured yet. Add your Web3Forms access key.",
      );
      return;
    }
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `New portfolio message from ${form.name}`,
          from_name: "Portfolio Contact Form",
          name: form.name,
          email: form.email,
          message: form.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again or email me directly.");
    }
  };

  const inputStyle: React.CSSProperties = {
    backgroundColor: isDarkMode
      ? themeColors.colors.dark[800]
      : themeColors.colors.white,
    border: `1px solid ${themeColors.card.border}`,
    color: themeColors.text.primary,
    borderRadius: "10px",
    padding: "0.75rem 1rem",
    width: "100%",
    outline: "none",
    fontSize: "0.95rem",
  };

  const labelStyle: React.CSSProperties = {
    color: themeColors.text.secondary,
    fontSize: "0.85rem",
    fontWeight: 600,
    marginBottom: "0.35rem",
    display: "block",
  };

  return (
    <main
      aria-label="Contact page"
      className="min-h-screen py-20 transition-colors duration-300 relative overflow-hidden"
      style={{ backgroundColor: themeColors.background.primary }}
    >
      {/* Aurora Background */}
      <div
        className="fixed inset-0 z-0"
        style={{ opacity: isDarkMode ? 1 : 0.3 }}
      >
        <Aurora
          colorStops={
            isDarkMode
              ? [
                  themeColors.primary,
                  themeColors.colors.special.aurora.dark,
                  themeColors.secondary,
                ]
              : [
                  themeColors.colors.special.aurora.light[1],
                  themeColors.colors.special.aurora.light[2],
                  themeColors.colors.special.aurora.light[3],
                ]
          }
          blend={isDarkMode ? 0.3 : 0.25}
          amplitude={isDarkMode ? 0.8 : 0.6}
          speed={0.3}
        />
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        {/* Back Button */}
        <BackButton
          to="/"
          scrollToId=""
          label="Back to Home"
          ariaLabel="Navigate back to homepage"
        />

        {/* Contact Header */}
        <header className="text-center mb-12">
          <h1
            className="text-4xl font-bold mb-4"
            style={{
              color: isDarkMode
                ? themeColors.colors.pink[300]
                : themeColors.colors.pink[600],
            }}
          >
            Let's Connect!
          </h1>
          <p className="text-lg" style={{ color: themeColors.text.secondary }}>
            Have a question or want to work together? Drop me a message below.
          </p>
        </header>

        {/* Contact Form */}
        <section className="max-w-2xl mx-auto mb-14" aria-label="Contact form">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl shadow-lg p-6 md:p-8 space-y-5"
            style={{ backgroundColor: themeColors.card.background }}
          >
            {/* Honeypot field for spam bots */}
            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            <div>
              <label htmlFor="name" style={labelStyle}>
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                style={inputStyle}
                disabled={status === "submitting"}
              />
            </div>

            <div>
              <label htmlFor="email" style={labelStyle}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                style={inputStyle}
                disabled={status === "submitting"}
              />
            </div>

            <div>
              <label htmlFor="message" style={labelStyle}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me what's on your mind..."
                style={{ ...inputStyle, resize: "vertical" }}
                disabled={status === "submitting"}
              />
            </div>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all hover:opacity-90 hover:scale-[1.02] w-full md:w-auto"
              style={{
                backgroundColor: themeColors.colors.pink[500],
                color: themeColors.colors.white,
                cursor: status === "submitting" ? "not-allowed" : "pointer",
                opacity: status === "submitting" ? 0.7 : 1,
              }}
            >
              <Send className="h-4 w-4" aria-hidden="true" />
              {status === "submitting" ? "Sending..." : "Send Message"}
            </button>

            {/* Status messages */}
            {status === "success" && (
              <div
                className="flex items-center gap-2 text-sm"
                role="status"
                style={{
                  color: isDarkMode
                    ? themeColors.colors.pink[300]
                    : themeColors.colors.pink[600],
                }}
              >
                <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                Thanks! Your message has been sent. I'll get back to you soon.
                🐱
              </div>
            )}
            {status === "error" && (
              <div
                className="flex items-center gap-2 text-sm"
                role="alert"
                style={{ color: "#dc2626" }}
              >
                <AlertCircle className="h-5 w-5" aria-hidden="true" />
                {errorMsg || "Something went wrong. Please try again."}
              </div>
            )}
          </form>
        </section>

        {/* Contact Cards */}
        <section
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto"
          aria-label="Contact methods"
        >
          {/* Email Card */}
          <article
            className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: themeColors.card.background }}
            aria-labelledby="email-heading"
          >
            <div className="flex justify-center mb-4">
              <Mail
                className="h-12 w-12"
                style={{ color: themeColors.colors.pink[500] }}
                aria-hidden="true"
              />
            </div>
            <h3
              id="email-heading"
              className="text-xl font-semibold mb-2"
              style={{ color: themeColors.text.primary }}
            >
              Email
            </h3>
            <a
              href={`mailto:${socialLinks.email}`}
              aria-label={`Send email to ${socialLinks.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink,
              }}
            >
              Send Email
            </a>
            <p
              className="text-xs mt-3"
              style={{ color: themeColors.text.tertiary }}
            >
              {socialLinks.display.email}
            </p>
          </article>

          {/* GitHub Card */}
          <article
            className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: themeColors.card.background }}
            aria-labelledby="github-heading"
          >
            <div className="flex justify-center mb-4">
              <Github
                className="h-12 w-12"
                style={{ color: themeColors.colors.pink[500] }}
                aria-hidden="true"
              />
            </div>
            <h3
              id="github-heading"
              className="text-xl font-semibold mb-2"
              style={{ color: themeColors.text.primary }}
            >
              GitHub
            </h3>
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View GitHub profile at ${socialLinks.display.github} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink,
              }}
            >
              View Profile
            </a>
            <p
              className="text-xs mt-3"
              style={{ color: themeColors.text.tertiary }}
            >
              {socialLinks.display.github}
            </p>
          </article>

          {/* LinkedIn Card */}
          <article
            className="rounded-lg shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
            style={{ backgroundColor: themeColors.card.background }}
            aria-labelledby="linkedin-heading"
          >
            <div className="flex justify-center mb-4">
              <Linkedin
                className="h-12 w-12"
                style={{ color: themeColors.colors.pink[500] }}
                aria-hidden="true"
              />
            </div>
            <h3
              id="linkedin-heading"
              className="text-xl font-semibold mb-2"
              style={{ color: themeColors.text.primary }}
            >
              LinkedIn
            </h3>
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Connect on LinkedIn at ${socialLinks.display.linkedin} (opens in new tab)`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors hover:opacity-80"
              style={{
                backgroundColor: themeColors.interactive.primary,
                color: themeColors.text.pink,
              }}
            >
              Connect
            </a>
            <p
              className="text-xs mt-3"
              style={{ color: themeColors.text.tertiary }}
            >
              {socialLinks.display.linkedin}
            </p>
          </article>
        </section>
      </div>
    </main>
  );
};

export default Contact;
