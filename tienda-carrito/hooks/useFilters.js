import { useContext } from "react"
import { FiltersContexts } from "../context/filters"

export function useFilters () {
      const {filters, setfilters} = useContext(FiltersContexts)
  
    const filterProducts = (products) => {
      return products.filter(product => {
        return (
          product.price >= filters.minPrice && (filters.category == 'all' || product.category == filters.category)
        )
      })
    }
  
    return {filterProducts, setfilters, filters}
  }
  