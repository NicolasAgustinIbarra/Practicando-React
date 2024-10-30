import './footer.css'

export default function Footer({filters}) {
  return (
    <footer className='footer'>
        {
            JSON.stringify(filters, null, 2)
        }
        
        {/* <h4>Prueba técnica de React * - 
        <span>@NicoIba</span>
        </h4>
        <h5>
            Shopping cart white useContext & useReducer
        </h5> */}

    </footer>
  )
}
