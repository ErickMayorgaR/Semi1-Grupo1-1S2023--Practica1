import React, { useState, useEffect } from 'react';
import './EditAlbum.css';

const EditarAlbumes = () => {
  const valor = localStorage.getItem('DataUser');
  const UserInLIne = JSON.parse(valor);

  const [nameAlbum, setAlbum] = useState('');
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ id: '', value: '' });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleSelectChange = (event) => {
    const selectedId = event.target.options[event.target.selectedIndex].getAttribute('id_album');
    const selectedValue = event.target.value;
    setSelectedOption({ id: selectedId, value: selectedValue });
    console.log(selectedId)
    console.log(selectedValue)
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://54.172.138.74:5000/api/getAlbum', {
        method: 'GET',
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
      });

      const json = await response.json();
      const filteredData = json.filter((album) => album.id_user === UserInLIne.id);
      setData(filteredData);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const cancel = () => {
    window.location.href = "http://localhost:3000/PaginaPrincipal"
  }

  const fetchUpdate = async () => {
    const UpAlbum = {
      id_album: selectedOption.id,
      id_user: UserInLIne.id,
      nombre_album: nameAlbum,
    };
    try {
      const response = await fetch('http://54.172.138.74:5000/api/UpdateAlbum', {
        method: 'POST',
        body: JSON.stringify(UpAlbum),
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
      });

      const json = await response.json();
      console.log(json);
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Error:', error);
      alert('Error: Hubo un error inesperado, intentelo denuevo.');
    }
  }

  const fetchDelete = async () => {
    const IdAlbum = {
      id_album: selectedOption.id
    };
    try {
      const response = await fetch('http://54.172.138.74:5000/api/DeleteAlbum', {
        method: 'DELETE',
        body: JSON.stringify(IdAlbum),
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
      });

      const json = await response.json();
      console.log(json);
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Error:', error);
      alert('Error: Hubo un error inesperado, intentelo denuevo.');
    }
  };

  const nameAlbumPerson = data.map((album) => (
    <option key={album.id_album} id_album={album.id_album}>
      {album.nombre_album}
    </option>
  ));

  const handleAddAlbum = async () => {
    const Album = {
      id_user: UserInLIne.id,
      nombre_album: nameAlbum,
    };

    try {
      const response = await fetch('http://54.172.138.74:5000/api/CreateAlbum', {
        method: 'POST',
        body: JSON.stringify(Album),
        headers: { 'Content-type': 'application/json;charset=UTF-8' },
      });

      const json = await response.json();
      console.log(json);
      window.location.href = window.location.href;
    } catch (error) {
      console.error('Error:', error);
      alert('Error: Hubo un error inesperado, intentelo denuevo.');
    }
  };

  return (
    <div className="containera">
      <form className="formClass" onSubmit={handleSubmit}>
        <h1>Editar Album</h1>
        <br></br>
        <div className="info">
          <input type="text" value={nameAlbum} placeholder="Ingrese el nombre del album" onChange={(event) => setAlbum(event.target.value)} />
        </div>
        <div className="container2">
          <img className="preview-container" src={UserInLIne.foto} alt="Descripción de la imagen"></img>
        </div>
        <br></br>
        <div className="container-button">
          <button>Ver Fotos</button>
        </div>
        <div className="agregar">
          <button onClick={handleAddAlbum}>Agregar</button>
        </div>
        <div className="mostrar">
          <button onClick={fetchDelete}>Eliminar Album</button>
        </div>
        <div className="modificar">
          <button onClick={fetchUpdate}>Modificar</button>
        </div>
        <div className="cancelar">
          <button onClick={cancel}>Cancelar</button>
      </div>
      </form>
      <div className='box'>
      <select id="product-names" value={selectedOption.value} onChange={handleSelectChange}>
        {nameAlbumPerson}
      </select>
      </div>
    </div>
  );
}



export default EditarAlbumes;