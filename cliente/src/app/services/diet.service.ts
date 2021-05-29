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
//import {Publication } from '../models/publication';

@Injectable()
export class DietService{
public url:string;
constructor(private _http:HttpClient){ 
	this.url=GLOBAL.url;
}
//recibimos un token , que nos va a permitir autenticarnos en el api
//y recibimos un objeto de publicacion
//la nueva publicacion que vamos a guardar

addPublication(token,publication):Observable<any>{
	console.log("estoy en el servicio de diet")
	let params=JSON.stringify(publication);

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'diet',params,{headers:headers});
}


addcomPublication(token,publicationsvector):Observable<any>{
	//let params=JSON.stringify(publication);
	

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'upload-com-pub/',publicationsvector,{headers:headers});
}
 
 //traigo toda la dieta del usuario
//return this._http.get(this.url+'tips-user/'+user_id+'/'+page,{headers:headers});

//si veo el perfil de alguien
getPublications(token,user_id,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'Publicationsexx-diet/'+user_id+'/'+page,{headers:headers});
}
//si veo mi perfil

getPublicationsm(token,user_id,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'Publicationsexx-diett/'+user_id+'/'+page,{headers:headers});
}




getPublicationsUser(token,user_id,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'publications-user/'+user_id+'/'+page,{headers:headers});
}





deletePublication(token,id):Observable<any>{
	console.log("servicio de dieta"+id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.delete(this.url+'diet/'+id,{headers:headers});
}


//traigo para el combobox de todos la dieta
getMyFollows(token,user_id):Observable<any>{
	console.log("aqui "+user_id);
	//console.log("estoy en servicio "+this.identity._id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId

return this._http.get(this.url+'get-my-diet/'+user_id+'/',{headers:headers});
}


}