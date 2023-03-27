import { Theme, useTheme } from "~/utils/themeProvider";

export default function ModeToggle() {
  const [theme, setTheme] = useTheme();
  return (
    <button
      onClick={() =>
        setTheme((prevTheme) =>
          prevTheme === Theme.DARK ? Theme.LIGHT : Theme.DARK
        )
      }
      type="button"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
