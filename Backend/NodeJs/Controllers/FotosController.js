const { application, response } = require('express');
const pool = require('../exec');
const { v4: uuidv4 } = require('uuid');
const bucket = require('../Bucket/bucket');


//GESTIONES PARA FOTOS

async function getFoto(req, res){
    try{
      const params = []
      const respuesta = await pool.execute_sp('SelectFotos', params)
      return res.status(200).json(respuesta.result[0]);
    }catch(e){
      return res.status(400).json({ e });
    }
}

async function CreateFoto(req, res){
  try{
    const uuid = uuidv4().toString();
    bucket.uploadFile(2,uuid,req.body.foto)
    let ruta = "https://bucket-albumes-semi1practica1g1.s3.amazonaws.com/Fotos_Publicadas/" + uuid
    const params = [ruta,req.body.id_album]
    await pool.execute_sp('CrearFoto',params)
    return res.status(200).json({ mensaje: "Foto ingresado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function DeleteFoto(req, res){
  try{
    //Recuperacion de foto a eliminar
    const params = [req.body.id_foto]
    let respuesta = await pool.execute_sp('SelectFotosEspecifico',params)
    let rutasuid = respuesta.result[0][0].foto.split("/");
    let uidant = rutasuid[(rutasuid.length)-1]
    console.log(uidant)
    //AQUI SE MANDA A ELIMINAR LA IMAGEN DEL USUARIO
    bucket.DeleteFile(2, uidant)
    //Eliminar registro de la base de datos
    await pool.execute_sp('EliminarFoto',params)
    return res.status(200).json({ mensaje: "Foto eliminado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function ElimnarMuchasFotos(id_foto){
  try{
    //Recuperacion de foto a eliminar
    const params = [id_foto]
    let respuesta = await pool.execute_sp('SelectFotosEspecifico',params)
    let rutasuid = respuesta.result[0][0].foto.split("/");
    let uidant = rutasuid[(rutasuid.length)-1]
    //AQUI SE MANDA A ELIMINAR LA IMAGEN DEL USUARIO
    bucket.DeleteFile(2, uidant)
    //Eliminar registro de la base de datos
    await pool.execute_sp('EliminarFoto',params)
  }catch(e){
    console.log("Se produjo un error en Eliminar Muchas Fotos")
  }
}

async function UpdateFoto(req, res){
  try{
    //Eliminar foto anterior
    const params2 = [req.body.id_foto]
    const respuesta = await pool.execute_sp('SelectFotosEspecifico',params2)
    let rutasuid = respuesta.result[0][0].foto.split("/");
    let uidant = rutasuid[(rutasuid.length)-1]
    //Cambiar Foto    
    bucket.updateFile(2,uidant,req.body.foto)
  
    const params = [req.body.id_foto, respuesta.foto,req.body.id_album]
    await pool.execute_sp('ModificarFoto',params)
    return res.status(200).json({ mensaje: "Foto modificada exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}





module.exports = {
  getFoto,
  CreateFoto,
  DeleteFoto,
  UpdateFoto,
  ElimnarMuchasFotos
};

