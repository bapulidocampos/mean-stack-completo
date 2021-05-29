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
import {User } from '../models/user';

//esta clase la podemos inyectar como un servicio en cualquier componente
@Injectable()
export class UserService{
//la url de nuestro backend es decir localhost:3800/api
public url:string;
public identity;
public token;
 public stats;
constructor(public _http:HttpClient)
{
this.url=GLOBAL.url;
}
//lo que nos va a devolver observable
register(user:User): Observable<any>{
	//console.log(user);
	//	console.log(this.url);
	//convertir el objeto a formato json convertido a stringstring
let params=JSON.stringify(user);
//le envio un json al backend ya es capas de procesarlo
let headers=new HttpHeaders().set('Content-Type','application/json');
return this._http.post(this.url+'register',params,{headers:headers});
}


signup(user,gettoken=null): Observable<any>{
	
	if(gettoken !=null){
user.gettoken=gettoken;
 //user = Object.assign(user, {gettoken});
	}
	//console.log(user);
	//	console.log(this.url);
	//convertir el objeto a formato json convertido a stringstring
let params=JSON.stringify(user);
//le envio un json al backend ya es capas de procesarlo
let headers=new HttpHeaders().set('Content-Type','application/json');
return this._http.post(this.url+'login',params,{headers:headers});
}

getidentity(){
	//convertir un json string a un objeto de javascript
	let identity=JSON.parse(localStorage.getItem('identity'));

if(identity!="undefined"){
this.identity=identity;
}
else{
	this.identity=null;
}
return this.identity;
}


getToken(){
	//convertir un json string a un objeto de javascript
	let token=JSON.parse(localStorage.getItem('token'));

if(token!="undefined"){
this.token=token;
}
else{
	this.token=null;
}
return this.token;
}

getStats(){
let stats=JSON.parse(localStorage.getItem('stats'));
if(stats!="undefined"){
	this.stats=stats;

}else{
	this.stats=null;
}
return this.stats;
}
getCounters(userId=null):Observable<any>{
	let headers=new HttpHeaders().set('Content-Type','application/json')
								.set('Authorization',this.getToken());

if(userId!=null){
	return this._http.get(this.url+'counters/'+userId,{headers:headers});
}
else{
	return this._http.get(this.url+'counters',{headers:headers});
}

}

updateUser(user:User):Observable<any>{
let params=JSON.stringify(user);
let headers=new HttpHeaders().set('Content-Type','application/json')
								.set('Authorization',this.getToken());
return this._http.put(this.url+'update-user/'+user._id,params,{headers:headers});							
}

//saca todos los usuarios
//listado de usuarios
getUsers(page=null):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',this.getToken());
return this._http.get(this.url+'users/'+page,{headers:headers});

}
//saca un usuario
//se utiliza para los perfiles de usuarios
getUser(id):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',this.getToken());
return this._http.get(this.url+'user/'+id,{headers:headers});

}




}

