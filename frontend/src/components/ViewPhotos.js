import React, { useState, useEffect } from "react";
import "./ViewPhotos.css";
let listado_imagenes = []
function ViewPhotos() {
  const valor = localStorage.getItem('DataUser');
  const UserInLIne = JSON.parse(valor);
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState({ id: '', value: '' });

  const nameAlbumPerson = data.map((album) => (
    <option key={album.id_album} id_album={album.id_album}>
      {album.nombre_album}
    </option>
  ));

  const handleSelectChange = (event) => {
    const selectedId = event.target.options[event.target.selectedIndex].getAttribute('id_album');
    const selectedValue = event.target.value;
    setSelectedOption({ id: selectedId, value: selectedValue });
    listado_imagenes = []
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

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch(`http://54.172.138.74:5000/api/getFoto`);
        const data = await response.json();
        for (var i = 0; i < data .length; i++) {
          if(data[i].id_album == selectedOption.id){
            listado_imagenes.push(data[i].foto)
            
            //console.log(data[i].foto)
          }
          }
          console.log(listado_imagenes)
          setImages(listado_imagenes);
        //const tempImages = data.map((item) => item.foto);
        //console.log(tempImages)
        //setImages(tempImages);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    if (selectedOption.id) {
      fetchImages();
    }
  }, [selectedOption]);

  function goToNextImage() {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  }

  function goToPreviousImage() {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  }

  return (
    <div className="container">
      {images.length > 0 ? (
        <img className="collection-images" src={images[currentIndex]} alt="Gallery" />
      ) : (
        <p>No hay imágenes disponibles</p>
      )}
      <button className="anterior" onClick={goToPreviousImage}>Previous</button>
      <button className="siguiente" onClick={goToNextImage}>Next</button>
      <div className='box2'>
        <h3>Selecciona el album:</h3>
        <select id="product-names" value={selectedOption.value} onChange={handleSelectChange}>
          {nameAlbumPerson}
        </select>
      </div>
    </div>
  );
}

export default ViewPhotos;