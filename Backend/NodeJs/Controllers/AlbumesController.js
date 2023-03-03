const { application, response } = require('express');
const pool = require('../exec');
const fotos = require('./FotosController');


//GESTIONES PARA ALBUMES

async function getAlbum(req, res){
    try{
      const params = []
      const respuesta = await pool.execute_sp('SelectAlbum', params)
      return res.status(200).json(respuesta.result[0]);
    }catch(e){
      return res.status(400).json({ e });
    }
}

async function CreateAlbum(req, res){
  try{
    const params = [req.body.nombre_album,req.body.id_user]
    await pool.execute_sp('CrearAlbum',params)
    return res.status(200).json({ mensaje: "Album ingresado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function DeleteAlbum(req, res){
  try{
    //Recuperacion  de  fotos relacionadas con el album
    const params = [req.body.id_album]
    let respuesta = await pool.execute_sp('SelectFotosAlbum',params)
    console.log(respuesta.result[0])
    for(let i =0;i<respuesta.result[0].length;i++){
      fotos.ElimnarMuchasFotos(respuesta.result[0][i].id_foto)
    }
    //Eliminacion de base de datos de album
    await pool.execute_sp('EliminarAlbum',params)
    return res.status(200).json({ mensaje: "Album eliminado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function ElimnarMuchosAlbumnes(id_album){
  try{
    const params = [id_album]
    let respuesta = await pool.execute_sp('SelectFotosAlbum',params)
    console.log(respuesta.result[0])
    for(let i =0;i<respuesta.result[0].length;i++){
      fotos.ElimnarMuchasFotos(respuesta.result[0][i].id_foto)
    }
    //Eliminacion de base de datos de album
    await pool.execute_sp('EliminarAlbum',params)
  }catch(e){
    console.log("Se produjo un error en Eliminar Muchos Albumes")
  }
}

async function UpdateAlbum(req, res){
  try{
    const params = [req.body.id_album, req.body.nombre_album,req.body.id_user]
    await pool.execute_sp('ModificarAlbum',params)
    return res.status(200).json({ mensaje: "Album modificado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}





module.exports = {
  getAlbum,
  CreateAlbum,
  DeleteAlbum,
  UpdateAlbum,
  ElimnarMuchosAlbumnes
};

