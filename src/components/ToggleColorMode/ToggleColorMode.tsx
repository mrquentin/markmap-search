import React, {useMemo, useState} from "react";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import App from "../App/App";

export const ColorModeContext = React.createContext({
    toggleColorMode: () => {
    }
})

export default function ToggleColorMode() {
    const [mode, setMode] = useState<'light' | 'dark'>('dark')
    const colorMode = useMemo(() => ({toggleColorMode: () => setMode((prevMode) => prevMode === 'light' ? 'dark' : 'light')}), [])
    const theme = useMemo(() => createTheme({palette: {mode}}), [mode])

    return <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <App/>
        </ThemeProvider>
    </ColorModeContext.Provider>
}