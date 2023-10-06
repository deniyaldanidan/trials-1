import { createContext, ReactNode, useState, useContext, useEffect } from 'react';


const DarkLightContext = createContext<{
    theme: theme,
    setTheme: voidFN<theme>
}>({
    theme: "dark",
    setTheme: () => null
});

export const DarkLightThemeProvider = ({ children }: { children: ReactNode }) => {
    const [themeState, setThemeState] = useState<theme>("dark")

    useEffect(() => {
        if (typeof window !== "undefined" && window?.matchMedia("(prefers-color-scheme: dark)").matches) {
            setThemeState("dark")
        } else {
            setThemeState("light")
        }
    }, []);

    function setTheme(theme: theme) {
        setThemeState(theme)
    }


    return (
        <DarkLightContext.Provider value={{ theme: themeState, setTheme }}>
            {children}
        </DarkLightContext.Provider>
    )
}

export default function useDarkLightTheme() {
    return useContext(DarkLightContext);
}