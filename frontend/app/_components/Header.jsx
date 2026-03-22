import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <header
      className="sticky top-0 z-50 h-16 border-b backdrop-blur-md"
      style={{
        backgroundColor:
          "color-mix(in srgb, var(--background) 95%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      <div className="mx-auto flex h-full w-full max-w-300 items-center justify-between px-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <div
            aria-hidden="true"
            className="h-4 w-4 rounded-sm"
            style={{
              background:
                "linear-gradient(135deg, var(--accent), var(--text-primary))",
            }}
          />

          <p
            className="truncate text-sm font-semibold leading-none"
            style={{ color: "var(--text-primary)" }}
          >
            Student Performance Dashboard
          </p>
        </div>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
