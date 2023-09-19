import React, { useState } from 'react';
import axios from 'axios';
import './app.css'
function Formulario() {
  const [titulos, setTitulos] = useState(['']);
  const [urls, setUrls] = useState(['']);
  const [urlValida, setUrlValida] = useState([true]);

  const validarURL = (inputUrl) => {
    const regex = /^(http|https):\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
    return regex.test(inputUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let datosValidos = true;

    // Validar que todos los campos estén llenos y las URLs sean válidas
    titulos.forEach(async (titulo, index) => {
      if (titulo === '' || urls[index] === '' || !validarURL(urls[index])) {
        datosValidos = false;
        setUrlValida((prevUrlValida) => {
          const newUrlValida = [...prevUrlValida];
          newUrlValida[index] = !validarURL(urls[index]);
          return newUrlValida;
        });
      } else {
        try {
          // Enviar los datos al backend
          await axios.post('/api/usuarios/usuarios', {
            titulo,
            url: urls[index],
          });
        } catch (error) {
          console.error('Error al enviar los datos al servidor', error);
        }
      }
    });

    if (!datosValidos) {
      return;
    }

    // Limpiar los campos
    setTitulos(['']);
    setUrls(['']);
    setUrlValida([true]);
  };

  const handleTituloChange = (value, index) => {
    setTitulos((prevTitulos) => {
      const newTitulos = [...prevTitulos];
      newTitulos[index] = value;
      return newTitulos;
    });
  };

  const handleUrlChange = (value, index) => {
    setUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls[index] = value;
      return newUrls;
    });
  };

  const handleEliminarCampo = (index) => {
    setTitulos((prevTitulos) => {
      const newTitulos = [...prevTitulos];
      newTitulos.splice(index, 1);
      return newTitulos;
    });

    setUrls((prevUrls) => {
      const newUrls = [...prevUrls];
      newUrls.splice(index, 1);
      return newUrls;
    });

    setUrlValida((prevUrlValida) => {
      const newUrlValida = [...prevUrlValida];
      newUrlValida.splice(index, 1);
      return newUrlValida;
    });
  };

  const handleAgregarMas = () => {
    // Agregar campos adicionales
    setTitulos((prevTitulos) => [...prevTitulos, '']);
    setUrls((prevUrls) => [...prevUrls, '']);
    setUrlValida((prevUrlValida) => [...prevUrlValida, true]);
  };

  return (
    <div>
      <h1>Formulario de Título y URL</h1>
      <form onSubmit={handleSubmit}>
        {titulos.map((titulo, index) => (
          <div key={index}>
            <label htmlFor={`titulo-${index}`}>Título:</label>
            <input
              type="text"
              id={`titulo-${index}`}
              name={`titulo-${index}`}
              value={titulo}
              onChange={(e) => handleTituloChange(e.target.value, index)}
            />

            <label htmlFor={`url-${index}`}>URL:</label>
            <input
              type="text"
              id={`url-${index}`}
              name={`url-${index}`}
              value={urls[index]}
              onChange={(e) => handleUrlChange(e.target.value, index)}
              style={!urlValida[index] ? { border: '1px solid red' } : {}}
            />
            {!urlValida[index] && (
              <p style={{ color: 'red' }}>La URL ingresada no es válida.</p>
            )}

            {index !== 0 && (
              <button type="button" onClick={() => handleEliminarCampo(index)}>
                Eliminar
              </button>
            )}
          </div>
        ))}

        <div>
          <button type="submit">Enviar</button>
        </div>
      </form>

      <button onClick={handleAgregarMas}>Agregar más</button>
    </div>
  );
}

export default Formulario;
