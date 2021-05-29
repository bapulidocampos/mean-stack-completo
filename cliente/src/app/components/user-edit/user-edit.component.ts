import {Component,OnInit}from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {User}from '../../models/user';
import {UserService}from '../../services/user.service';
import {UploadService}from '../../services/upload.service';
import {GLOBAL } from '../../services/global';



@Component({
	selector:'user-edit',
	templateUrl:'./user-edit.component.html',
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,UploadService]
})

export class UserEditComponent implements OnInit{
public title:string;
public user:User;
public status:string;
public identity;
public token;
public url:string;

	constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService,
private _uploadService:UploadService
		){
this.title='Actualizar mis datos';
//traigo lo que esta en el localstorage
this.user=this._userService.getidentity();
this.identity=this.user;
this.token=this._userService.getToken();
this.url=GLOBAL.url;
}

//siempre se ejecuta despues del constructor
ngOnInit(){
	//console.log(this.user);
	console.log('componente user-edit se ha  cargando ...');
	//this.Onsubmit();

    var hoy = new Date();
    var cumpleanos = new Date(this.identity.date_birth);
    var edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
    }

    console.log(edad);



}
onSubmit(){
	console.log("que paso perr");
	//console.log(this.user);
	this._userService.updateUser(this.user).subscribe(
response=>{
	if(!response.user){
		this.status='error';

	}else{
this.status='success';
localStorage.setItem('identity',JSON.stringify(this.user));
this.identity=this.user;
//subida de imagen de usuario
///id del usuario logueado
//
//3 parametro array de fichero a subir
//el toke
//nombre del campo que va recoger el backend ,, asi se llama en el backend image
if(this.filesToUpload && this.filesToUpload.length){
this._uploadService.makeFileRequest(this.url+'upload-image-user/'+this.user._id,[],this.filesToUpload,this.token,'image')
	
//capturo la respueta de lo que me llegue
				.then((result:any)=>{
console.log(result);
//actualizar el valor de ese objeto
//que diga el nombre de la imagen
this.user.image=result.user.image;
//actuaizar la identidad del usuario en local storage
localStorage.setItem('identity',JSON.stringify(this.user));
	});

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

//filetoupliad es un array de tipo fichero
public filesToUpload:Array<File>;
fileChangeEvent(fileInput:any){
	//guardo en esa propiedad , el resultado de los ficheros
	//que yo he marcado , que he seleccionado en mi input
	this.filesToUpload= <Array<File>>fileInput.target.files;
	//array tengo todos los ficheros que voy a subir
console.log(this.filesToUpload);

}


}