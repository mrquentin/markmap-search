import {alpha, IconButton, InputBase, styled} from "@mui/material";
import {Clear, Search as SearchIcon} from "@mui/icons-material";
import React, {ChangeEvent, useContext} from "react";
import {SearchDataContext} from "./SearchDataContext";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function MarkmapSearchInput() {
    const searchContext = useContext(SearchDataContext)

    const onClearInput = () => searchContext.setValue("")
    const onInputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => searchContext.setValue(event.target.value)

    return <Search>
        <SearchIconWrapper><SearchIcon/></SearchIconWrapper>
        <StyledInputBase placeholder="Search ..." value={searchContext.value} onChange={onInputChangeHandler}
                         endAdornment={<IconButton sx={{visibility: searchContext.value ? "visible" : "hidden"}}
                                                   onClick={onClearInput}><Clear/></IconButton>}/>
    </Search>
}