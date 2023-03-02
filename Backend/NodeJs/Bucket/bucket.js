const uploadFile = (FileType,nombre,base64) =>{
    var aws = require('aws-sdk')
    var route = "";
    var content = "";

    switch(FileType){
        case 1:
            route = "Fotos_Perfil/";
            content = "image";
            break;
        case 2:
            route = "Fotos_Publicadas/"
            content = "image";
            
            break;
        default:
            route = "Fotos_Perfil/"
            content = "image";
            break        
    }

    var routeComplete = `${route}${nombre}`
    console.log(process.env.AWS_BUCKET)
    //base64 to byte
    let buff = new Buffer.from(base64, 'base64');

    aws.config.update({
        region:process.env.AWS_REGION,
        accessKeyId:process.env.AWS_KEY,
        secretAccessKey:process.env.AWS_ACCESS
    })

    let s3 = new aws.S3();

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: routeComplete,
        Body: buff,
        ContentType: content
    }

    const putResult = s3.putObject(params).promise();
    console.log(putResult)
}



const DeleteFile = (FileType,nombre) =>{
    var aws = require('aws-sdk')
    var route = "";
    switch(FileType){
        case 1:
            route = "Fotos_Perfil/";
            break;
        case 2:
            route = "Fotos_Publicadas/"
            
            break;
        default:
            route = "Fotos_Perfil/"
            break        
    }

    var routeComplete = `${route}${nombre}`

    aws.config.update({
        region:process.env.AWS_REGION,
        accessKeyId:process.env.AWS_KEY,
        secretAccessKey:process.env.AWS_ACCESS
    })

    let s3 = new aws.S3();

    const params = {
        Bucket: process.env.AWS_BUCKET,
        Key: routeComplete
    }

    const putResult = s3.deleteObject(params).promise();
    console.log(putResult)
}

const updateFile = (FileType,NombreAnterior,Nombre) =>{
    var aws = require('aws-sdk')
    var route = "";
    switch(FileType){
        case 1:
            route = "Fotos_Perfil/";
            break;
        case 2:
            route = "files/"
            
            break;
        default:
            route = "Fotos_Perfil/"
            break        
    }

    var routeCompleteAnterior = `${route}${NombreAnterior}`
    var routeComplete = `${route}${Nombre}`

    aws.config.update({
        region:process.env.AWS_REGION,
        accessKeyId:process.env.AWS_KEY,
        secretAccessKey:process.env.AWS_ACCESS
    })

    let s3 = new aws.S3();
    // Copy the object to a new location
    s3.copyObject({
    Bucket: process.env.AWS_BUCKET, 
    CopySource: `${process.env.AWS_BUCKET}/${routeCompleteAnterior}`, 
    Key: routeComplete
    })
    .promise()
    .then(() => 
        // Delete the old object
        s3.deleteObject({
        Bucket: process.env.AWS_BUCKET, 
        Key: routeCompleteAnterior
        }).promise()
    )
    // Error handling is left up to reader
    .catch((e) => console.error(e))
}

module.exports = {uploadFile,DeleteFile, updateFile}