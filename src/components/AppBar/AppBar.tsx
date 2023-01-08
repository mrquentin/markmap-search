import {AppBar as BsAppBar, Box, IconButton, Toolbar, Typography, useTheme} from "@mui/material";
import {Brightness4, Brightness7} from "@mui/icons-material"
import React, {useContext} from "react";
import {ColorModeContext} from "../ToggleColorMode/ToggleColorMode";
import MarkmapSearchInput from "./Search"

export default function AppBar() {
    const theme = useTheme()
    const colorMode = useContext(ColorModeContext)

    return <Box sx={{flexGrow: 1}}>
        <BsAppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" marginRight="8px">Markmap</Typography>
                <Typography variant="subtitle2" sx={{flexGrow: 1}}>(v 1.0)</Typography>
                <IconButton size="large" onClick={colorMode.toggleColorMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7/> : <Brightness4/>}
                </IconButton>
                <MarkmapSearchInput/>
            </Toolbar>
        </BsAppBar>
    </Box>
}