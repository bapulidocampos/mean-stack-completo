//PODRIAMOS IMPORTAR UN HTTP PERO NO LO VAMOS A USAR POR QUE 
//VAMOS A TENER ES UN SERVICIO QUE VAMOS USAR DE MANERA GLOBAL EN LA APLICACION

//importar los modulos necesarios
import { NgModule } from '@angular/core';
import {CommonModule}from '@angular/common';
//para poder utilizar formularios shudatavine?
import {FormsModule} from '@angular/forms';

//importar RUTAS
import {MessagesRoutingModule} from'./messages-routing.module';

//IMPORTAMOS LOS COMPONENTES
import {MainComponent} from'./components/main/main.component';
import {AddComponent} from'./components/add/add.component';
import {ReceivedComponent} from'./components/received/received.component';
import {SendedComponent} from'./components/sended/sended.component';
//PARA  LAS FECHAS
import { MomentModule } from 'ngx-moment';


//------------CARGAR SERVICIOS DE PRIVACIDAD 
import{UserService}from '../services/user.service';
import{UserGuard}from '../services/user.guard';

//declarations => son los COMPONENTES
//import => son los modulos ya sean internos o externos 
//export=> se cargan los servicios o exportar componentes para poder utilizarlos fuera de este modulo
//provider => los servicios que tengamos en este caso vamos a tenerlos vacio
//PERO LO VAMOS A USAR EN EL FUTURO PARA RESTRINGIR EL ACCESO A LAS DIFERENTES ZONAS DE LA APLICACION
  

@NgModule({
declarations:[
				MainComponent,
				AddComponent,
				ReceivedComponent,
				SendedComponent
],
imports:[
			CommonModule,
			FormsModule,
			MessagesRoutingModule,
			MomentModule

],
exports:[
		MainComponent,
		AddComponent,
		ReceivedComponent,
		SendedComponent
	],
providers:[UserGuard,UserService]
})
export class MessagesModule{}