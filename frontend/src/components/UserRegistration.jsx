import React, { useState } from 'react';
import './UserRegistration.css';
import Usuario from './Usuario';
const RegisterForm = () => {
  const [username, setUserName] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [confirmpassword, confirmsetPassword] = useState('');
  const [image, setImage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const Login = () => {
    window.location.href = "http://localhost:3000/"
  }

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
  const registrar = () => {
    if (password == confirmpassword)  {
      var Foto= image.split(",")
      var nombre = name;
      var usuario = username;
      var contra = password;
      var foto = Foto[1];
      var contra2 = confirmpassword;
      var Usuario = {
        usuario,
        nombre,
        contra,
        contra2,
        foto
    }
      fetch("http://54.172.138.74:5000/api/crearUsuario", {
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
          alert("El usuario " + username + " fue registrado con exito.")
        }else{
            alert("Error: Hubo un error inesperado, intentelo denuevo.")
        }
    })
      
    }else{
      alert("Las contaseñas no coinciden, revise e intentelo denuevo.")
    }
  };

  return (
    <div className="container">
    <form onSubmit={handleSubmit}>
      <Usuario />
      <div>
        <input type="text" value={name} placeholder="Ingrese su nombre completo" onChange={(event) => setName(event.target.value)} />
      </div>
      <div>
        <input type="text" value={username} placeholder="Ingrese un username" onChange={(event) => setUserName(event.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Ingrese una contraseña" value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <div>
        <input type="password" placeholder="Ingrese la confirmacion de su contraseña" value={confirmpassword} onChange={(event) => confirmsetPassword(event.target.value)} />
      </div>
      <button onClick={registrar} type="submit">Registrarse</button>
      <input   type="file" className="container22"  accept="image/png, .jpeg, .jpg" onChange={handleImageUpload} />
        {photoPreview && (
          <div className="preview-container">
          <figure> 
          <img src={photoPreview}  className="preview-image" />
          <h3 className="preview-description">Foto de perfil</h3>
          </figure>
          </div>
        )}
        <p>¿Ya tienes una cuenta? <button onClick={Login}>Inicia Sesion</button></p>
    </form>
    </div>
  );
}

export default RegisterForm;