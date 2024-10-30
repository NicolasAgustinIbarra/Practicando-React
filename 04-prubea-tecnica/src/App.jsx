import { useState, useEffect } from 'react';
import './App.css';

const URL_PALABRA = 'https://catfact.ninja/fact';
const URL_IMG_BASE = 'https://cataas.com';

function App() {
  const [fact, setFact] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // New state for loading

  useEffect(() => {
    const fetchCatFact = async () => {
      try {
        const response = await fetch(URL_PALABRA);
        const data = await response.json();
        setFact(data.fact);
      } catch (error) {
        console.error('Error fetching cat fact:', error);
      }
    };
    fetchCatFact();
  }, []);

  useEffect(() => {
    if (!fact) return;

    const palabra = fact.split(' ')[0];
    console.log(palabra);

    const getImage = async () => {
      setIsLoading(true); // Set loading state to true
      try {
        const rawResponse = await fetch(`${URL_IMG_BASE}/cat/says/${palabra}`);
        const response = await rawResponse.json();
        if (!response.ok) {
          throw new Error(`Error fetching image: status ${response.status}`);
        }
        setImage(response.url); // Set image URL on successful fetch
      } catch (error) {
        console.error('Error fetching cat image:', error);
      } finally {
        setIsLoading(false); // Set loading state to false regardless of success or failure
      }
    };

    getImage();
  }, [fact]);

  return (
    <>
      <main>
        <div>
          {fact ? fact : 'Cargando...'}
        </div>
        <div>
          {isLoading ? (
            <p>Cargando imagen...</p> // Display loading message while fetching
          ) : (
            image && <img src={image} alt={`Imagen de gatitos relacionada a la frase: ${fact}`} />
          )}
        </div>
      </main>
    </>
  );
}

export default App;