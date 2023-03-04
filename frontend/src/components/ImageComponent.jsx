import React from 'react';
import image from '../static/aws_logo.png'; 

const ImageComponent = () => {
  const imageStyle = {
    width: '150px', 
    height: '150px', 
    display: 'block',
    margin: '0 auto', 
  };

  return (
    <div>
      <h1>Login</h1>
      <img src={image}  style={imageStyle} />
    </div>
  );
}

export default ImageComponent;