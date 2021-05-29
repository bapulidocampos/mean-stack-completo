//import {Component,OnInit,Input}from '@angular/core';
import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Rutine_exercise} from '../../models/rutine_exercise';
import {GLOBAL } from '../../services/global';
import {UserService}from '../../services/user.service';
import {Rutine_exerciseService}from '../../services/rutine_exercise.service';
import {ExerciseService}from '../../services/exercise.service';
import * as $ from 'jquery';
import {UploadService}from '../../services/upload.service';
//import * as 'moment';


@Component({
	selector:'rutine_exercise',
	templateUrl:'./rutine_exercise.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,Rutine_exerciseService,ExerciseService,UploadService]
})
 
export class Rutine_exerciseComponent implements OnInit{
	public showImage;
public title:string;
public identity;
public stats;
public token;
public url;
public mensaje;
public status:string;
public page;
public follows;
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

public instruccioness=[];
public ejercicioss=[];
public friendss=[];

@Input()user:string;
constructor(
private _route:ActivatedRoute,
private _router:Router, 
private _uploadService:UploadService,
private _userService:UserService,
private _rutine_exerciseService:Rutine_exerciseService,
private _exerciseService:ExerciseService

	){
	this.title='publicaciones';
	this.identity=this._userService.getidentity();
	this.stats=this._userService.getStats();
	this.token=this._userService.getToken();
	this.url=GLOBAL.url;
	this.page=1;
	this.publication=new Rutine_exercise("",<any>[],<any>[],<any>[],"",this.identity._id);
}
ngOnInit(){
	console.log("publications component cargado correctamente");
	//this.identity._id==this.user
	console.log("identity "+this.identity._id);
	console.log("usuario visitado en el frame de rutina ejercicio "+this.user);
	this.getMyFollows();

  
	//this.getPublications(this.user,this.page); 
}
@ViewChild('fileInput') 
inptFile: ElementRef;


//formulario tips post


onSubmit(form,$event){
	//this.user 
	console.log(form);

	//	console.log(this.user);
		this.publication.user=this.user;
		this.publication.entrenador=this.identity._id;	
		this.publication.instruciones=this.instruccioness;
		this.publication.ejercicios=this.ejercicioss;
		this.friendss=this.ejercicioss;
		this.publication.friends=this.friendss;
		
		
//

this._rutine_exerciseService.addPublication(this.token,this.publication).subscribe(
response =>{
	console.log(response);
if(response.publication){
	console.log("id "+response.publication._id);

	
	this.status='success'
	form.reset();
	

}
else{
	this.status='error';
	console.log(response.msg);
	this.mensaje=response.msg;
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



getMyFollows(){
	//traigo todos los usuarios clientes

	this._exerciseService.getMyFollows(this.token).subscribe(
response=>{
	console.log(response);
this.follows=response.follows;
},
error=>{
console.log(<any>error);
}

		);





}

//llenar el lunes de dieta
onSubmitelunes(){
	//this.ejercicios=[3];
	//console.log(this.lunescomida.length);
	var a=(<HTMLInputElement>document.getElementById("instruccion")).value;
	var b=(<HTMLInputElement>document.getElementById("ejercicio")).value;

	   this.instruccioness.push(a);
		this.ejercicioss.push(b);
	
		console.log(this.instruccioness);
		console.log(this.ejercicioss);
		




}



}