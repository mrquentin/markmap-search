import {createContext, Dispatch, ReactNode, SetStateAction, useState} from "react";

type SearchDataContextType = {
    value: string,
    setValue: Dispatch<SetStateAction<string>>
}

export const SearchDataContext = createContext<SearchDataContextType>({
    value: '', setValue: () => {
    }
})

export default function SearchDataContextProvider({children}: { children: ReactNode }) {
    const [value, setValue] = useState<string>('')

    return <SearchDataContext.Provider value={{value, setValue}}>
        {children}
    </SearchDataContext.Provider>
}