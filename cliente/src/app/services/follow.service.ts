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
import {Follow } from '../models/follow';

@Injectable()
export class FollowService{
//la url de nuestro backend es decir localhost:3800/api
public url:string;
//public identity;
//public token;
 //public stats;
constructor(
private _http:HttpClient)
{
this.url=GLOBAL.url;
}
//recibe el token del usuario registrado y el follow
addFollow(token,follow):Observable<any>{
let params=JSON.stringify(follow);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'follow',params,{headers:headers});
}
deleteFollow(token,id):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.delete(this.url+'follow/'+id,{headers:headers});
}
getFollowing(token,userId=null,page=1):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId
var url=this.url+'following/';
//cuando no es nulo el userId

if(userId!=null){
var url=this.url+'following/'+userId+'/'+page;
}


return this._http.get(url,{headers:headers});
}


getFollowed(token,userId=null,page=1):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId
var url=this.url+'followed/';
//cuando no es nulo el userId
if(userId!=null){
var url=this.url+'followed/'+userId+'/'+page;
}
return this._http.get(url,{headers:headers});
}

//traigo todas las personas que me siguen

getMyFollows(token):Observable<any>{
	//console.log("estoy en servicio "+this.identity._id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId

return this._http.get(this.url+'get-my-cliente/'+true,{headers:headers});
}

getMyFollowse(token):Observable<any>{
	//console.log("estoy en servicio "+this.identity._id);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
							 //es nulo el userId

return this._http.get(this.url+'get-my-trainer/'+true,{headers:headers});
}


}