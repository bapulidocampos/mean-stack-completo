import {Component,OnInit,Input}from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Publication} from '../../../models/publication';
import {GLOBAL } from '../../../services/global';
import {UserService}from '../../../services/user.service';
import {PublicationService}from '../../../services/publication.service';
import * as $ from 'jquery';
//import * as 'moment';


@Component({
	selector:'publications',
	templateUrl:'./publicationss.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,PublicationService]
})
 
export class PublicationssComponent implements OnInit{
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

@Input()user:string;
constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService,
private _publicationService:PublicationService
	){
	this.title='publicaciones';
	this.identity=this._userService.getidentity();
	this.token=this._userService.getToken();
	this.url=GLOBAL.url;
	this.page=1;
}
ngOnInit(){
	console.log("publications component cargado correctamente");
	this.getPublications(this.user,this.page);
}
//va a recibir una pagina
//adding para agregar mas publicaciones
getPublications(user:any,page:any,adding=false){
this._publicationService.getPublicationsUser(this.token,user,page).subscribe(
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



}