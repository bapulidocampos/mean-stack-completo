//importar los obejtos necesarios 

//importar el modulo inyectable que nos va a permitir
//definir los servicios y poder inyectarlos en otra clase
import { Injectable } from '@angular/core';


import {GLOBAL } from './global';


//esta clase la podemos inyectar como un servicio en cualquier componente
@Injectable()
export class UploadService{
//la url de nuestro backend es decir localhost:3800/api
public url:string;
//public name:string;
//public token;
constructor()
{
this.url=GLOBAL.url;
}
//enviar imagenes y permite hacer una peticion para subir archivos
//url metodo del api
//params un array de string
//file array con los archivos que vamos a tener
// token de autentificacion para reconocer el usuario
//nombre del fichero o del campo que va a recibir
makeFileRequest(url:string,params:Array<string>,files:Array<File>,token:string,name:string){
//lo hacemos con una promesa para luego tener un metodo then , una vez que acabe la peticion
//	recoger los valores que nos devuelva y ejecutar algo
//

	return new Promise(function(resolve,reject){
		//para el formulario definir un formulario clasico
		var formData:any=new FormData();
		//definir una var xhr , una variable con un objeto 
		//que es el objeto que nos permitir hacer peticiones ajax en javascript puro
		//
		var xhr=new XMLHttpRequest();
		//recorrer todos los archivos que nos llega en el array de archivos
		//y adjuntarlos en nuestra peticion
		for(var i=0;i<files.length;i++){
//por cada fichero me haces un form data append
// me añades al formulario el nuevo fichero con el nombre
//correspondiente que le haya pasado en el parametro en este caso seria imagen 
//por que en el backend vamos a recibir un parametro llamado image y le vamos a pasar
//el fichero que este recorriendo en ese momento
//y luego tambien el nombre de ese fichero
			formData.append(name,files[i],files[i].name);
		}
		//peticion ajax 
		//tiene una function anonima adentro

		xhr.onreadystatechange=function(){
//comprobamos que sea igual a 4
if(xhr.readyState==4){
	//el codigo de error sea 200 entonces resolve
	//me vas hacer la ejecucuion de esto correctamente
		if(xhr.status==200){
			resolve(JSON.parse(xhr.response));
		}else{
			//si no me hace un reject
			//es decir no me deja hacer la peticion ajax
			reject(xhr.response);
		}
}

		}
	//hacemos la peticion ajax por post
	//que la haga true por 3 parametro
xhr.open('POST',url,true);
//adjuntarle la cabecera de autorizacion
xhr.setRequestHeader('Authorization',token);
//envio todos los datos, envio mmi formulario header , todo lo que necesita
//y con todas img o ficheros que haya adjuntado
xhr.send(formData);
	});
}

}