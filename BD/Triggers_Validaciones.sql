-- TRIGGERS

# TRIGGER PARA VALIDAR LA INSERCION DE USUARIOS CON SUS VALIDACIONES
DROP trigger IF EXISTS validate_insert_create_user;
DELIMITER $$
create trigger validate_insert_create_user before insert on Usuarios
for each row 
begin
DECLARE v_cant_user_repeat integer;
# BUSCA SI EXISTE EL CURSO EN LA TABLA DE curso
SELECT count(*) INTO v_cant_user_repeat FROM Usuarios WHERE LOWER(usuario) = LOWER(NEW.usuario);
if v_cant_user_repeat > 0 THEN 
    SIGNAL SQLSTATE VALUE '99999'
    SET MESSAGE_TEXT = 'El usuario que intenta ingresar ya existe en base de datos';
END IF;
	INSERT INTO Proceso(descripcion,tipo) values('Se inserto un registro en la tabla Usuarios','INSERT');
end$$
DELIMITER ;


# TRIGGER PARA VALIDAR LA INSERCION DE USUARIOS CON SUS VALIDACIONES
DROP trigger IF EXISTS validate_insert_modify_user;
DELIMITER $$
create trigger validate_insert_modify_user before UPDATE on Usuarios
for each row 
begin
DECLARE v_cant_user_repeat integer;
# BUSCA SI EXISTE EL CURSO EN LA TABLA DE curso
SELECT count(*) INTO v_cant_user_repeat FROM Usuarios WHERE LOWER(usuario) = LOWER(NEW.usuario);
if v_cant_user_repeat > 0 THEN 
    SIGNAL SQLSTATE VALUE '99999'
    SET MESSAGE_TEXT = 'El usuario que intenta ingresar ya existe en base de datos';
END IF;
	INSERT INTO Proceso(descripcion,tipo) values('Se inserto un registro en la tabla Usuarios','INSERT');
end$$
DELIMITER ;