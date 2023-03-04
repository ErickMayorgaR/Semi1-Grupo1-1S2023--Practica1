import React, { useState } from 'react';
import './Principal.css';

const PaginaPrincipal = () => {
  const valor = localStorage.getItem('DataUser');
  const UserInLIne = JSON.parse(valor);

  const LogOut = () => {
    localStorage.clear();
    window.location.href = "http://localhost:3000/";
  };

  const editProfile = () => {
    window.location.href = "http://localhost:3000/EditProfile";
  };

  const editAlbum = () => {
    window.location.href = "http://localhost:3000/EditarAlbumes";
  };

  const uploadImage= () => {
    window.location.href = "http://localhost:3000/UploadImage";
  };


  const viwePhoto= () => {
    window.location.href = "http://localhost:3000/ViewPhotos";
  };

  return (
    <div className="containera">
      <h1>Home</h1>
      <div className='preview-description'>
        <h2>Welcome to the PhotoBucket {UserInLIne.usuario}!</h2>
      </div>
      <br></br>
      <div className='preview-description4'>
        <h3>{UserInLIne.nombre}</h3>
      </div>
      <div className='container2'>
        <img className='preview-container' src={UserInLIne.foto} alt="Descripción de la imagen"></img>
      </div>
      <br></br>
      <div className='container-button'>
        <button onClick={viwePhoto}>Ver Fotos</button>
      </div>
      <div className='container-button-editProfile'>
        <button onClick={editProfile}>Editar Perfil</button>
      </div>
      <div className='container-button-upload'>
        <button onClick={uploadImage}>Subir Foto</button>
      </div>
      <div className='container-button-editAlbum'>
        <button onClick={editAlbum}>Editar Albumes</button>
      </div>
      <div className='container-button-logout'>
        <button onClick={LogOut}>Cerrar Sesion</button>
      </div>
    </div>
  );
};

export default PaginaPrincipal;