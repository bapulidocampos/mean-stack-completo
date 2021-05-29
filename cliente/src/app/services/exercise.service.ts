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
import {Exercise } from '../models/exercise';

@Injectable()

export class ExerciseService{
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
return this._http.post(this.url+'exercises',params,{headers:headers});
}


getPublications(token,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'exercises-get/'+page,{headers:headers});
}

//traer todos los ejercicios pero no paginados
getPublicationss(token,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'exercises-gett/'+page,{headers:headers});
}



//tricep traer
getPublicationsstricep(token,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'exercises-gett-tricep/'+page,{headers:headers});
}



//cardio traer

getPublicationsscardio(token,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'exercises-gett-cardio/'+page,{headers:headers});
}




 

getPublicationsUser(token,user_id,page=1):Observable<any>{

let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'publications-user/'+user_id+'/'+page,{headers:headers});
}





deletePublication(token,id):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.delete(this.url+'exercise/'+id,{headers:headers});
}


//traigo para el combobox de todos los ejercicios
getMyFollows(token):Observable<any>{
	//console.log("estoy en servicio "+this.identity._id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId

return this._http.get(this.url+'get-my-exercise/',{headers:headers});
}

//traigo para el combobox bicep
getMyFollowsbicep(token):Observable<any>{
	//console.log("estoy en servicio "+this.identity._id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId

return this._http.get(this.url+'get-my-exercise-bicep/',{headers:headers});
}
//traigo para el combobox tricep
getMyFollowstricep(token):Observable<any>{
	//console.log("estoy en servicio "+this.identity._id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId

return this._http.get(this.url+'get-my-exercise-tricep/',{headers:headers});
}
//traigo para el combobox cardio
getMyFollowscardio(token):Observable<any>{
	//console.log("estoy en servicio "+this.identity._id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId

return this._http.get(this.url+'get-my-exercise-cardio/',{headers:headers});
}

}