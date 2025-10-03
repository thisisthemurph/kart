import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface ColorScheme {
    bg: string;
    surface: string;
    text: string;
    textMuted: string;
    border: string;
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    shadow: string;
    gradients: {
        background: [string, string];
        surface: [string, string];
        primary: [string, string];
        success: [string, string];
        warning: [string, string];
        danger: [string, string];
        muted: [string, string];
        empty: [string, string];
    };
    backgrounds: {
        input: string;
        editInput: string;
        disabled: string;
    };
    statusBarStyle: "light-content" | "dark-content";
}

const lightColors: ColorScheme = {
    bg: "#f8fafc",
    surface: "#ffffff",
    text: "#1e293b",
    textMuted: "#b1b4b9ff",
    border: "#e2e8f0",
    primary: "#3b82f6",
    secondary: "#ec8effff",
    success: "#10b981",
    warning: "#f59e0b",
    danger: "#ef4444",
    shadow: "#000000",
    gradients: {
        background: ["#f8fafc", "#e2e8f0"],
        surface: ["#ffffff", "#f8fafc"],
        primary: ["#3b82f6", "#1d4ed8"],
        success: ["#10b981", "#059669"],
        warning: ["#f59e0b", "#d97706"],
        danger: ["#ef4444", "#dc2626"],
        muted: ["#9ca3af", "#6b7280"],
        empty: ["#f3f4f6", "#e5e7eb"],
    },
    backgrounds: {
        input: "#ffffff",
        editInput: "#ffffff",
        disabled: "#eaeaea",

    },
    statusBarStyle: "dark-content" as const,
};

const darkColors: ColorScheme = {
    bg: "#0f172a",
    surface: "#1e293b",
    text: "#f1f5f9",
    textMuted: "#94a3b8",
    border: "#334155",
    primary: "#60a5fa",
    secondary: "#e4b5ffff",
    success: "#34d399",
    warning: "#fbbf24",
    danger: "#f87171",
    shadow: "#000000",
    gradients: {
        background: ["#0f172a", "#1e293b"],
        surface: ["#1e293b", "#334155"],
        primary: ["#3b82f6", "#1d4ed8"],
        success: ["#10b981", "#059669"],
        warning: ["#f59e0b", "#d97706"],
        danger: ["#ef4444", "#dc2626"],
        muted: ["#374151", "#4b5563"],
        empty: ["#374151", "#4b5563"],
    },
    backgrounds: {
        input: "#1e293b",
        disabled: "#eaeaea",
        editInput: "#0f172a",
    },
    statusBarStyle: "light-content" as const,
};

interface ThemeContextType {
    theme: Theme;
    isDarkMode: () => boolean,
    toggleTheme: () => void;
    colors: ColorScheme;
}

const ThemeContext = createContext<undefined | ThemeContextType>(undefined);

export type Theme = "dark" | "light";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [currentTheme, setCurrentTheme] = useState<Theme>("light");

    useEffect(() => {
        // get the user's choice
        AsyncStorage.getItem("theme").then((value) => {
            if (value) {
                setCurrentTheme(JSON.parse(value));
            }
        });
    }, []);

    const toggleTheme = async () => {
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        setCurrentTheme(newTheme);
        await AsyncStorage.setItem("darkMode", JSON.stringify(newTheme));
    };

    const colors = currentTheme === "dark" ? darkColors : lightColors;

    return (
        <ThemeContext.Provider value={{
            theme: currentTheme,
            isDarkMode: () => currentTheme === "dark",
            toggleTheme,
            colors,
        }}>
            {children}
        </ThemeContext.Provider>
    );
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
};

export default useTheme;
