const { application, response } = require('express');
const pool = require('../exec');


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
    const params = [req.body.usuario,req.body.nombre, req.body.contra, req.body.foto]
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
    const params = [req.body.id_user, req.body.usuario,req.body.nombre, req.body.contra, req.body.foto]
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

