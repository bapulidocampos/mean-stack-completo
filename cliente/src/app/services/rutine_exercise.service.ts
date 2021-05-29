//importar los obejtos necesarios 

//importar el modulo inyectable que nos va a permitir
//definir los servicios y poder inyectarlos en otra clase
import { Injectable } from '@angular/core';
//para hacer las peticion ajax y header para envir cabeceras
import { HttpClient,HttpHeaders } from '@angular/common/http';
//objeto observable para poder recoger las respuestas que nos devuelvve el api
import { Observable } from 'rxjs/Observable';
//
import {GLOBAL } from './global';
import {Rutine_exercise } from '../models/rutine_exercise';

@Injectable()
export class Rutine_exerciseService{
public url:string;
constructor(private _http:HttpClient){ 
	this.url=GLOBAL.url; 
} 
//recibimos un token , que nos va a permitir autenticarnos en el api
//y recibimos un objeto de publicacion
//la nueva publicacion que vamos a guardar
addPublication(token,publication):Observable<any>{
	console.log("servicio "+ publication);
	let params=JSON.stringify(publication);
	//params.vector=publicationsvector;
	console.log("servicio params "+params);

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'rutine',params,{headers:headers});
}

//pruebas de enviar un vector
addcomPublication(token,publicationsvector):Observable<any>{
	//let params=JSON.stringify(publication);
	

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'upload-com-pub/',publicationsvector,{headers:headers});
}
 
 
getPublications(token,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'rutine/'+page,{headers:headers});
}

/*
getPublicationsUser(token,user_id,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'tips-user/'+user_id+'/'+page,{headers:headers});
}
*/

getPublicationsUsermexercise(token,user_id,page=1):Observable<any>{
console.log("servicio de rutine exercise ");
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'tips-usermexercise/'+user_id+'/'+page,{headers:headers});
}


getPublicationsUsermexercisei(token,user_id,page=1):Observable<any>{
console.log("servicio de rutine exercise ");
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'tips-usermexercisei/'+user_id+'/'+page,{headers:headers});
}




getPublicationvector(token,[user_id]):Observable<any>{
console.log("vecto en servicio "+user_id[0]);
var hola="holab";
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'tips-uservector',user_id,{headers:headers});
}




deletePublication(token,id):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.delete(this.url+'rutine_exercised/'+id,{headers:headers});
}

}  