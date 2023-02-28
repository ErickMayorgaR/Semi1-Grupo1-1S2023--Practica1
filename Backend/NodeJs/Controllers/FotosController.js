const { application, response } = require('express');
const pool = require('../exec');


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
    const params = [req.body.foto,req.body.id_album]
    await pool.execute_sp('CrearFoto',params)
    return res.status(200).json({ mensaje: "Foto ingresado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function DeleteFoto(req, res){
  try{
    const params = [req.body.id_foto]
    await pool.execute_sp('EliminarFoto',params)
    return res.status(200).json({ mensaje: "Foto eliminado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}

async function UpdateFoto(req, res){
  try{
    const params = [req.body.id_foto, req.body.foto,req.body.id_album]
    await pool.execute_sp('ModificarFoto',params)
    return res.status(200).json({ mensaje: "Foto modificado exitosamente."});
  }catch(e){
    return res.status(200).json({ e });
  }
}





module.exports = {
  getFoto,
  CreateFoto,
  DeleteFoto,
  UpdateFoto
};

