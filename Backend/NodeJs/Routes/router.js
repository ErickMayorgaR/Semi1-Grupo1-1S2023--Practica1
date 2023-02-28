const { Router } = require('express');
const router = Router();

// CONTROLLERS
const IndexController = require('../Controllers/IndexController');
const AlbumesController = require('../Controllers/AlbumesController');
const FotosController = require('../Controllers/FotosController');


// {  }
//GETS
router.get("/getUsuarios", IndexController.getUsuarios);
router.get("/getAlbum", AlbumesController.getAlbum);
router.get("/getFoto", FotosController.getFoto);
//POSTS
router.post("/crearUsuario", IndexController.CreateUsuarios);
router.post("/CreateAlbum", AlbumesController.CreateAlbum);
router.post("/CreateFoto", FotosController.CreateFoto);
//DELETES
router.delete("/deleteUsuario", IndexController.DeleteUsuarios);
router.delete("/DeleteAlbum", AlbumesController.DeleteAlbum);
router.delete("/DeleteFoto", FotosController.DeleteFoto);
//UPDATES
router.post("/updateUsuario", IndexController.UpdateUsuarios);
router.post("/UpdateAlbum", AlbumesController.UpdateAlbum);
router.post("/UpdateFoto", FotosController.UpdateFoto);

module.exports = router;