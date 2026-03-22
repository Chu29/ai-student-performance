"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const isDark = isClient && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-8 w-8 items-center justify-center rounded-md border transition-all duration-150"
      style={{
        borderColor: "var(--border)",
        color: "var(--text-secondary)",
        backgroundColor: "transparent",
      }}
      onMouseEnter={(event) => {
        event.currentTarget.style.borderColor = "var(--border-hover)";
        event.currentTarget.style.color = "var(--text-primary)";
      }}
      onMouseLeave={(event) => {
        event.currentTarget.style.borderColor = "var(--border)";
        event.currentTarget.style.color = "var(--text-secondary)";
      }}
    >
      <span className="relative h-4 w-4">
        <Sun
          size={16}
          className={`absolute inset-0 transition-opacity duration-150 ${
            isDark ? "opacity-0" : "opacity-100"
          }`}
        />
        <Moon
          size={16}
          className={`absolute inset-0 transition-opacity duration-150 ${
            isDark ? "opacity-100" : "opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

export default ThemeToggle;
