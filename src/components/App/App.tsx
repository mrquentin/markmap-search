import {Box} from "@mui/material";
import AppBar from "../AppBar/AppBar";
import SearchDataContextProvider from "../AppBar/SearchDataContext";
import MarkmapViewer from "../MarkmapView/MarkmapViewer";

export default function App() {
    return <SearchDataContextProvider>
        <Box>
            <AppBar/>
            <Box>
                <MarkmapViewer filePath="/data/markmap.md"/>
            </Box>
        </Box>
    </SearchDataContextProvider>

}