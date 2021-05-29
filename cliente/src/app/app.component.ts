import { Component,OnInit,DoCheck } from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {UserService}from './services/user.service';
import {GLOBAL } from './services/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[UserService]
})
export class AppComponent implements OnInit,DoCheck {
  public title:string;
  public identity;
    public url:string;

constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService
	){
	
	this.title='ENTRENADOR VIRTUAL';
	this.url=GLOBAL.url;
}

ngOnInit(){
this.identity=this._userService.getidentity();
console.log(this.identity);
}
//metodo para que recargue la pagina
//cada vez que se produzca un cambio en los componente o aplicacion 
//yo puedo refrescar alguna variable
ngDoCheck(){
// cada vez que se produzca un cambio en ese componente yo voy
//actualizar el variable de esta variable y vuelvo consultar el localstorage
this.identity=this._userService.getidentity();
}
logout(){
	localStorage.clear();
	this.identity=null;
	this._router.navigate(['/']);
}



}
