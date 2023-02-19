import { useState } from "react";

export default function ModeToggle() {
  const [currentTheme, setCurrentTheme] = useState(localStorage.theme);
  // On page load or when changing themes, best to add inline in `head` to avoid FOUC
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  function toggle() {
    if (localStorage.theme === "dark") {
      // Whenever the user explicitly chooses light mode
      localStorage.theme = "light";
      document.documentElement.classList.add("dark");
      setCurrentTheme("light");
    } else {
      // Whenever the user explicitly chooses dark mode
      localStorage.theme = "dark";
      document.documentElement.classList.remove("dark");
      setCurrentTheme("dark");
    }
  }
  return (
    <button onClick={toggle} type="button">
      {currentTheme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
