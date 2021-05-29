//import {Component,OnInit}from '@angular/core';
import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Publication} from '../../models/publication';
import {GLOBAL } from '../../services/global';
import {UserService}from '../../services/user.service';
import {PublicationService}from '../../services/publication.service';
import {DietService}from '../../services/diet.service';
//lo use para el scroll
import * as $ from 'jquery';
//import * as 'moment';


@Component({
	selector:'dieta_get',
	templateUrl:'./diet_get.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,DietService]
})
 
export class Diet_getComponent implements OnInit{
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
public publications:Publication[];
public publicationsvector:string[];

public showImage;
cadenaDelTxt:string;
cadena:string;
file_name:string;
public suma:string;
public publicatione:Publication;
@Input()user:string;
constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService,
private _publicationService:DietService
	){
	this.title='Dieta';
	this.identity=this._userService.getidentity();
	this.token=this._userService.getToken();
	this.url=GLOBAL.url;
	this.page=1;
	this.publicatione=new Publication("","","","","",this.identity._id);
}


ngOnInit(){
	console.log("cargado correctamente");
	this.getPublications(this.user,this.page);
	

}
//va a recibir una pagina
//adding para agregar mas publicaciones

getPublications(user:any,page:any,adding=false){

if(this.identity._id != this.user){
this._publicationService.getPublications(this.token,user,page).subscribe(
response=>{
console.log(response);
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
		$("html, body").animate({scrollTop: $('body').prop("scrollHeight")},500);

	}
	


	//si la pagina actual es mayor a la pagina que tengo guardada 
if(page>this.pages){
	//this._router.navigate(['/home']);
}

if(true){

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
else{
this._publicationService.getPublicationsm(this.token,user,page).subscribe(
response=>{
console.log(response);
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
		$("html, body").animate({scrollTop: $('body').prop("scrollHeight")},500);

	}
	


	//si la pagina actual es mayor a la pagina que tengo guardada 
if(page>this.pages){
	//this._router.navigate(['/home']);
}

if(true){

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

//fin del metodo
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
//this.getPublications(1);
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
this._publicationService.deletePublication(this.token,id).subscribe(
response=>{
this.refresh();

},
error=>{
	console.log(<any>error);


}


	);
}

split(id,comentario){
	console.log("aqui "+id);
	console.log("  "+comentario)
	//this.publicationsvector[0]="hay";
	//this.publicationsvector[1]="por que sera ome!";
	this._publicationService.addcomPublication(this.token,this.publicationsvector).subscribe(
response =>{
//if(response.publication){

//}
});


}

}