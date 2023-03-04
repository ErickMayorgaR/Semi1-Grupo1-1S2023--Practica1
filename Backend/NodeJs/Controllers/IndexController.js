const { application, response } = require('express');
const bucket = require('../Bucket/bucket');
const pool = require('../exec');
var SHA256 = require("crypto-js/sha256");
const { v4: uuidv4 } = require('uuid');
const albumes =  require('./AlbumesController')


//GESTIONES PARA USUARIOS

async function getUsuarios(req, res){
    try{
      const params = []
      const respuesta = await pool.execute_sp('SelectUsuarios', params)
      return res.status(200).json(respuesta.result[0]);
    }catch(e){
      return res.status(400).json({ e });
    }
}

async function CreateUsuarios(req, res){
  try{
    if(req.body.contra === req.body.contra2){
      req.body.contra = SHA256(req.body.contra).toString();
      const uuid = uuidv4().toString();
      let ruta = "https://bucket-albumes-semi1practica1g1.s3.amazonaws.com/Fotos_Perfil/" + uuid
      bucket.uploadFile(1,uuid,req.body.foto)
  
      //Mandar a base de datos la data procesada
      const params = [req.body.usuario,req.body.nombre, req.body.contra, ruta]
      await pool.execute_sp('CrearUsuario',params)
      return res.status(200).json({ mensaje: "Usuario ingresado exitosamente."});
    }else{
      return res.status(400).json({ mensaje: "Las contraseñas no coinciden." });
    }
  }catch(e){
    console.log(e)
    return res.status(400).json({ e });
  }
}

async function DeleteUsuarios(req, res){
  try{
    //AQUI RECUPERA LA DATA DEL USUARIO QUE SE QUIERE ELIMINAR PARA ELIMINAR LA FOTO DE LA RUTA DEL S3
    const params = [req.body.id_user]
    let respuesta = await pool.execute_sp('SelectUsuariosEspecifico',params)
    let rutasuid = respuesta.result[0][0].foto.split("/");
    let uidant = rutasuid[(rutasuid.length)-1]
    //AQUI SE MANDA A ELIMINAR LA IMAGEN DEL USUARIO
    bucket.DeleteFile(1, uidant)
    //Aqui mandar e hacer el proceso de eliminacion  de albumnes y fotos del  usuario
    let respuesta2 = await pool.execute_sp('SelectAlbumesUser',params)
    console.log(respuesta2.result[0])
    for(let i =0;i<respuesta2.result[0].length;i++){
      albumes.ElimnarMuchosAlbumnes(respuesta2.result[0][i].id_album)
    }
    //Ingreso  de eliminacion de base de datos de usuario
    await pool.execute_sp('EliminarUsuario',params)
    return res.status(200).json({ mensaje: "Usuario eliminado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function UpdateUsuarios(req, res){
  try{
    //Eliminar foto anterior
    const params2 = [req.body.id_user]
    const respuesta = await pool.execute_sp('SelectUsuariosEspecifico',params2)
    let rutasuid = respuesta.foto.split("/");
    let uidant = rutasuid[(rutasuid.length)-1]
    bucket.updateFile(1,uidant, req.body.foto)
    //Cambiar Foto
    req.body.contra = SHA256(req.body.contra).toString();
    
    bucket.uploadFile(1,uidant,req.body.foto)
    
    const params = [req.body.id_user, req.body.usuario,req.body.nombre, req.body.contra, respuesta.foto]
    await pool.execute_sp('ModificarUsuario',params)
    return res.status(200).json({ mensaje: "Usuario modificado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}





module.exports = {
  getUsuarios,
  CreateUsuarios,
  DeleteUsuarios,
  UpdateUsuarios
};

