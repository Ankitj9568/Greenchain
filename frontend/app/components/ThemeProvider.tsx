"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeCtx {
    theme: Theme;
    resolved: "light" | "dark";
    setTheme: (t: Theme) => void;
    cycle: () => void;
}

const Ctx = createContext<ThemeCtx>({
    theme: "system",
    resolved: "dark",
    setTheme: () => { },
    cycle: () => { },
});

export const useTheme = () => useContext(Ctx);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<Theme>("system");
    const [resolved, setResolved] = useState<"light" | "dark">("dark");
    const [mounted, setMounted] = useState(false);

    /* Read stored preference on mount */
    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
        const stored = localStorage.getItem("gc-theme") as Theme | null;
        if (stored && ["light", "dark", "system"].includes(stored)) {
            setThemeState(stored);
        }
    }, []);

    /* Apply theme class to <html> */
    useEffect(() => {
        if (!mounted) return;

        const apply = () => {
            let res: "light" | "dark";
            if (theme === "system") {
                res = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
            } else {
                res = theme;
            }
            document.documentElement.classList.remove("light", "dark");
            document.documentElement.classList.add(res);
            setResolved(res);
        };

        apply();
        localStorage.setItem("gc-theme", theme);

        if (theme === "system") {
            const mq = window.matchMedia("(prefers-color-scheme: dark)");
            const handler = () => apply();
            mq.addEventListener("change", handler);
            return () => mq.removeEventListener("change", handler);
        }
    }, [theme, mounted]);

    const setTheme = (t: Theme) => setThemeState(t);
    const cycle = () => {
        setThemeState((prev) =>
            prev === "system" ? "light" : prev === "light" ? "dark" : "system"
        );
    };

    /* Prevent flash: render nothing until mounted */
    if (!mounted) {
        return <div style={{ visibility: "hidden" }}>{children}</div>;
    }

    return (
        <Ctx.Provider value={{ theme, resolved, setTheme, cycle }}>
            {children}
        </Ctx.Provider>
    );
}
