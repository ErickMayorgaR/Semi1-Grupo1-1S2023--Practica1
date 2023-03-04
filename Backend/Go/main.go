package main

import (
	"fmt"
	"log"
	"net/http"
	"seminario12023backend/controllers"

	"github.com/gorilla/mux"
)

//"encoding/json"    "strconv"

func main() {
	db, err := controllers.StartConnection()

	controllers.Datab = db
	if err != nil {
		panic(err)
	}

	router := mux.NewRouter()

	router.HandleFunc("/", indexRoute)

	// // GET
	router.HandleFunc("/api/getUsuarios", controllers.GetUsuarios).Methods(http.MethodGet)
	router.HandleFunc("/api/getAlbum", controllers.GetAlbum).Methods(http.MethodGet)
	router.HandleFunc("/api/getFoto", controllers.GetFoto).Methods(http.MethodGet)

	// // POST
	router.HandleFunc("/api/crearUsuario", controllers.CreateUsuarios).Methods(http.MethodPost)
	router.HandleFunc("/api/CreateAlbum", controllers.CreateAlbum).Methods(http.MethodPost)
	router.HandleFunc("/api/CreateFoto", controllers.CreateFoto).Methods(http.MethodPost)

	// // DELETE
	//router.HandleFunc("/api/deleteUsuario", controllers.DeleteUsuario).Methods(http.MethodDelete)
	router.HandleFunc("/api/DeleteAlbum", controllers.DeleteAlbum).Methods(http.MethodDelete)
	router.HandleFunc("/api/DeleteFoto", controllers.DeleteFoto).Methods(http.MethodDelete)

	// //UPDATE
	router.HandleFunc("/api/updateUsuario", controllers.UpdateUsuario).Methods(http.MethodPost)
	router.HandleFunc("/api/UpdateAlbum", controllers.UpdateAlbum).Methods(http.MethodPost)
	router.HandleFunc("/api/UpdateFoto", controllers.UpdateFoto).Methods(http.MethodPost)

	log.Fatal(http.ListenAndServe(":5000", router))
}

func indexRoute(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Index")
}
