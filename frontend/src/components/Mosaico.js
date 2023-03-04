import React from 'react'
import Carta from './Cartas' 
import "./css/ArchivosAmigos.css"

function Mosaico(props) {
    console.log(props)
    return (
            <div className="ui segment mosaico container" id="contenedorCartas">
            <div className="ui four column link cards row" >
                {props.archivosAmigo.map((c, index) => (   
                    <Carta 
                        fecha={c.FechaModificacion}
                        idArchivo={c.idArchivo}
                        nombreArchivo ={c.NombreArchivo}
                        propietario={c.usuario}
                        imagen={c.URL}
                    /> 

                ))}
            </div>
        </div>
        
    )
}

export default Mosaico