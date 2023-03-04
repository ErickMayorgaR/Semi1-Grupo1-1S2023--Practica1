import React, { useState, useEffect } from 'react';
import './UploadImage.css'
const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedOption, setSelectedOption] = useState({ id: '', value: '' });
  const valor = localStorage.getItem('DataUser');
  const UserInLIne = JSON.parse(valor);
  const [data, setData] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [image, setImage] = useState("");


/////

const nameAlbumPerson = data.map((album) => (
    <option key={album.id_album} id_album={album.id_album}>
      {album.nombre_album}
    </option>
  ));
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

  const UploadPhoto = async() => {
    var Foto= image.split(",")
    const Photo = {
        foto: Foto[1],
        id_album: selectedOption.id,
      };
  
      try {
        const response = await fetch('http://54.172.138.74:5000/api/CreateFoto', {
          method: 'POST',
          body: JSON.stringify(Photo),
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
////
const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      setImage(reader.result);
      image = reader.result.toString()
    });
    reader.readAsDataURL(file);
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  return (
    <div className='conta'>
      <h1>Subir Imagen</h1>
      <form onSubmit={handleSubmit}>
      <input   type="file"  accept="image/png, .jpeg, .jpg" onChange={handleImageUpload} />
        {photoPreview && (
          <div >
          <figure> 
          <img src={photoPreview}  className='image-upload' />
          </figure>
          </div>
        )}
        <h3>Seleccione el album al cual pertenecera la foto:</h3>
        <select id="product-names" value={selectedOption.value} onChange={handleSelectChange}>
        {nameAlbumPerson}
      </select>
        <button type="submit" onClick={UploadPhoto}>Subir</button>
      </form>
    </div>
  );
};

export default UploadImage;