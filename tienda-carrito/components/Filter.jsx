import { useFilters } from '../hooks/useFilters';
import './filters.css'
import { useState, useId } from 'react'

export function Filters() {
    const {setfilters} = useFilters();
    const [minPrice, setminPrice] = useState(0)
    const minPriceFilterId = useId();
    const categoryFilterId = useId(); 

    const handleChangeMinPrice = (event) => {
        setminPrice(event.target.value)
        setfilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }))
    }

    const handleChangeCategory = (event) => {
        setfilters(prevState => ({
            ...prevState,
            // minPrice: event.target.value,
            category: event.target.value
        }))
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor="price">Price </label>
                <input type="range" id={minPriceFilterId} min='0' max='1000' onChange={handleChangeMinPrice} />
                <span> $ {minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categorías </label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="furniture">Muebles</option>
                    <option value="fragrances">Perfumes</option>
                    <option value="groceries">Mercaderia</option>
                    <option value="beauty">Maquillaje</option>
                </select>
            </div>
        </section>
    )
}