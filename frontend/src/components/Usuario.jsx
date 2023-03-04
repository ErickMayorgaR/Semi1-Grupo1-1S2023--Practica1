import React from 'react';
import image from '../static/usuario.png'; 

const Usuario = () => {
  const imageStyle = {
    width: '150px', 
    height: '150px',
    display: 'block',
    margin: '0 auto', 
  };

  return (
    <div>
      <h1>Registro de Usuario</h1>
      <img src={image}  style={imageStyle} />
    </div>
  );
}

export default Usuario;