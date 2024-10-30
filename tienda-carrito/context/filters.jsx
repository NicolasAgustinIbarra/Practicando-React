import { createContext, useState } from "react";

export const FiltersContexts = createContext()

export function FiltersProvider({ children }) {
    const [filters, setfilters] = useState({
        category: 'all',
        minPrice: 0
    })

    return (
        <FiltersContexts.Provider value={{
          filters,
          setfilters
        }}>
            {children}
        </FiltersContexts.Provider>
    )
}