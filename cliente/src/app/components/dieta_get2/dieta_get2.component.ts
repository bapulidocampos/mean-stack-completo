import {Component,OnInit}from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Imc} from '../../models/imc';
import {Diet} from '../../models/diet';
import {GLOBAL } from '../../services/global';
import {UserService}from '../../services/user.service';
import {ImcService}from '../../services/imc.service';
import {DietService}from '../../services/diet.service';

//lo use para el scroll
import * as $ from 'jquery';
//import * as 'moment';


@Component({
	selector:'dieta_get2',
	templateUrl:'./dieta_get2.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,DietService]
})
 
export class Dieta_get2Component implements OnInit{
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
public publications:Diet[];
//public exercises:Exercise[];
 
public showImage;
cadenaDelTxt:string;
cadena:string;
file_name:string;
public suma:string;
constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService,
private _dietService:DietService
	){
	this.title='Indice de Masa Corporal';
	this.identity=this._userService.getidentity();
	this.token=this._userService.getToken();
	this.url=GLOBAL.url;
	this.page=1;
}


ngOnInit(){
	console.log("cargado correctamente");
	this.getPublications(this.page);


}
//va a recibir una pagina
//adding para agregar mas publicaciones
getPublications(page,adding=false){
this._dietService.getPublications(this.token,page).subscribe(
response=>{
console.log(response);
console.log(response.publications);
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
		console.log(this.publications);
	
		//usamos jquery para scroll animado
		//le pasamos scrolltop y le voy a pasar la altura del body
		//la cantidad de tiempo que va a tardar la animacion
		$("html, body").animate({scrollTop: $('body').prop("scrollHeight")},500);

	}
	


	//si la pagina actual es mayor a la pagina que tengo guardada 
if(page>this.pages){
	//this._router.navigate(['/home']);
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
  
 public noMore=false;
//llamar cuando de click al botn
viewMore(){
	this.page+=1;
if(this.page==this.pages){
this.noMore=true;
}
else{
	//this.page+=1;
}
this.getPublications(this.page,true);
}
refresh(event=null){
//console.log(event);
this.getPublications(1);
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
this._dietService.deletePublication(this.token,id).subscribe(
response=>{
this.refresh();

},
error=>{
	console.log(<any>error);

  
}


	);
}



}