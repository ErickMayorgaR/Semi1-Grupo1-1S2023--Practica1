import React from 'react' 
import "./css/ArchivosAmigos.css"
import { Button } from 'semantic-ui-react'
 
function Cartas(props) { 
     

    var datos = localStorage.getItem('usuarioLinea')
    var usuario = JSON.parse(datos) 

    function getFileExtension3(filename) {
        return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
    }
    var extension = getFileExtension3(props.nombreArchivo) 

    var url = props.imagen

    if(extension === "pdf"){
        url = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/PDF_file_icon.svg/1667px-PDF_file_icon.svg.png"
    }else if(extension === "jpg" || extension === "png" || extension === "jpeg" || extension === "gif"){
        url = props.imagen
    }else{
        url = "https://www.vichaunter.org/wp-content/uploads/2013/07/como-cambiar-extension-archivo-windows-10-sin-programas-1280x720.jpg"
    }

    var visibilidad = props.visibilidad;
    if(visibilidad === 0){
        visibilidad = "Publico" 
    }else{
        visibilidad = "Privado" 

    }

    function redireccionar(){
        window.open(props.imagen, '_blank')
    }


    return (
        <div className="column carta" id="CartaMostrada">
            <div className="ui card" >
                <div className="image">
                    <img src={url} data-original={url} height="200px" alt="debería de estar la foto"/>
                </div>
                <div className="content">
                    <div className="header">Nombre: {props.nombreArchivo}</div>
                    <div className="meta"> 
                        <a href="!#">Última modificación: {props.fecha}</a> 
                        <br/>
                        <a href="!#">Propietario: {props.propietario}</a> 

                    </div> 
                    <Button inverted color='green' onClick={redireccionar}>
                        Ver Archivo
                    </Button>  


                </div> 
            </div>
        </div>
    )
}

//<div className="header">Fecha: {props.fecha}</div>
//<div className="header">Propietario: {usuario[0].usuario}</div> 

export default Cartas
