import {Component,OnInit,DoCheck}from '@angular/core';
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Message } from '../../../models/message';
import {MessageService}from '../../../services/message.service';
import {Follow } from '../../../models/follow';
import {FollowService}from '../../../services/follow.service';
import {User}from '../../../models/user';
import {UserService}from '../../../services/user.service';
import {GLOBAL } from '../../../services/global';




@Component({
	selector:'add',
	templateUrl:'./add.component.html',
	providers:[FollowService,MessageService]
})

export class AddComponent implements OnInit{
	public title:string;
	public message:Message;
	public identity;
	public token;
	public url;
	public status:string;
	public follows;

	constructor(
private _route:ActivatedRoute,
private _router:Router,
private _messageService:MessageService,
private _followService:FollowService,
private _userService:UserService){
				this.title='Enviar Mensaje';
				this.identity=this._userService.getidentity();
				this.token=this._userService.getToken();
				this.url=GLOBAL.url;
				this.message=new Message('','','','',this.identity._id,'');

	}
	ngOnInit(){
		console.log("el componente add ha sido cargado..")
		this.getMyFollows();
		console.log("identity ñiño "+this.identity.role);

	}
 onSubmit(form){
      console.log(this.message);  

     this._messageService.addMessage(this.token, this.message).subscribe(
             response => {
             	if(response.message){
                 this.status = 'success';
             
                 form.reset();

             	}
                
             },
             error => {
                 this.status = 'error';
                 console.log(<any>error);
             }
         );
     
     
     }
 



getMyFollows(){
	//traigo todos los usuarios clientes
if(this.identity.role=='ROLE_TRAINER'){
	this._followService.getMyFollows(this.token).subscribe(
response=>{
	console.log(response);
this.follows=response.follows;
},
error=>{
console.log(<any>error);
}

		);

}
else{
	//traigo todos los entrenadores
this._followService.getMyFollowse(this.token).subscribe(
response=>{
	console.log(response);
this.follows=response.follows;
},
error=>{
console.log(<any>error);
}

		);





}


}

}