const { application, response } = require('express');
const bucket = require('../Bucket/bucket');
const pool = require('../exec');
var SHA256 = require("crypto-js/sha256");
const { v4: uuidv4 } = require('uuid');


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
    req.body.contra = SHA256(req.body.contra).toString();
    const uuid = uuidv4().toString();
    let ruta = "https://bucket-albumes-semi1practica1g1.s3.amazonaws.com/Fotos_Perfil/" + uuid
    bucket.uploadFile(1,uuid,req.body.foto)

    //Mandar a base de datos la data procesada
    const params = [req.body.usuario,req.body.nombre, req.body.contra, ruta]
    await pool.execute_sp('CrearUsuario',params)
    return res.status(200).json({ mensaje: "Usuario ingresado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function DeleteUsuarios(req, res){
  try{
    const params = [req.body.id_user]
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

