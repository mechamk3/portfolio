import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "@/components/site/ThemeProvider";

function Switch() {
  const { theme, toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>{theme}</button>;
}

beforeEach(() => { localStorage.clear(); document.documentElement.className = ""; });
afterEach(cleanup);

describe("portfolio themes", () => {
  it("defaults to dark and switches to light", async () => {
    render(<ThemeProvider><Switch /></ThemeProvider>);
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
    fireEvent.click(screen.getByRole("button", { name: "dark" }));
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(false));
    expect(localStorage.getItem("portfolio-theme")).toBe("light");
  });

  it("restores the saved light preference", async () => {
    localStorage.setItem("portfolio-theme", "light");
    render(<ThemeProvider><Switch /></ThemeProvider>);
    await waitFor(() => expect(screen.getByRole("button", { name: "light" })).toBeInTheDocument());
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });
});