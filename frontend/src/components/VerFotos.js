import React, { useState } from "react";
import "./VerFotos.css";
function VerFotos() {
    const [photos, setPhotos] = useState([
        {
          id: 1,
          url: "https://picsum.photos/id/1015/600/400",
          description: "Foto 1"
        },
        {
          id: 2,
          url: "https://picsum.photos/id/1016/600/400",
          description: "Foto 2"
        },
        {
          id: 3,
          url: "https://picsum.photos/id/1018/600/400",
          description: "Foto 3"
        }
      ]);
      const [currentIndex, setCurrentIndex] = useState(0);
    
      const handleNextClick = () => {
        if (currentIndex === photos.length - 1) {
          setCurrentIndex(0);
        } else {
          setCurrentIndex(currentIndex + 1);
        }
      };
    
      const handlePrevClick = () => {
        if (currentIndex === 0) {
          setCurrentIndex(photos.length - 1);
        } else {
          setCurrentIndex(currentIndex - 1);
        }
      };
    
      return (
        <div className="album">
          <h1>Álbum de Fotos</h1>
          <div>
            <Photo
              url={photos[currentIndex].url}
              description={photos[currentIndex].description}
              onNextClick={handleNextClick}
              onPrevClick={handlePrevClick}
            />
          </div>
        </div>
      );
    }
    
    function Photo(props) {
      return (
        <div className="photo">
          <img src={props.url} alt={props.description} />
          <p>{props.description}</p>
          <button className="button-container" onClick={props.onPrevClick}>Anterior</button>
          <button className="button-container2" onClick={props.onNextClick}>Siguiente</button>
        </div>
      );
    }

export default VerFotos;