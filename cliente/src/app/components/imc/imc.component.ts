import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import{UserService}from '../../services/user.service';
import {GLOBAL} from '../../services/global';
import {Imc} from '../../models/imc';
import {ImcService}from '../../services/imc.service';
import {UploadService}from '../../services/upload.service';

@Component({
	selector:'imc',
	templateUrl:'./imc.component.html',
	providers:[UserService,ImcService,UploadService]
})

export class ImcComponent implements OnInit{
	//mostrar los datos del usuario
public identity;
public title;
public token;
//el valor de las estadisticas del usuario identificado LOS CONTADORES	
public stats;
public url;
//mostra algun error o mensajae de exito
public status;
public imc:Imc;
public edad;




constructor(
private _userService:UserService,
private _imcService:ImcService,
private _uploadService:UploadService,
private _route:ActivatedRoute,
private _router:Router
	){
	this.title='imc';
this.identity=this._userService.getidentity();
this.token=this._userService.getToken();
this.stats=this._userService.getStats();
this.url=GLOBAL.url;
this.imc=new Imc("","","","","","","","","",this.identity._id);

 
}

ngOnInit(){
	console.log("sidebar ha sido cargado");

	   var hoy = new Date();
    var cumpleanos = new Date(this.identity.date_birth);
     this.edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        this.edad--;
    }

    console.log(this.edad);
}
@ViewChild('fileInput')
inptFile: ElementRef;

onSubmit(form,$event){
console.log(this.imc);
console.log(this.imc.imc);
//IMC
var peso=parseInt(this.imc.peso);
var altu=parseInt(this.imc.altura);
//var años=parseInt(this.identity.date_birth);
var altura=altu/100;
var indi=peso/(altura*altura);
console.log(indi);
var indic=indi.toString();
//var indicemasacorporal=this.imc.peso/(this.imc.altura*this.imc.altura);
this.imc.imc=indic;
//IMC

//TMB

if(this.identity.sexo=='masculino'){
//HOMBRES TMB= (10 x peso de Kg) + (6,25 x altura en cm) – (5 x edad en años) +  5
	var tasambH=(10*peso)+(6.25*altu)-(5*this.edad)+5;
	this.imc.mbasal=tasambH.toString();
	console.log(tasambH);
	console.log("es hombre")
	console.log("sedentario"+tasambH*1.2);
}

else{
//MUJERES TMB= (10 x peso en kg) + (6,25 x altura en cm) – (5 x edad en años) – 161
var tasambM=(10*peso)+(6.25*altu)-(5*this.edad)-161;
this.imc.mbasal=tasambM.toString();
console.log(tasambM);
console.log("es mujer");
}
console.log(this.imc);
console.log(this.imc.actividad);

//TMB
//metabolica basal 

var tasambasal=parseInt(this.imc.mbasal);
var actividadbasal=parseFloat(this.imc.actividad);
var kcal=tasambM*actividadbasal;
var calorias=tasambasal*actividadbasal;
this.imc.tmb=calorias.toString();
  var hoy = new Date();
  var fechi=hoy.toDateString();
  console.log("fecha papa hoy"+hoy);
  console.log("fecha papa"+fechi);
this.imc.created_at=fechi;
console.log("tasa metabolic basal "+tasambasal);
console.log("activdaddd "+actividadbasal);
console.log("calorias " +calorias);
this._imcService.addPublication(this.token,this.imc).subscribe(
response =>{
if(response.imc){

	
if(this.filesToUpload && this.filesToUpload.length){

	//subir imagenm
//response.publication._id  ==> publicacion estoy subiendo la imagen(el objeto que me devuelve el metodo principal)
//al publication
//this.filesToUpload ==> es el array de ficheros a subir
//this.token ==>le paso el token
//'' name del campo del fichero que tiene que recoger el backend , en este caso que tiene que recoger se llama file
this._uploadService.makeFileRequest(this.url+'upload-image-exe/'+response.imc._id,[],
this.filesToUpload,this.token,'image').then((result:any)=>{
	//result.image es lo que nos va a devolver el api
			this.imc.file = result.image;
			//console.log(result.image);

			//this.publication=response.publication;
	this.status='success'
	form.reset();
	//para borrar la subido de archivo , osea resetearlo el campo
	this.inptFile.nativeElement.value = "";
	this._router.navigate(['/imc_get']);
this.sended.emit({send:'true'});
			});
}
else{

			//this.publication=response.publication;
	this.status='success'
	form.reset();
	this._router.navigate(['/imc_get']);
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