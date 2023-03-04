package controllers

import (
	"database/sql"
	"fmt"
	"log"
	"os"
	"strings"

	_ "github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

type User struct {
	Id       string
	UserName string
	FullName string
	Password string
	Photo    string
}

var Datab *sql.DB

func StartConnection() (*sql.DB, error) {
	if err := godotenv.Load(); err != nil {
		log.Fatalln(err)
	}

	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	var err error
	Datab, err := sql.Open("mysql", dsn)
	if err != nil {
		panic(err)
	}

	//defer Datab.Close()

	err = Datab.Ping()
	if err != nil {
		panic(err)
	}

	fmt.Println("DB connected.")

	return Datab, nil
}

func Execute(query string) (string, error) {
	// Ejecuta la consulta
	rows, err := Datab.Query(query)
	if err != nil {
		return "", err
	}
	defer rows.Close()

	// Crea una variable para almacenar los resultados
	var result string

	// Recorre los resultados y los agrega a la variable de resultados
	for rows.Next() {
		var value string
		if err := rows.Scan(&value); err != nil {
			return "", err
		}
		result += value + "\n"
	}
	if err := rows.Err(); err != nil {
		return "", err
	}

	// Devuelve los resultados y un error si lo hay
	return result, nil
}

func Execute_sp(proc_name string, params []string) ([]map[string]interface{}, error) {

	//una variable para almacenar los parametros que vienen en el arreglo
	var formated_params string
	// acomoda en una sola string todos los parametros
	if len(params) > 0 {
		formated_params = strings.Join(params, "', '")
	}
	/*organiza el string del stored procedure, en el caso de que no vayan parametros solo manda una string
	llamando al sp */
	proc := fmt.Sprintf("CALL %s('%s');", proc_name, formated_params)
	if len(params) == 0 {
		proc = fmt.Sprintf("CALL %s();", proc_name)
	}
	fmt.Println(proc)

	rows, err := Datab.Query(proc)

	// almacenar los nombres de las columnas en un slice
	columns, err := rows.Columns()
	if err != nil {
		// manejar error
		return nil, err
	}

	// crear un slice para almacenar los valores de las columnas
	values := make([]interface{}, len(columns))
	for i := range values {
		var v interface{}
		values[i] = &v
	}

	// crear un slice para almacenar los resultados
	results := []map[string]interface{}{}

	for rows.Next() {
		// escanear los valores de las columnas en el slice values
		err := rows.Scan(values...)
		if err != nil {
			return nil, err
		}

		// crear un map para almacenar los valores de las columnas
		row := map[string]interface{}{}
		for i, col := range columns {
			val := *(values[i].(*interface{}))
			row[col] = val
		}

		// agregar el map a los resultados
		results = append(results, row)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}

	return results, nil
}

// 	var result string

// 	// for rows.Next() {
// 	// 	var id string
// 	// 	var UserName string

// 	// 	var
// 	// 	err := rows.Scan(&result)
// 	// 	if err != nil {
// 	// 		return nil, err
// 	// 	}
// 	// 	// hacer algo con cada fila devuelta
// 	// }

// 	//result, err := Datab.Query(proc)
// 	if err != nil {
// 		return nil, err
// 	}
// 	//defer result.Close()
// 	defer rows.Close()
// 	// Manejo de los resultados de la consulta...
// 	return map[string]interface{}{
// 		"proc":   proc,
// 		"result": result,
// 	}, nil
// }
