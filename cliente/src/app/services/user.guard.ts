import { Injectable } from '@angular/core';
//canactivate  va a permitir que hagamos el guard y comprobar si podemos acceder a la ruta o no
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {UserService}from './user.service';
import { Observable } from "rxjs/Observable";
 
@Injectable()
export class UserGuard implements CanActivate {
    constructor( 
    	private _router: Router,
    	private _userService:UserService) {
    	 }
 
    canActivate(){
    	//traer identity
    	let identity=this._userService.getidentity();
      //si identity existe y ademas tiene el role_user o igual role_admin
        if(identity &&(identity.role=='ROLE_USER'|| identity.role=='ROLE_ADMIN'
            ||identity.role=='ROLE_TRAINER')){
			return true;

        }
        else{
        	//en el caso que no se cumple lo lleve al login
        	this._router.navigate(['/login']);
        	return false;
        }
   
    }


    
}