package controllers

import (
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/google/uuid"
)

// GETS
func GetUsuarios(w http.ResponseWriter, r *http.Request) {
	var params []string
	respuesta, err := Execute_sp("SelectUsuarios", params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, usuario := range respuesta {
		for key, value := range usuario {
			switch value.(type) {
			case []byte:
				usuario[key] = string(value.([]byte))
			}
		}
	}

	jsonRespuesta, err := json.MarshalIndent(respuesta, "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonRespuesta)

}

func GetAlbum(w http.ResponseWriter, r *http.Request) {
	var params []string
	respuesta, err := Execute_sp("SelectAlbum", params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, usuario := range respuesta {
		for key, value := range usuario {
			switch value.(type) {
			case []byte:
				usuario[key] = string(value.([]byte))
			}
		}
	}

	jsonRespuesta, err := json.MarshalIndent(respuesta, "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonRespuesta)
}

func GetFoto(w http.ResponseWriter, r *http.Request) {
	var params []string
	respuesta, err := Execute_sp("SelectFotos", params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	for _, usuario := range respuesta {
		for key, value := range usuario {
			switch value.(type) {
			case []byte:
				usuario[key] = string(value.([]byte))
			}
		}
	}

	jsonRespuesta, err := json.MarshalIndent(respuesta, "", " ")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(jsonRespuesta)
}

//POSTS -----------------------------------------------

func CreateUsuarios(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var data map[string]string
	err := decoder.Decode(&data)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if data["contra"] != data["contra2"] {
		http.Error(w, "Las contraseñas no coinciden.", http.StatusBadRequest)
		return
	}

	password := data["contra"]
	hash := sha256.Sum256([]byte(password))
	passwordHash := hex.EncodeToString(hash[:])

	uuid, err := uuid.NewUUID()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	filePath := "https:\\\\bucket-albumes-semi1practica1g1.s3.amazonaws.com/Fotos_Perfil/" + uuid.String()

	// Subir archivo usando S3 o servicio similar aquí
	UploadFile(1, uuid.String(), data["foto"])

	// Mandar a base de datos la data procesada
	_, err = Execute_sp("CrearUsuario", []string{data["usuario"], data["nombre"], passwordHash, filePath})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Respuesta exitosa
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"mensaje":"Usuario ingresado exitosamente."}`))
}

func CreateAlbum(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var data map[string]string
	err1 := decoder.Decode(&data)

	if err1 != nil {
		http.Error(w, err1.Error(), http.StatusBadRequest)
		return
	}

	var params []string
	params = append(params, data["nombre_album"])
	params = append(params, data["id_user"])

	_, err := Execute_sp("CrearAlbum", params)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"mensaje": "Album ingresado exitosamente."}`))
}

func CreateFoto(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var data map[string]string
	err1 := decoder.Decode(&data)

	if err1 != nil {
		http.Error(w, err1.Error(), http.StatusBadRequest)
		return
	}

	uuid, err := uuid.NewUUID()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	filePath := "https:\\\\bucket-albumes-semi1practica1g1.s3.amazonaws.com/Fotos_Publicadas/" + uuid.String()
	// Subir archivo usando S3 o servicio similar aquí
	UploadFile(2, uuid.String(), data["foto"])

	// Mandar a base de datos la data procesada
	_, err = Execute_sp("CrearFoto", []string{filePath, data["id_album"]})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Respuesta exitosa
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"mensaje":"Foto ingresado exitosamente."}`))
}

//DELETE-------------------------------------

func DeleteUsuario(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var data map[string]string
	err1 := decoder.Decode(&data)

	if err1 != nil {
		http.Error(w, err1.Error(), http.StatusBadRequest)
		return
	}

	// AQUI RECUPERA LA DATA DEL USUARIO QUE SE QUIERE ELIMINAR PARA ELIMINAR LA FOTO DE LA RUTA DEL S3
	respuesta, err := Execute_sp("SelectUsuariosEspecifico", []string{data["id_user"]})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Print(respuesta)
	// rutasuid := strings.Split(respuesta.Result[0][0]["foto"].(string), "/")
	// uidant := rutasuid[len(rutasuid)-1]
	// // AQUI SE MANDA A ELIMINAR LA IMAGEN DEL USUARIO
	// bucket.DeleteFile(1, uidant)
	// // Aqui mandar e hacer el proceso de eliminacion  de albumnes y fotos del  usuario
	// respuesta2, err := pool.ExecuteSP("SelectAlbumesUser", params...)
	// if err != nil {
	// 	http.Error(res, err.Error(), http.StatusInternalServerError)
	// 	return
	// }
	// fmt.Println(respuesta2.Result[0])
	// for i := 0; i < len(respuesta2.Result[0]); i++ {
	// 	albumes.ElimnarMuchosAlbumnes(respuesta2.Result[0][i]["id_album"].(int))
	// }
	// // Ingreso  de eliminacion de base de datos de usuario
	// _, err = pool.ExecuteSP("EliminarUsuario", params...)
	// if err != nil {
	// 	http.Error(res, err.Error(), http.StatusInternalServerError)
	// 	return
	// }

	// Respuesta exitosa
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"mensaje":"Foto ingresado exitosamente."}`))
}

func DeleteAlbum(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
}

func DeleteFoto(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
}

// UPDATES--------------------------------------

func Updateusuarios(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
}

func UpdateAlbum(w http.ResponseWriter, r *http.Request) {
	decoder := json.NewDecoder(r.Body)
	var data map[string]string
	err1 := decoder.Decode(&data)

	if err1 != nil {
		http.Error(w, err1.Error(), http.StatusBadRequest)
		return
	}

	// Mandar a base de datos la data procesada
	_, err := Execute_sp("CrearFoto", []string{data["id_album"], data["nombre_album"], data["id_user"]})
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	// Respuesta exitosa
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(`{"mensaje":"Album Modificado exitosamente."}`))
}

func UpdateFoto(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
}

// func CreateUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	var user User
// 	_ = json.NewDecoder(r.Body).Decode(&user)
// 	users = append(users, user)
// 	json.NewEncoder(w).Encode(user)
// }

// func GetUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	for _, item := range users {
// 		if item.ID == params["id"] {
// 			json.NewEncoder(w).Encode(item)
// 			return
// 		}
// 	}
// 	http.NotFound(w, r)
// }

// func UpdateUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	for index, item := range users {
// 		if item.ID == params["id"] {
// 			users = append(users[:index], users[index+1:]...)
// 			var user User
// 			_ = json.NewDecoder(r.Body).Decode(&user)
// 			user.ID = params["id"]
// 			users = append(users, user)
// 			json.NewEncoder(w).Encode(user)
// 			return
// 		}
// 	}
// 	http.NotFound(w, r)
// }

// func DeleteUser(w http.ResponseWriter, r *http.Request) {
// 	w.Header().Set("Content-Type", "application/json")
// 	params := mux.Vars(r)
// 	for index, item := range users {
// 		if item.ID == params["id"] {
// 			users = append(users[:index], users[index+1:]...)
// 			break
// 		}
// 	}
// 	json.NewEncoder(w).Encode(users)
// }
