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
import {Message } from '../models/message';

@Injectable()
export class MessageService{
public url:string;
constructor(
private _http:HttpClient)
{
this.url=GLOBAL.url;
}


addMessage(token,message):Observable<any>{
let params=JSON.stringify(message);
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.post(this.url+'message',params,{headers:headers});
}
//listar los mensajes recibidos
getMyMessages(token,page=1):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'my-messages/'+page,{headers:headers});
}
//listar los mensajes enviados
getEmmitMessages(token,page=1):Observable<any>{
let headers=new HttpHeaders().set('Content-Type','application/json')
							 .set('Authorization',token);
return this._http.get(this.url+'messages/'+page,{headers:headers});
}



}