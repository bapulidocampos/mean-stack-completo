import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import{UserService}from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {Publication} from '../../models/publication';
import {PublicationService}from '../../services/publication.service';
import {Tipsalimentacion} from '../../models/tipsalimentacion';
import {TipsalimentacionService}from '../../services/tipsalimentacion.service';

import {UploadService}from '../../services/upload.service';

@Component({
	selector:'tips',
	templateUrl:'./tips.component.html',
	providers:[UserService,TipsalimentacionService,UploadService]
})

export class TipsComponent implements OnInit{
	//mostrar los datos del usuario
public identity;
public token;
//el valor de las estadisticas del usuario identificado LOS CONTADORES	
public stats;
public url;
//mostra algun error o mensajae de exito
public status;
public publication:Tipsalimentacion;





constructor(
private _userService:UserService,
private _tipsalimentacionService:TipsalimentacionService,
private _uploadService:UploadService,
private _route:ActivatedRoute,
private _router:Router
	){
this.identity=this._userService.getidentity();
this.token=this._userService.getToken();
this.stats=this._userService.getStats();
this.url=GLOBAL.url;
this.publication=new Tipsalimentacion("","","",[],"","",this.identity._id);

/*public _id:string,
public text:string,
public file:string,
public comentario:string,
public created_at:string,
public user:string,
//public entrenador:string
*/
}

ngOnInit(){
	console.log("sidebar ha sido cargado");
}
@ViewChild('fileInput') 
inptFile: ElementRef;

onSubmit(form,$event){
	console.log(form);
console.log(this.publication);
this.publication.entrenador=this.identity._id;
this.publication.user=this.identity._id;
console.log(this.identity._id);


this._tipsalimentacionService.addPublication(this.token,this.publication).subscribe(
response =>{
if(response.publication){
	
if(this.filesToUpload && this.filesToUpload.length){

	//subir imagenm
//response.publication._id  ==> publicacion estoy subiendo la imagen(el objeto que me devuelve el metodo principal)
//al publication
//this.filesToUpload ==> es el array de ficheros a subir
//this.token ==>le paso el token
//'' name del campo del fichero que tiene que recoger el backend , en este caso que tiene que recoger se llama file
this._uploadService.makeFileRequest(this.url+'upload-image-tips/'+response.publication._id,[],
this.filesToUpload,this.token,'image').then((result:any)=>{
	//result.image es lo que nos va a devolver el api
			this.publication.file = result.image;
			//console.log(result.image);

			//this.publication=response.publication;
	this.status='success'
	form.reset();
	//para borrar la subido de archivo , osea resetearlo el campo
	this.inptFile.nativeElement.value = "";
	this._router.navigate(['/tips']);
this.sended.emit({send:'true'});
			});
}
else{

			//this.publication=response.publication;
	this.status='success'
	form.reset();
	this._router.navigate(['/tips']);
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
}
////termina el metodo

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