import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

export interface ShadcnTheme {
    colors: {
        background: string,
        foreground: string,
        card: string,
        cardForeground: string,
        popover: string,
        popoverForeground: string,
        primary: string,
        primaryForeground: string,
        secondary: string,
        secondaryForeground: string,
        muted: string,
        mutedForeground: string,
        accent: string,
        accentForeground: string,
        destructive: string,
        destructiveForeground: string,
        border: string,
        input: string,
    }
}

const lightThemeVariables: ShadcnTheme = {
    colors: {
        background: "rgb(255 255 255)",
        foreground: "rgb(6 8 38)",
        card: "rgb(255 255 255)",
        cardForeground: "rgb(6 8 38)",
        popover: "rgb(255 255 255)",
        popoverForeground: "rgb(6 8 38)",
        primary: "rgb(111 66 245)",
        primaryForeground: "rgb(236 239 244)",
        secondary: "rgb(244 245 247)",
        secondaryForeground: "rgb(26 30 43)",
        muted: "rgb(244 245 247)",
        mutedForeground: "rgb(111 117 135)",
        accent: "rgb(244 245 247)",
        accentForeground: "rgb(26 30 43)",
        destructive: "rgb(255 68 68)",
        destructiveForeground: "rgb(236 239 244)",
        border: "rgb(231 233 236)",
        input: "rgb(231 233 236)",
    }
}

const darkThemeVariables: ShadcnTheme = {
    colors: {
        background: "rgb(23 23 23)",
        foreground: "rgb(249 250 251)",
        card: "rgb(23 23 23)",
        cardForeground: "rgb(249 250 251)",
        popover: "rgb(3 7 18)",
        popoverForeground: "rgb(236 239 244)",
        primary: "rgb(109 40 217)",
        primaryForeground: "rgb(249 250 251)",
        secondary: "rgb(39, 39, 42)",
        secondaryForeground: "rgb(249 250 251)",
        muted: "rgb(31 41 55)",
        mutedForeground: "rgb(149 157 176)",
        accent: "rgb(31 41 55)",
        accentForeground: "rgb(249 250 251)",
        destructive: "rgb(105 29 29)",
        destructiveForeground: "rgb(249 250 251)",
        border: "rgb(31 41 55)",
        input: "rgb(31 41 55)",
    }
}

interface ThemeContextType {
    themeName: Theme;
    isDarkMode: () => boolean,
    toggleTheme: () => void;
    theme: ShadcnTheme;
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

    const selectedThemeVariables = currentTheme === "dark" ? darkThemeVariables : lightThemeVariables;

    return (
        <ThemeContext.Provider value={{
            themeName: currentTheme,
            isDarkMode: () => currentTheme === "dark",
            toggleTheme,
            theme: selectedThemeVariables,
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
