//import {Component,OnInit,Input}from '@angular/core';
import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Rutine_exercise} from '../../models/rutine_exercise';
import {GLOBAL } from '../../services/global';
import {UserService}from '../../services/user.service';
import {Rutine_exerciseService}from '../../services/rutine_exercise.service';
import * as $ from 'jquery';
import {UploadService}from '../../services/upload.service';
//import * as 'moment';



@Component({
	selector:'rutine_exercise_get',
	templateUrl:'./rutine_exercise_get.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,Rutine_exerciseService,UploadService]
}) 

export class Rutine_exercise_getComponent implements OnInit{


	public showImage;
public title:string; 
public identity;
public token;
public url;
public status:string;
public page;
//total de elementos
public total;
//numero de pagina
public pages;
public itemsPerPage;
//donde vamos a guardar las publicaciones
public publications:Rutine_exercise[];
//valores del formulario de tips

public publication:Rutine_exercise;
public nomb:string;
// 
public miperfil=false;
public prueba=[];
//public ejercicioss=[];
public hole;
public jum=false;

@Input()user:string;
constructor(
private _route:ActivatedRoute,
private _router:Router, 
private _uploadService:UploadService,
private _userService:UserService,
private _rutine_exerciseService:Rutine_exerciseService
	){
	this.title='publicaciones';
	this.identity=this._userService.getidentity();
	this.token=this._userService.getToken();
	this.url=GLOBAL.url;
	this.page=1; 

}
ngOnInit(){
	//console.log("aqui hole "+this.hole);
	console.log("publications component cargado correctamente");
	
	this.getPublications(this.user,this.page);
 this.prueba = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
//this.prueba=[3,4,5,6,7,8];
/*
 var app = angular.module("ejTable",[]);
app.controller("diasController",function($scope){
$scope.dias = ["Lunes","Martes","Miercoles","Jueves","Viernes","Sabado","Domingo"];
});
*/

}
@ViewChild('fileInput') 
inptFile: ElementRef;
//va a recibir una pagina
//adding para agregar mas publicaciones
getPublications(user:any,page:any,adding=false){
	console.log("identitiy "+this.identity._id);
console.log("usuario visitado"+this.user);

if(this.identity._id==this.user){
	//getPublicationsUserm
	this.miperfil=true;
	this.nomb="getPublicationsUserm";
	console.log(this.nomb);
	this._rutine_exerciseService.getPublicationsUsermexercise(this.token,user,page).subscribe(
response=>{
console.log(response);
if(response.publications){
	this.total=response.total_items; 
	this.pages=response.pages; 
	this.itemsPerPage=response.items_per_pag;
	if(!adding){
this.publications=response.publications;
	}
	else{ 
		//el array que tenga con las publicaciones ejemplo pag 1
		var arrayA=this.publications;
		//el nuevo array que me esta devolviendo el api ejemplo pag 2
		var arrayB=response.publications;
		this.publications=arrayA.concat(arrayB);

		//usamos jquery para scroll animado
		//le pasamos scrolltop y le voy a pasar la altura del body
		//la cantidad de tiempo que va a tardar la animacion
		$("html, body").animate({scrollTop: $('html').prop("scrollHeight")},500);

	}
	


	//si la pagina actual es mayor a la pagina que tengo guardada 
if(page>this.pages){
	//this._router.navigate(['/home']);
}

}else{
	this.status='error';
}
},
	error=>{
		var errorMessage=<any>error;
	console.log(errorMessage);
	if(errorMessage!=null){
this.status='error'; 

	}
	}

	);

}
else
{
	//aqui si no (identity._id != user) ES DIFERENTE
this.miperfil=false;
this._rutine_exerciseService.getPublicationsUsermexercisei(this.token,this.user,page).subscribe(
response=>{
console.log(response);
if(response.publications){
	this.total=response.total_items; 
	this.pages=response.pages; 
	this.itemsPerPage=response.items_per_pag;
	if(!adding){
this.publications=response.publications;
	}
	else{
		//el array que tenga con las publicaciones ejemplo pag 1
		var arrayA=this.publications;
		//el nuevo array que me esta devolviendo el api ejemplo pag 2
		var arrayB=response.publications;
		this.publications=arrayA.concat(arrayB);

		//usamos jquery para scroll animado
		//le pasamos scrolltop y le voy a pasar la altura del body
		//la cantidad de tiempo que va a tardar la animacion
		$("html, body").animate({scrollTop: $('html').prop("scrollHeight")},500);

	}
	


	//si la pagina actual es mayor a la pagina que tengo guardada 
if(page>this.pages){
	//this._router.navigate(['/home']);
}

}else{
	this.status='error';
}
},
	error=>{
		var errorMessage=<any>error;
	console.log(errorMessage);
	if(errorMessage!=null){
this.status='error'; 

	}
	}

	);
//CICLO ELSE
}
}
  
