//import {Component,OnInit,Input}from '@angular/core';
import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Tipsalimentacion} from '../../models/tipsalimentacion';
import {GLOBAL } from '../../services/global';
import {UserService}from '../../services/user.service';
import {TipsalimentacionService}from '../../services/tipsalimentacion.service';
import * as $ from 'jquery';
import {UploadService}from '../../services/upload.service';
//import * as 'moment';


@Component({
	selector:'tip',
	templateUrl:'./tip.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,TipsalimentacionService,UploadService]
})

export class TipComponent implements OnInit{
	public showImage;
public title:string;
public identity;
public stats;
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
public publications:Tipsalimentacion[];
//valores del formulario de tips

public publication:Tipsalimentacion;
public nomb:string;
//
public miperfil=false;



@Input()user:string;
constructor(
private _route:ActivatedRoute,
private _router:Router, 
private _uploadService:UploadService,
private _userService:UserService,
private _tipsalimentacionService:TipsalimentacionService
	){
	this.title='publicaciones';
	this.identity=this._userService.getidentity();
	this.stats=this._userService.getStats();
	this.token=this._userService.getToken();
	this.url=GLOBAL.url;
	this.page=1;
	this.publication=new Tipsalimentacion("","","",[],"","",this.identity._id);
}
ngOnInit(){
	console.log("publications component cargado correctamente");
	//this.identity._id==this.user
	console.log("identity "+this.identity._id);
	console.log("usuario visitado "+this.user);
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
		var vectores=<any>[];
vectores[0]="60300a4229722020e4d618db";
vectores[1]="60300a4229722020e4d618db";
//vector[1]="60300b3e29722020e4d618dc";
		this.publication.vector=vectores;
		//[vector]
		//console.log("vector"+vectores);
//console.log(this.publication);
//

this._tipsalimentacionService.addPublication(this.token,this.publication).subscribe(
response =>{
	console.log(response);
if(response.publication){
	console.log("id "+response.publication._id);

	//aqui empieza el metodo de la imagen
if(this.filesToUpload && this.filesToUpload.length){
this._uploadService.makeFileRequest(this.url+'upload-image-tips/'+response.publication._id,[],
this.filesToUpload,this.token,'image').then((result:any)=>{
	//result.image es lo que nos va a devolver el api
			this.publication.file = result.image;
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
	
	this._router.navigate(['/perfil/'+this.user]);
	form.reset();
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

}