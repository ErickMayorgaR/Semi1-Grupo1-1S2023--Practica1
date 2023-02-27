use Semi1_G1;


CREATE TABLE Proceso 
    (
     id_proceso BIGINT NOT NULL AUTO_INCREMENT, 
     descripcion VARCHAR (150) , 
     tipo VARCHAR (20) , 
     CONSTRAINT Proceso_PK PRIMARY KEY CLUSTERED (id_proceso)
    );

CREATE TABLE Album 
    (
     id_album INTEGER NOT NULL AUTO_INCREMENT , 
     nombre_album VARCHAR (50) , 
     id_user INTEGER NOT NULL ,
     CONSTRAINT Album_PK PRIMARY KEY CLUSTERED (id_album)
    );


CREATE TABLE Fotos 
    (
     id_foto INTEGER NOT NULL AUTO_INCREMENT , 
     foto VARCHAR (2500) , 
     id_album INTEGER NOT NULL ,
     CONSTRAINT Fotos_PK PRIMARY KEY CLUSTERED (id_foto)
    );

CREATE TABLE Usuarios 
    (
     id_user INTEGER NOT NULL AUTO_INCREMENT , 
     usuario VARCHAR (50) , 
     nombre VARCHAR (150) , 
     contra VARCHAR (150) , 
     foto VARCHAR (2500) ,
     CONSTRAINT Usuarios_PK PRIMARY KEY CLUSTERED (id_user)
    );


ALTER TABLE Album 
    ADD CONSTRAINT Album_Usuarios_FK FOREIGN KEY 
    ( 
     id_user
    ) 
    REFERENCES Usuarios 
    ( 
     id_user 
    ) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE ;

ALTER TABLE Fotos 
    ADD CONSTRAINT Fotos_Album_FK FOREIGN KEY 
    ( 
     id_album
    ) 
    REFERENCES Album 
    ( 
     id_album 
    ) 
    ON DELETE CASCADE 
    ON UPDATE CASCADE ;



-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                             3
-- CREATE INDEX                             0
-- ALTER TABLE                              5
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           0
-- ALTER TRIGGER                            0
-- CREATE DATABASE                          0
-- CREATE DEFAULT                           0
-- CREATE INDEX ON VIEW                     0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE ROLE                              0
-- CREATE RULE                              0
-- CREATE SCHEMA                            0
-- CREATE SEQUENCE                          0
-- CREATE PARTITION FUNCTION                0
-- CREATE PARTITION SCHEME                  0
-- 
-- DROP DATABASE                            0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