 public noMore=false;
//llamar cuando de click al botn
viewMore(){
this.page+=1;
//cuando la pag actual sea igual al total de paginas
if(this.page==this.pages){
this.noMore=true;
}
else{
	//this.page+=1;
}
this.getPublications(this.user,this.page,true);
}
refresh(event=null){
//console.log(event);
this.getPublications(this.user,1);
}
//esto es para ver la imagen
showThisImage(id){
this.showImage=id;
}

//para quitar la imagen
hideThisImage(id){
this.showImage=0;
}

deletePublication(id){
this._rutine_exerciseService.deletePublication(this.token,id).subscribe(
response=>{
this.refresh();

},
error=>{
	console.log(<any>error);
 

}


	);
}
//formulario tips post


onSubmit(form,$event){
	//this.user
	console.log(form);

	//	console.log(this.user);
		this.publication.user=this.user;
//console.log(this.publication);
//

this._rutine_exerciseService.addPublication(this.token,this.publication).subscribe(
response =>{
	console.log(response);
if(response.publication){
	console.log("id "+response.publication._id);

	//aqui empieza el metodo de la imagen
if(this.filesToUpload && this.filesToUpload.length){
this._uploadService.makeFileRequest(this.url+'upload-image-tips/'+response.publication._id,[],
this.filesToUpload,this.token,'image').then((result:any)=>{
	//result.image es lo que nos va a devolver el api
		//	this.publication.file = result.image;
	this.status='success'
	form.reset();
	//para borrar la subido de archivo , osea resetearlo el campo
	this.inptFile.nativeElement.value = "";
	this._router.navigate(['/perfil/'+this.user]);
	console.log("entro por donde es");
this.sended.emit({send:'true'});
			});
}
///compararlo



else{

			//this.publication=response.publication;
	this.status='success'
	form.reset();
	this._router.navigate(['/perfil/'+this.user]);
	this.sended.emit({send:'true'});
}




}
else{
	this.status='error';
}
},
error=>{
	var errorMessage=<any>error;
	console.log(errorMessage);
	if(errorMessage!=null){
this.status='error';

	}
}
	



	);


//
}
//array de ficheros. esta propiedad se va rellenar cuando ejecute el metedo fileChangeEvent
public filesToUpload:Array<File>;

fileChangeEvent(fileInput:any){
	//vamos a coger los ficheros selecionados por el input que le estoy pasando por parametro
this.filesToUpload=<Array<File>>fileInput.target.files;
}


//OUTPUT
//utilizamos una propiedad que se va llamar sended y va a tener un objeto 
//de un evento (esta propiedad va a poder emitir evento)
@Output() sended= new EventEmitter();

sendPublication(event){
	//console.log(event);
this.sended.emit({send:'true'});
}


vector(){
 var vector=[];
vector[0]="60300a4229722020e4d618db";
vector[1]="60300b3e29722020e4d618dc";
for (var i = 0; i < vector.length; i++) {
console.log("vector "+vector[i]);
}

//metodo
this._rutine_exerciseService.getPublicationvector(this.token,[vector]).subscribe(
response=>{
this.refresh();

},
error=>{
	console.log(<any>error);


}
 

	);



//metodo
}
ver_video(id){
	if(id=='null'){
console.log("la imagen es nula");
this.jum=false;
console.log(this.jum);
	}
	else if(this.jum==true){
		this.jum=false;
	} 

	else{
	this.hole="";
console.log(this.hole);
	this.jum=true;
console.log(id);
this.hole=id;
console.log(this.hole);
}

//this.jum=false;

}



}