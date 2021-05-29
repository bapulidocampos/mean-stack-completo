import {Component,OnInit}from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User}from '../../../models/user';
import {Follow } from '../../../models/follow';
import {UserService}from '../../../services/user.service';
import {FollowService}from '../../../services/follow.service';
import {GLOBAL } from '../../../services/global';


@Component({
	selector:'profile',
	templateUrl:'./profile.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,FollowService]
})

export class ProfileComponent implements OnInit{
public title:string;
public user:User;
public status:string;
public identity;
public token;
//estadisticas
public stats;
public url;
//guardar si el usuario nos sigue o no nos sigue, o si lo estamos siguiendo o no
public followed; 
public following;

constructor(
private _userService:UserService,
private _followService:FollowService,
private _route:ActivatedRoute,
private _router:Router){
this.title='perfil';
this.identity=this._userService.getidentity();
this.token=this._userService.getToken();
//this.stats=this._userService.getStats();
this.url=GLOBAL.url;
this.followed=false;
this.following=false;


}

ngOnInit(){
	console.log("perfil ha sido cargado");
	this.loadPage();
}

loadPage(){

this._route.params.subscribe(params=>{
	let id=params['id'];
	this.getUser(id);
	this.getCounters(id);

});

}



getUser(id){
this._userService.getUser(id).subscribe(
response=>{
if(response.user){
	console.log(response);
this.user=response.user;
//if(response.following._id){
if(response && response.following && response.following._id){ 


//significa que lo estoy siguiendo	
this.following=true;
}else{
	this.following=false;
}

//if(response.followed._id){
if(response && response.followed && response.followed._id){
//significa que soy seguido por el
this.followed=true;
}else{
	this.followed=false;
}

}
else{
	this.status='error';
}

},
error=>{
	console.log(<any>error);
	this._router.navigate(['/perfil/recibidos',this.identity._id]);
}


	);
}


getCounters(id){


this._userService.getCounters(id).subscribe(
response=>{
//	console.log(response);
this.stats=response;

},
error=>{
	console.log(<any>error);

}


	);

}

//boton seguir usuario
followUser(followed){
var follow=new Follow('',this.identity._id,followed);
this._followService.addFollow(this.token,follow).subscribe(
response=>{
this.following=true;
},
error=>{
	console.log(<any>error);
}

	);
}

//boton de dejar de seguir usuario
unfollowUser(followed){
//var follow=new Follow('',this.identity._id,followed);
this._followService.deleteFollow(this.token,followed).subscribe(
response=>{
this.following=false;
},
error=>{
	console.log(<any>error);
}

	);
}


//EFECTO DEL BOTON
public followUserOver;
mouseEnter(user_id){
this.followUserOver=user_id;
}

mouseLeave(){
this.followUserOver=0;
}





}
