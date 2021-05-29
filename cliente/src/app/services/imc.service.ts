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
import {Imc } from '../models/imc';

@Injectable()

export class ImcService{
public url:string;
constructor(private _http:HttpClient){
	this.url=GLOBAL.url;
}
//recibimos un token , que nos va a permitir autenticarnos en el api
//y recibimos un objeto de publicacion
//la nueva publicacion que vamos a guardar
addPublication(token,publication):Observable<any>{
	let params=JSON.stringify(publication);

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'imc',params,{headers:headers});
}


getPublications(token,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'imc-get/'+page,{headers:headers});
}


getPublicationss(token,user_id,page=1):Observable<any>{
console.log("estoy en el servicio"+ user_id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'imc-get/'+user_id+'/'+page,{headers:headers});
}




 

getPublicationsUser(token,user_id,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'imc-user/'+user_id+'/'+page,{headers:headers});
}





deletePublication(token,id):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.delete(this.url+'imc/'+id,{headers:headers});
}

}