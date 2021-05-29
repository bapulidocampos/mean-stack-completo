import {Component,OnInit}from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User}from '../../models/user';
import {UserService}from '../../services/user.service';




@Component({
	selector:'register',
	templateUrl:'./register.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService]
})

export class RegisterComponent implements OnInit{
public title:string;
public user:User;
public status:string;
public martescomida=[];


	constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService
		){
this.title='Registro de Usuario';
this.user=new User("","","","","",
		"",<any>[],"","","",""
		,"") 
}


ngOnInit(){
	console.log('componente de register cargando ...');
}

onSubmit(form){
//console.log(this.user);
//le eestoy pasando un usuario 
//traigo lo que me responde con el subscribe
this.user.allergy=this.martescomida;
this._userService.register(this.user).subscribe(
response=>{
	//si me llega el usuario y la propieedad _id sea realizado exitosamente
	//si me llega l
if(response.user && response.user._id){
	console.log(response.user);
	this.status='success';
	form.reset();
}
else{
	this.status='error';
}

},
error=>{
	console.log(<any>error);
}

);
}


onSubmitemartes(){
	console.log(this.martescomida.length);
	var a=(<HTMLInputElement>document.getElementById("martes")).value;

	this.martescomida.push(a);
		console.log(this.martescomida);
		 
}






}





