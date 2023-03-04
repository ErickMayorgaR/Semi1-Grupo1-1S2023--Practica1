import React, { useState } from 'react';
import './UserRegistration.css';
const EditProfile = () => {
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [image, setImage] = useState("");
  const [identificador, setidentificador] = useState("");
  const valor = localStorage.getItem('DataUser');
  const UserInLIne = JSON.parse(valor)
  
  const handleSubmit = (event) => {
    event.preventDefault();
  };

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

  const UpdateData = () => {
    console.log(image)
      var Foto= image.split(",")
      var id_user = UserInLIne.id;
      var nombre = name.toString();
      var usuario = username.toString();
      var contra = password.toString();
      var foto = Foto[1].toString();
      var Usuario = {
        id_user,
        usuario,
        nombre,
        contra,
        foto
    }
      fetch("http://54.172.138.74:5000/api/updateUsuario", {
        method:"POST",
        body: JSON.stringify(Usuario),
        headers: {"Content-type": "application/json;charset=UTF-8"}
    })
    .then(res => res.json())
    .catch(err =>{
        console.log('Error:',err);
    })
    .then(response => {
        if (response){
          console.log(response)
        }else{
            alert("Error: Hubo un error inesperado, intentelo denuevo.")
        }
    })
  };


  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <h2>Editar Perfil</h2>
      <div>
        <input type="text" value={name} placeholder="Ingrese su nombre completo" onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <input type="text" value={username} placeholder="Ingrese un username" onChange={(event) => setUserName(event.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Ingrese una contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <button onClick={UpdateData} type="submit">Editar</button>
      <input   type="file" className="container2"  accept="image/png, .jpeg, .jpg" onChange={handleImageUpload} />
        {photoPreview && (
          <div className="preview-container">
          <figure> 
          <img src={photoPreview}  className="preview-image" />
          <h3 className="preview-description">Foto de perfil</h3>
          </figure>
          </div>
        )}
    </form>
    </div>
  );
}

export default EditProfile;