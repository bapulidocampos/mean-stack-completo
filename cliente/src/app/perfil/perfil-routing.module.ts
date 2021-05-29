//
import { NgModule } from '@angular/core';
import{Routes, RouterModule}from '@angular/router';

//import d elos componentes
import {MainComponent} from'./components/main/main.component';
import {AddComponent} from'./components/add/add.component';
import {ReceivedComponent} from'./components/received/received.component';
import {SendedComponent} from'./components/sended/sended.component';

import {ProfileComponent}from './components/profile/profile.component';

//import {PublicationssComponent}from './components/publications/publicationss.component';
//------------CARGAR SERVICIOS DE PRIVACIDAD 
import{UserGuard}from '../services/user.guard';


//que va hacer rutas que va ir detras de mensajes
//ejemplo mensajes/hola   mensajes/recibido 

const messagesRoutes: Routes=[
{
path:'perfil',
component:MainComponent,
children:[
			{path:'',redirectTo:'recibidos',pathMatch:'full'},
			{path:'enviar',component:AddComponent,canActivate:[UserGuard]},
			{path:'recibidos',component:ReceivedComponent,canActivate:[UserGuard]},
			{path:'recibidos/:page',component:ReceivedComponent,canActivate:[UserGuard]},
			{path:'enviados',component:SendedComponent,canActivate:[UserGuard]},
			{path:'enviados/:page',component:SendedComponent,canActivate:[UserGuard]},
			{path:'perfiles',component:ProfileComponent,canActivate:[UserGuard]},
		//	{path:'publications',component:PublicationssComponent,canActivate:[UserGuard]}
		]
	}
];

@NgModule({ 
	imports :[
	//instancia de routser module , llamar el metodo forchild , le vamos a pasar laconfiguracion de esta ruta
	//luego se va a aplicar esta ruta a las rutas globales y le vamos añadir esta configuracion
RouterModule.forChild(messagesRoutes)
	],
	//para poder utiizar fuera de este modulo
	exports:[
		RouterModule
	]
})
export class MessagesRoutingModule{}
