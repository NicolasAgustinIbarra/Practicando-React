import { useState, useEffect, useRef } from "react"
function useSearch() {
    const [search, setsearch] = useState('')
    const [error, seterror] = useState(null)
    const isFirstInput = useRef(true);

    useEffect(() => {
        if(isFirstInput.current){
            isFirstInput.current = search === ''
            return
        }

        if (search === '') {
            seterror('No se puede buscar una pelicula vacia')
            return
        }

        if (search.match(/^\d+$/)) {
            seterror('No se puede buscar una pelicula con numero')
            return
        }

        if (search.length < 3) {
            seterror('La busqueda debe tener al menos 3 caracteres')
            return
        }

        seterror(null)

    }, [search])


    return (
        {search, setsearch, error}
    )
}

export default useSearch