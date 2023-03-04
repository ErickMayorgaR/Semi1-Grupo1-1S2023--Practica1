package controllers

import (
	"bytes"
	"encoding/base64"
	"fmt"
	"log"
	"os"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/joho/godotenv"
)

func UploadFile(fileType int, nombre string, base64Data string) {
	if err := godotenv.Load(); err != nil {
		log.Fatalln(err)
	}

	accessKey := os.Getenv("AWS_KEY")
	secretKey := os.Getenv("AWS_ACCESS")
	bucketName := os.Getenv("AWS_BUCKET")

	// Crea una sesión de AWS
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String(os.Getenv("AWS_REGION")), // cambia a la región que necesites
		Credentials: credentials.NewStaticCredentials(
			accessKey, // tu AWS Access Key ID
			secretKey, // tu AWS Secret Access Key
			""),       // token de sesión (deja en blanco)
	})

	if err != nil {
		log.Fatal("Error creating session: ", err)
	}

	svc := s3.New(sess)

	var route, contentType string

	switch fileType {
	case 1:
		route = "Fotos_Perfil/"
		contentType = "image"
	case 2:
		route = "Fotos_Publicadas/"
		contentType = "image"
	default:
		route = "Fotos_Perfil/"
		contentType = "image"
	}

	routeComplete := fmt.Sprintf("%s%s", route, nombre)

	// Convert base64 data to bytes
	data, err := base64.StdEncoding.DecodeString(base64Data)
	if err != nil {
		fmt.Println("error decoding base64 data:", err)
		return
	}

	// Upload file to S3
	_, err = svc.PutObject(&s3.PutObjectInput{
		Bucket:      aws.String(bucketName),
		Key:         aws.String(routeComplete),
		Body:        bytes.NewReader(data),
		ContentType: aws.String(contentType),
	})
	if err != nil {
		fmt.Println("error uploading file to S3:", err)
		log.Fatal("Error uploading to S3 ", err)
		return
	}

	fmt.Println("file uploaded successfully!")
}

func DeleteFile(fileType int, nombre string) {
	if err := godotenv.Load(); err != nil {
		log.Fatalln(err)
	}

	svc := s3.New(session.Must(session.NewSession(&aws.Config{
		Region:      aws.String(os.Getenv("AWS_REGION")),
		Credentials: credentials.NewStaticCredentials(os.Getenv("AWS_KEY"), os.Getenv("AWS_ACCESS"), ""),
	})))

	var route string
	switch fileType {
	case 1:
		route = "Fotos_Perfil/"
	case 2:
		route = "Fotos_Publicadas/"
	default:
		route = "Fotos_Perfil/"
	}

	routeComplete := fmt.Sprintf("%s%s", route, nombre)

	params := &s3.DeleteObjectInput{
		Bucket: aws.String(os.Getenv("AWS_BUCKET")),
		Key:    aws.String(routeComplete),
	}

	result, err := svc.DeleteObject(params)
	if err != nil {
		fmt.Println(err)
		return
	}
	fmt.Println(result)
}

func UpdateFile(fileType int, nombreAnterior string, nombre string) {
	if err := godotenv.Load(); err != nil {
		log.Fatalln(err)
	}

	sess, err := session.NewSession(&aws.Config{
		Region:      aws.String(os.Getenv("AWS_REGION")),
		Credentials: credentials.NewStaticCredentials(os.Getenv("AWS_KEY"), os.Getenv("AWS_ACCESS"), ""),
	})
	if err != nil {
		panic(err)
	}
	svc := s3.New(sess)

	route := ""
	switch fileType {
	case 1:
		route = "Fotos_Perfil/"
	case 2:
		route = "files/"
	default:
		route = "Fotos_Perfil/"
	}
	routeCompleteAnterior := route + nombreAnterior
	routeComplete := route + nombre

	// Copy the object to a new location
	copyParams := &s3.CopyObjectInput{
		Bucket:     aws.String(os.Getenv("AWS_BUCKET")),
		CopySource: aws.String(fmt.Sprintf("%s/%s", os.Getenv("AWS_BUCKET"), routeCompleteAnterior)),
		Key:        aws.String(routeComplete),
	}
	_, err = svc.CopyObject(copyParams)
	if err != nil {
		panic(err)
	}

	// Delete the old object
	deleteParams := &s3.DeleteObjectInput{
		Bucket: aws.String(os.Getenv("AWS_BUCKET")),
		Key:    aws.String(routeCompleteAnterior),
	}
	_, err = svc.DeleteObject(deleteParams)
	if err != nil {
		panic(err)
	}
}
