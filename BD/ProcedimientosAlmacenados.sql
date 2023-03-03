-- Procedimientos Almacenados

-- CONSULTA 1 CREACION DE USUARIO
DROP PROCEDURE IF EXISTS CrearUsuario;
DELIMITER $$
CREATE PROCEDURE CrearUsuario(in v_usuario Varchar(50), in v_nombre VARCHAR (150), in v_contra VARCHAR (150), in v_foto VARCHAR (2500))
begin
	INSERT INTO Usuarios 
	(usuario, nombre, contra, foto) 
    VALUES 
    (v_usuario, v_nombre, v_contra, v_foto);
end $$


-- CONSULTA 2 CREACION DE ALBUM PARA USUARIO
DROP PROCEDURE IF EXISTS CrearAlbum;
DELIMITER $$
CREATE PROCEDURE CrearAlbum(in v_nombre_album Varchar(50), in v_id_user INTEGER)
begin
	INSERT INTO Album 
	(nombre_album, id_user) 
    VALUES 
    (v_nombre_album, v_id_user);
end $$


-- CONSULTA 3 CREACION DE FOTO EN ALBUM
DROP PROCEDURE IF EXISTS CrearFoto;
DELIMITER $$
CREATE PROCEDURE CrearFoto(in v_foto Varchar(2500), in v_id_album INTEGER)
begin
	INSERT INTO Fotos 
	(foto, id_album) 
    VALUES 
    (v_foto, v_id_album);
end $$

-- CONSULTA 4 ELIMINAR FOTO
DROP PROCEDURE IF EXISTS EliminarFoto;
DELIMITER $$
CREATE PROCEDURE EliminarFoto(in v_id_foto INTEGER)
begin
	DELETE 
    FROM Fotos
    WHERE id_foto=v_id_foto;
end $$



-- CONSULTA 5 ELIMINAR ALBUM
DROP PROCEDURE IF EXISTS EliminarAlbum;
DELIMITER $$
CREATE PROCEDURE EliminarAlbum(in v_id_album INTEGER)
begin
	DELETE 
    FROM Album
    WHERE id_album=v_id_album;
end $$


-- CONSULTA 6 ELIMINAR USUARIOS
DROP PROCEDURE IF EXISTS EliminarUsuario;
DELIMITER $$
CREATE PROCEDURE EliminarUsuario(in v_id_user INTEGER)
begin
	DELETE 
    FROM Usuarios
    WHERE id_user=v_id_user;
end $$


-- CONSULTA 7 MODIFICAR FOTO
DROP PROCEDURE IF EXISTS ModificarFoto;
DELIMITER $$
CREATE PROCEDURE ModificarFoto(in v_id_foto INTEGER, in v_foto Varchar(2500), in v_id_album INTEGER)
begin
	UPDATE Fotos 
    SET foto=v_foto, id_album = v_id_album
    WHERE id_foto=v_id_foto;
end $$


-- CONSULTA 8 MODIFICAR ALBUM
DROP PROCEDURE IF EXISTS ModificarAlbum;
DELIMITER $$
CREATE PROCEDURE ModificarAlbum(in v_id_album INTEGER, in v_nombre_album Varchar(50), in v_id_user INTEGER)
begin
	UPDATE Album 
    SET foto=v_foto, id_album = v_id_album
    WHERE id_foto=v_id_foto;
end $$

-- CONSULTA 9 MODIFICAR USUARIO
DROP PROCEDURE IF EXISTS ModificarUsuario;
DELIMITER $$
CREATE PROCEDURE ModificarUsuario(in v_id_user INTEGER, in v_usuario Varchar(50), in v_nombre Varchar(150), in v_contra Varchar(150), in v_foto Varchar(2500))
begin
	UPDATE Usuarios 
    SET usuario=v_usuario, nombre = v_nombre, contra = v_contra, foto = v_foto
    WHERE id_user=v_id_user;
end $$


-- CONSULTA 10 SELECT PARA USUARIOS
DROP PROCEDURE IF EXISTS SelectUsuarios;
DELIMITER $$
CREATE PROCEDURE SelectUsuarios()
begin
	SELECT *
    FROM Usuarios;
end $$


-- CONSULTA 11 SELECT PARA ALBUMS
DROP PROCEDURE IF EXISTS SelectAlbum;
DELIMITER $$
CREATE PROCEDURE SelectAlbum()
begin
	SELECT *
    FROM Album;
end $$

-- CONSULTA 12 SELECT PARA FOTOS
DROP PROCEDURE IF EXISTS SelectFotos;
DELIMITER $$
CREATE PROCEDURE SelectFotos()
begin
	SELECT *
    FROM Fotos;
end $$


-- CONSULTA 13 SELECT PARA USUARIOS ESPECIFICOS
DROP PROCEDURE IF EXISTS SelectUsuariosEspecifico;
DELIMITER $$
CREATE PROCEDURE SelectUsuariosEspecifico(in v_id_user INTEGER)
begin
	SELECT *
    FROM Usuarios
    WHERE id_user=v_id_user;
end $$


-- CONSULTA 14 SELECT PARA FOTOS ESPECIFICAS
DROP PROCEDURE IF EXISTS SelectFotosEspecifico;
DELIMITER $$
CREATE PROCEDURE SelectFotosEspecifico(in v_id_foto INTEGER)
begin
	SELECT *
    FROM Fotos
    WHERE id_foto=v_id_foto;
end $$

-- CONSULTA 15 SELECT PARA FOTOS RELACIONADAS A UN ALBUM ESPECIFICO
DROP PROCEDURE IF EXISTS SelectFotosAlbum;
DELIMITER $$
CREATE PROCEDURE SelectFotosAlbum(in v_id_album INTEGER)
begin
	SELECT *
    FROM Fotos
    WHERE id_album=v_id_album;
end $$

-- CONSULTA 15 SELECT PARA FOTOS RELACIONADAS A UN ALBUM ESPECIFICO
DROP PROCEDURE IF EXISTS SelectAlbumesUser;
DELIMITER $$
CREATE PROCEDURE SelectAlbumesUser(in v_id_user INTEGER)
begin
	SELECT *
    FROM Album
    WHERE id_user=v_id_user;
end $$
