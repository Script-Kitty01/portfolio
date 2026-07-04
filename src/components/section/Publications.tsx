import { useDarkMode } from "../../contexts/DarkModeContext";
import { useThemeColors } from "../../hooks/useThemeColors";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BookOpen, Code2, Network } from "lucide-react";

const Publications = () => {
  const { isDarkMode } = useDarkMode();
  const themeColors = useThemeColors();

  const publications = [
    {
      title: "Decentralized P2P Cloud Storage using the Kademlia DHT Protocol",
      venue:
        "International Journal of Science and Engineering Technologies (IJSET)",
      year: "2025",
      note: "Extended version submitted for peer review via Microsoft CMT.",
    },
  ];

  const achievements = [
    {
      icon: Code2,
      title: "500+ LeetCode Problems Solved",
      description:
        "Consistent problem-solving across data structures and algorithms.",
    },
    {
      icon: Network,
      title: "Strong DSA & Networking Fundamentals",
      description:
        "Solid grounding in core computer science and systems concepts.",
    },
  ];

  return (
    <section
      id="publications"
      className="py-8 relative"
      style={{
        background:
          themeColors.background.sections?.certifications ||
          themeColors.background.gradient,
        transition: "background 0.3s ease-in-out",
      }}
    >
      <div className="container mx-auto px-6 relative" style={{ zIndex: 2 }}>
        <h2
          className="text-4xl font-bold text-center mb-8"
          style={{
            color: isDarkMode
              ? themeColors.colors.white
              : themeColors.colors.pink[500],
          }}
        >
          Publications & Achievements
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Publications */}
          <div className="space-y-4">
            {publications.map((pub, index) => (
              <Card
                key={index}
                className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95"
              >
                <CardHeader className="pb-2">
                  <div className="flex items-start gap-3">
                    <BookOpen
                      className="h-6 w-6 mt-1 flex-shrink-0"
                      style={{ color: themeColors.primary }}
                    />
                    <div>
                      <CardTitle
                        className="text-xl"
                        style={{
                          color: isDarkMode
                            ? themeColors.colors.pink[300]
                            : themeColors.colors.pink[400],
                        }}
                      >
                        {pub.title}
                      </CardTitle>
                      <p className="text-sm font-semibold text-gray-700 dark:text-gray-400 mt-1">
                        {pub.venue} · {pub.year}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <p
                    className="text-sm"
                    style={{
                      color: isDarkMode
                        ? themeColors.colors.dark[200]
                        : themeColors.colors.dark[600],
                    }}
                  >
                    {pub.note}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Achievements */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {achievements.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card
                  key={index}
                  className="border-2 border-pink-100 dark:border-gray-700 hover:border-pink-200 dark:hover:border-gray-600 transition-all duration-300 hover:shadow-lg bg-white/95 dark:bg-gray-800/95"
                >
                  <CardContent className="flex items-start gap-3 pt-6">
                    <div
                      className="p-2 rounded-full flex-shrink-0"
                      style={{
                        backgroundColor: isDarkMode
                          ? themeColors.colors.dark[800]
                          : themeColors.colors.pink[50],
                      }}
                    >
                      <Icon
                        className="h-5 w-5"
                        style={{ color: themeColors.primary }}
                      />
                    </div>
                    <div>
                      <h3
                        className="font-semibold text-base"
                        style={{
                          color: isDarkMode
                            ? themeColors.colors.pink[300]
                            : themeColors.colors.pink[500],
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        className="text-sm mt-1"
                        style={{
                          color: isDarkMode
                            ? themeColors.colors.dark[200]
                            : themeColors.colors.dark[600],
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
      {/* Bottom gradient overlay for smooth transition to next section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "60px",
          background: isDarkMode
            ? `linear-gradient(180deg, transparent 0%, ${themeColors.background.gradientEnd} 100%)`
            : `linear-gradient(180deg, transparent 0%, ${themeColors.colors.pink[25]} 100%)`,
          zIndex: 1,
        }}
      />
    </section>
  );
};

export default Publications;
