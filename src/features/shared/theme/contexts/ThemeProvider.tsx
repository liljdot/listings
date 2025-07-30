import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
// @ts-expect-error import from js file
import { getItem, setItem } from "@/lib/utils/localStorage";

const typedGetItem = getItem as <T>(key: string) => T | undefined
const typedSetItem = setItem as <T>(key: string, value: T) => void

interface ThemeContext {
    theme: "light" | "dark" | "system"
    setTheme: (newTheme: "light" | "dark" | "system") => void
}

interface Props {
    children: ReactNode
    defaultTheme?: "light" | "dark"
    storageKey?: string
}

const themeContext = createContext<ThemeContext | undefined>(undefined)

export const useThemeContext = (): ThemeContext => {
    const context = useContext(themeContext)

    if (!context) {
        throw new Error("useThemeContext must be used within a ThemeProvider")
    }

    return context
}

const ThemeProvider: React.FC<Props> = ({
    children,
    defaultTheme = "dark",
    storageKey = "listings-theme"
}) => {
    const [theme, setTheme] = useState<"light" | "dark" | "system">(typedGetItem<"light" | "dark" | "system">(storageKey) || defaultTheme)
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light"

    useEffect(() => {
        const root = window.document.documentElement

        root.classList.remove("light", "dark")

        const newTheme = theme === "system"
            ? systemTheme
            : theme

        root.classList.add(newTheme)

        if (!typedGetItem(storageKey)) {
            typedSetItem(storageKey, newTheme)
        }
    }, [theme, systemTheme, storageKey])

    const setAppTheme = (newTheme: "light" | "dark" | "system") => {
        if (newTheme === "system") {
            typedSetItem(storageKey, systemTheme)
            setTheme(systemTheme)
            return
        }

        typedSetItem(storageKey, newTheme)
        setTheme(newTheme)
    }

    return (
        <themeContext.Provider value={{ theme, setTheme: setAppTheme }}>
            {children}
        </themeContext.Provider>
    )
}

export default ThemeProvider;