import {Component,OnInit}from '@angular/core';
import {FormGroup, FormControl, Validators, FormBuilder}from '@angular/forms';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User}from '../../models/user';
import {UserService}from '../../services/user.service';




@Component({
	selector:'login2',
	templateUrl:'./login2.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService]
})

export class Login2Component implements OnInit{
	public aFormGroup: FormGroup;

public title:string;
public user:User;
public status:string;
public identity;
public token;
siteKey:string
type:string;
public estado;
public mensaje;


	constructor(private formBuilder: FormBuilder,
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService
		){
		this.siteKey="6LeVxtUaAAAAAJGfds0JTYai_NEqTVsN6iqI5-uU";
		this.type="image";
this.title='Login';
this.user=new User("","","","","",
		"",
		<any>[],
		"",
		"",  
		"ROLE_USER",
		"","") 
} 


ngOnInit(){
	 this.aFormGroup = this.formBuilder.group({
      recaptcha: ['', Validators.required]
    });
  
	console.log('componente de register cargando ...');
	console.log(this.aFormGroup);
}


onSubmit(){
//console.log("esta sirviendo login2");
//alert(this.user.email);
//alert(this.user.password);
//loguear el usuario y conseguir sus datos
this.estado=this.aFormGroup.status
this.user.recaptcha=this.aFormGroup.value.recaptcha;
//this.user.recaptcha=this.estado;
this._userService.signup(this.user).subscribe(
	response=>{
		console.log(response);
		console.log(response.msg);
		this.mensaje=response.msg;

		this.identity=response.user;
		console.log(this.identity);
//console.log(response.user);
if(!this.identity || !this.identity._id){
	this.status='error';
}else{
//this.status="success"
//**persistir datos del usuario

//local storage CADA URL TIENE SU PROPIO LOCALSTORAGE
//para guardar los datos del usuario y el token para acceder a esta informacion
//desde culaquier url de nuestra web , para permitir la informacion a modo de sesion
//CARACTERISTICAS -no puede guardar obejtos de java script , por eso lo convertimos a string
localStorage.setItem('identity',JSON.stringify(this.identity));

//**conseguir el token	
this.gettoken();
}

	},
	error=>{
		var errorMessage=<any>error;
		console.log("error message");
		if(errorMessage!=null){
			this.status='error';
		}
	}
	);
}

gettoken(){

	this._userService.signup(this.user,'true').subscribe(
	response=>{

		this.token=response.token;
console.log(this.token);
if(this.token.length<=0){
	this.status='error';
}else{
//this.status="success"
//** persistir token del usuario
//local storage CADA URL TIENE SU PROPIO LOCALSTORAGE
//para guardar los datos del usuario y el token para acceder a esta informacion
//desde culaquier url de nuestra web , para permitir la informacion a modo de sesion
//CARACTERISTICAS -no puede guardar obejtos de java script , por eso lo convertimos a string
localStorage.setItem('token',JSON.stringify(this.token));


//** conseguir los contadores o esgtadisticas del usuario
this.getcounter();
}

	},
	error=>{
		var errorMessage=<any>error;
		console.log("error message");
		if(errorMessage!=null){
			this.status='error';
		}
	}
	);
}

getcounter(){
//llamar el servicio sacar la estadistica o los contadiores
	this._userService.getCounters().subscribe(
response=>{
console.log(response);
localStorage.setItem('stats',JSON.stringify(response));
this.status='success';
//hacer la redireccion , navegar a otra url	
this._router.navigate(['/']);
},
error=>{
	console.log(<any>error);
}
		)
}

catcha(){
	//var a=(<HTMLInputElement>document.getElementById("martes")).value;
	const captcha = document.querySelector('#g-recaptcha-response');
	console.log("aqui va el capchat señores ");
console.log(captcha);
console.log(this.aFormGroup);
console.log(this.aFormGroup.status);
var abc=this.aFormGroup;
console.log("aqui la variables recatcha");
console.log(abc);
console.log(this.aFormGroup.value.recaptcha);
	//var response = grecaptcha.getResponse();
//	console.log(response);
//ngx-recaptcha2
//var response = vcRecaptchaService.getResponse(widgetId);
//var response = ngxRecaptcha.getResponse;
//console.log(response);
//	console.log(myFields.myRecaptchaResponse); 
	
}

}






