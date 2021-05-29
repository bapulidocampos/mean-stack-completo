import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import{UserService}from '../../services/user.service';
import {GLOBAL} from '../../services/global';
//import {Publication} from '../../models/publication';
import {Diet} from '../../models/diet';
import {DietService}from '../../services/diet.service';
import {UploadService}from '../../services/upload.service';

@Component({
	selector:'cuadro_datos',
	templateUrl:'./cuadro_datos.component.html',
	providers:[UserService,DietService,UploadService]
})

export class Cuadro_datosComponent implements OnInit{
	//mostrar los datos del usuario
public identity;
public token;
//el valor de las estadisticas del usuario identificado LOS CONTADORES	
public stats;
public url;
//mostra algun error o mensajae de exito
public status;
public publication:Diet;
public follows;




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

	console.log("usuaroio visitado en dieta"+this.user);
	console.log("usuario identificado"+this.identity._id);

	




}












} 