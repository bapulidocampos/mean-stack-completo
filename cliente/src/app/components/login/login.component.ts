import {Component,OnInit}from '@angular/core';
//librerias del router
import{Router,ActivatedRoute,Params}from '@angular/router';
//importamos el modelo
import{User}from '../../models/user';

import {UserService}from '../../services/user.service'; 
@Component({
	selector:'login',
	templateUrl:'./login.component.html',
	providers:[UserService]
})

export class LoginComponent implements OnInit{
public title:string;
public user:User;
constructor(

private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService
){
	this.title='Identificate';
	//this.user=new User("","","","","","","ROLE_USER","") 
}


ngOnInit(){
	console.log('componente de login cargando ...');
}
onSubmit(){
	//alert(this.user.email);
	//alert(this.user.password);
//console.log(this.user);
console.log("todo esta funcionando bien");

}

}