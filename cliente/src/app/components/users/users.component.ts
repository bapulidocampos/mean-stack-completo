import {Component,OnInit}from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User}from '../../models/user';
import {Follow } from '../../models/follow';
import {UserService}from '../../services/user.service';
import {FollowService}from '../../services/follow.service';
import {GLOBAL } from '../../services/global';



@Component({
	selector:'users',
	templateUrl:'./users.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[
UserService,
FollowService,
]
})

export class UsersComponent implements OnInit{
public title:string;
public identity;
public token;
public url:string;
public page;
public next_page;
public prev_page; 
public total;
public pages;
public users:User[];
//vamos a guardar los usuarios que nosotros estamos siguiendo
public follows;
public status:string;

	constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService,
private _followService:FollowService
		){
this.title='Gente';
//traigo lo que esta en el localstorage
//this.user=this._userService.getidentity();
this.identity=this._userService.getidentity();
this.token=this._userService.getToken();
this.url=GLOBAL.url;
}

//siempre se ejecuta despues del constructor
ngOnInit(){
	//console.log(this.user);
	console.log('componente users se ha  cargando ...');
	

	this.actualPage();
}
//cogemos la pagina actual que tenemos
actualPage(){
	this._route.params.subscribe(params=>{
//indicandole el signo + no lo convierte a entero
let page=+params['page'];
this.page=page;
if(!params['page']){
page=1;
}


if(!page){
	page=1;
}
else{
	this.next_page=page+1;
	this.prev_page=page-1;
	if(this.prev_page<=0){
		this.prev_page=1;
	}
}

//devolver listado de usuarios
this.getUsers(page);

	});
}

getUsers(page){
this._userService.getUsers(page).subscribe(
	response=>{
		if(!response.users){
this.status='error';
		}
		else{
		console.log(response);
			this.total=response.total;
			this.users=response.users;
			this.pages=response.pages;
			//a cuales usuarios estamos siguiendo
			this.follows=response.users_following;
			//console.log(this.follows);
			//si la pagina no existe me devuleva a la pagina gente/1 pagina 1
			if(page>this.pages){
				this._router.navigate(['/gente',1]);
			}
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

public followUserOver;

mouseEnter(user_id){
	this.followUserOver=user_id;
}
mouseLeave(user_id){
	//no me marque ningun boton
	this.followUserOver=0;
}

followUser(followed){
	//necesitaria un id . un usuario logueado , el usuario que vamos a seguir QUE NO LLEGA POR 
	//PARAMETRO
var follow=new Follow('',this.identity._id,followed);
 this._followService.addFollow(this.token,follow).subscribe(

response=>{
if(!response.follow){
this.status='error';
}
else{
	this.status='success';
	//añadimos el id del usuario que acabamos de seguir
	this.follows.push(followed);
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
//dejar de seguir recibe el id del usuario que vamos de dejar de seguir
UnfollowUser(followed){
this._followService.deleteFollow(this.token,followed).subscribe(
response=>{
	//busque el followed dentro el array de follow
	//si encuentra el id dentro del array , sera SEARCH !-1 sera diferente a -1
	//si no lo encuentra sera -1
	var search=this.follows.indexOf(followed);
	if(search!= -1){
		//splice elimina el elemto que he ecnontrado 
		//1 de parametro para borrar 1 elemento
this.follows.splice(search,1);
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

}