import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ThemeProvider, useTheme } from "@/components/site/ThemeProvider";

function Switch() {
  const { theme, toggleTheme, accent, setAccent } = useTheme();
  return (
    <>
      <button onClick={toggleTheme}>{theme}</button>
      <button onClick={() => setAccent("teal")}>{accent}</button>
    </>
  );
}

beforeEach(() => {
  localStorage.clear();
  document.documentElement.className = "";
  document.documentElement.removeAttribute("data-accent");
});
afterEach(cleanup);

describe("portfolio themes", () => {
  it("defaults to light and blue, and switches to dark", async () => {
    render(<ThemeProvider><Switch /></ThemeProvider>);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
    expect(screen.getByRole("button", { name: "blue" })).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "light" }));
    await waitFor(() => expect(document.documentElement.classList.contains("dark")).toBe(true));
    expect(localStorage.getItem("portfolio-theme")).toBe("dark");
  });

  it("restores the saved dark preference", async () => {
    localStorage.setItem("portfolio-theme", "dark");
    render(<ThemeProvider><Switch /></ThemeProvider>);
    await waitFor(() => expect(screen.getByRole("button", { name: "dark" })).toBeInTheDocument());
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("applies and saves a chosen accent immediately", () => {
    render(<ThemeProvider><Switch /></ThemeProvider>);
    fireEvent.click(screen.getByRole("button", { name: "blue" }));
    expect(document.documentElement.getAttribute("data-accent")).toBe("teal");
    expect(localStorage.getItem("portfolio-accent")).toBe("teal");
  });

  it("does not store anything until the visitor chooses", () => {
    render(<ThemeProvider><Switch /></ThemeProvider>);
    expect(localStorage.getItem("portfolio-theme")).toBeNull();
    expect(localStorage.getItem("portfolio-accent")).toBeNull();
  });
});
