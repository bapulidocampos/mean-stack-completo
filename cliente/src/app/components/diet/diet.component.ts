import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import{UserService}from '../../services/user.service';
import {GLOBAL} from '../../services/global';
//import {Publication} from '../../models/publication';
import {Diet} from '../../models/diet';
import {DietService}from '../../services/diet.service';
import {UploadService}from '../../services/upload.service';

@Component({
	selector:'diet',
	templateUrl:'./diet.component.html',
	providers:[UserService,DietService,UploadService]
})

export class DietComponent implements OnInit{
	//mostrar los datos del usuario
public identity;
public token;
//el valor de las estadisticas del usuario identificado LOS CONTADORES	
public stats;
public url;
public mensaje;
//mostra algun error o mensajae de exito
public status;
public publication:Diet;
public follows;
public peso=[];
public llunes=[];
public mmartes=[];
public mmiercoles=[];
public jjuves=[];
public vviernes=[];

//
public lunescomida=[];
public martescomida=[];
public miercolescomida=[];
public juevescomida=[];
public viernescomida=[];
public pase=false;
public pase2=false;
public pase3=false;
public pase4=false;
public pase5=false;



@Input()user:string;
constructor(
private _userService:UserService,
private _publicationService:DietService,
private _uploadService:UploadService,
private _route:ActivatedRoute,
private _router:Router
	){
this.identity=this._userService.getidentity();
this.token=this._userService.getToken();
this.stats=this._userService.getStats();
this.url=GLOBAL.url;
this.publication=new Diet("","","",<any>[],<any>[],<any>[],<any>[],<any>[],"","",this.identity._id);


} 

ngOnInit(){
	//(<HTMLInputElement>document.getElementById("boton")).disabled=true;
	console.log("sidebar ha sido cargado");
	this.getMyFollows();
	console.log("usuaroio visitado en dieta"+this.user);
	console.log("usuario identificado"+this.identity._id);

	




}





@ViewChild('fileInput') 
inptFile: ElementRef;


onSubmit(form,$event){
	console.log("aqui en llevo el ");
console.log(this.publication);

/*
this.peso[0]=this.follows[0]._id;
this.peso[1]=this.follows[1]._id;
this.peso[2]=this.follows[2]._id;
this.peso;
*/
console.log("aqui en save");
console.log(this.peso);
//this.publication.vector=this.peso;
/*
this.publication.lunes=this.llunes;
this.publication.martes=this.mmartes;
this.publication.miercoles=this.mmiercoles;
this.publication.jueves=this.jjuves;
this.publication.viernes=this.vviernes;

*/

//this.publication.text="aqui va la 2 dieta parcero ";

//aqui lleno el vector

this.publication.lunes=this.lunescomida;
this.publication.martes=this.martescomida;
this.publication.miercoles=this.miercolescomida;
this.publication.jueves=this.juevescomida;
this.publication.viernes=this.viernescomida;

this.publication.user=this.user;
this.publication.trainer=this.identity._id;	



this._publicationService.addPublication(this.token,this.publication).subscribe(
response =>{
if(response.publication){
console.log(response.msg);
	this.mensaje=response.msg;
if(this.filesToUpload && this.filesToUpload.length){
//subir imagenm
//response.publication._id  ==> publicacion estoy subiendo la imagen(el objeto que me devuelve el metodo principal)
//al publication
//this.filesToUpload ==> es el array de ficheros a subir
//this.token ==>le paso el token
//'' name del campo del fichero que tiene que recoger el backend , en este caso que tiene que recoger se llama file


this._uploadService.makeFileRequest(this.url+'upload-image-pub/'+response.publication._id,[],
this.filesToUpload,this.token,'image').then((result:any)=>{
//result.image es lo que nos va a devolver el api
this.publication.file = result.image;
//console.log(result.image);
//this.publication=response.publication;
this.status='success'
form.reset();
//para borrar la subido de archivo , osea resetear el campo
this.inptFile.nativeElement.value = "";

//this._router.navigate(['/diet_get']);
this.sended.emit({send:'true'});
			});
}
else{
//this.publication=response.publication;		
this.status='success'
form.reset();
//this._router.navigate(['/diet_get']);
this.sended.emit({send:'true'});
}

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
	this.peso=[12,13,14];
	console.log(this.peso);

	this._publicationService.getMyFollows(this.token,this.user).subscribe(
response=>{
	console.log(response);

this.follows=response.follows;
/*
this.peso[0]=this.follows[0]._id;
this.peso[1]=this.follows[1]._id;
this.peso[2]=this.follows[2]._id;
this.llunes[0]=this.follows[0].text;
this.llunes[1]=this.follows[1].text; 
this.llunes[2]=this.follows[2].text;
this.mmartes[0]=this.follows[0].text;
this.mmartes[1]=this.follows[1].text;
this.mmartes[2]=this.follows[2].text;
this.mmiercoles[0]=this.follows[0].text;
this.mmiercoles[1]=this.follows[1].text;
this.mmiercoles[2]=this.follows[2].text;
this.jjuves[0]=this.follows[0].text;
this.jjuves[1]=this.follows[1].text;
this.jjuves[2]=this.follows[2].text;
this.vviernes[0]=this.follows[0].text;
this.vviernes[1]=this.follows[1].text;
this.vviernes[2]=this.follows[2].text;
*/
	console.log(this.peso);
},
error=>{
console.log(<any>error);
}

		);





}

agregar_vector(form){
console.log("dieron al boton");
console.log(form);
this.lunescomida=form;
console.log(this.lunescomida);
console.log("dieron al boton");

}

agregar_vector2(textito){
console.log("dieron al boton vector2");
console.log(textito);
console.log("dieron al boton vector2");

this.lunescomida.push(textito);
console.log(this.lunescomida);


}




//llenar el lunes de dieta
onSubmitelunes(){
	console.log(this.lunescomida.length);
	var a=(<HTMLInputElement>document.getElementById("lunes")).value;

	if(this.lunescomida.length<=2){
	this.lunescomida.push(a);
		console.log(this.lunescomida);
		 if(this.lunescomida.length==3){
				console.log("este vector esta lleno");
				this.pase=true;
				console.log(this.pase);
		}
}


else{

	console.log("ya se lleno el vector");
}

}
//llenar el martes de dieta
onSubmitemartes(){
	console.log(this.martescomida.length);
	var a=(<HTMLInputElement>document.getElementById("martes")).value;

	if(this.martescomida.length<=2){
	this.martescomida.push(a);
		console.log(this.martescomida);
		 if(this.martescomida.length==3){
				console.log("este vector esta lleno");
				this.pase2=true;
		}
}

else{
	console.log("ya se lleno el vector");
}

}
onSubmitemiercoles(){
	console.log(this.miercolescomida.length);
	var a=(<HTMLInputElement>document.getElementById("miercoles")).value;

	if(this.miercolescomida.length<=2){
	this.miercolescomida.push(a);
		console.log(this.miercolescomida);
		 if(this.miercolescomida.length==3){
				console.log("este vector esta lleno");
				this.pase3=true;
		}
}

else{
	console.log("ya se lleno el vector");
}

}
onSubmitejueves(){
	console.log(this.juevescomida.length);
	var a=(<HTMLInputElement>document.getElementById("jueves")).value;

	if(this.juevescomida.length<=2){
	this.juevescomida.push(a);
		console.log(this.juevescomida);
		 if(this.juevescomida.length==3){
				console.log("este vector esta lleno");
				this.pase4=true;
		}
}

else{
	console.log("ya se lleno el vector");
}

}
onSubmiteviernes(){
	console.log(this.viernescomida.length);
	var a=(<HTMLInputElement>document.getElementById("viernes")).value;
		
	//document.getElementById('miText').disabled = true;

	if(this.viernescomida.length<=2){
	this.viernescomida.push(a);
		console.log(this.viernescomida);
		 if(this.viernescomida.length==3){
				console.log("este vector esta lleno");
				this.pase5=true;
		}
}

else{
	console.log("ya se lleno el vector");
}

}
/*
if(this.pase && this.pase2 && this.pase3 && this.pase4 && this.pase5 ){
	(<HTMLInputElement>document.getElementById("boton")).disabled=true;
//	(<HTMLInputElement>document.getElementById("boton")).disabled=false;
}
*/


} 