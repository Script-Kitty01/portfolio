import { useEffect, useState, useCallback } from "react";

// Classic Konami code: up up down down left right left right B A
const SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

type Cat = {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
};

const KonamiEasterEgg = () => {
  const [showToast, setShowToast] = useState(false);
  const [cats, setCats] = useState<Cat[]>([]);

  const trigger = useCallback(() => {
    const newCats: Cat[] = Array.from({ length: 28 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 0.8,
      duration: 3 + Math.random() * 2,
      size: 20 + Math.random() * 26,
    }));
    setCats(newCats);
    setShowToast(true);
    window.setTimeout(() => {
      setCats([]);
      setShowToast(false);
    }, 6000);
  }, []);

  useEffect(() => {
    let index = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === SEQUENCE[index]) {
        index++;
        if (index === SEQUENCE.length) {
          index = 0;
          trigger();
        }
      } else {
        // allow restart if the mismatched key is actually the first in the sequence
        index = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [trigger]);

  return (
    <>
      {cats.map((c) => (
        <span
          key={c.id}
          aria-hidden="true"
          style={{
            position: "fixed",
            top: "-48px",
            left: `${c.left}%`,
            fontSize: `${c.size}px`,
            zIndex: 100001,
            pointerEvents: "none",
            animation: `konami-fall ${c.duration}s linear ${c.delay}s forwards`,
          }}
        >
          🐱
        </span>
      ))}
      {showToast && (
        <div
          role="status"
          style={{
            position: "fixed",
            bottom: "24px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 100002,
            background: "rgba(0, 0, 0, 0.85)",
            color: "#fff",
            padding: "12px 20px",
            borderRadius: "12px",
            fontSize: "15px",
            fontWeight: 600,
            boxShadow: "0 8px 24px rgba(0, 0, 0, 0.3)",
            animation: "konami-pop 0.4s ease-out",
            whiteSpace: "nowrap",
          }}
        >
          🏆 Achievement unlocked: Found the secret cat! 🐱
        </div>
      )}
    </>
  );
};

export default KonamiEasterEgg;
