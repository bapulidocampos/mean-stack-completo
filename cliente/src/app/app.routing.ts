//componentes necesarios configurar router
import{ModuleWithProviders}from '@angular/core';
//crear nuevas rutas y configurarlas
import{Routes, RouterModule}from '@angular/router';
//componentes
import {LoginComponent}from'./components/login/login.component';
import {Login2Component}from'./components/login2/login2.component';
import {RegisterComponent}from'./components/register/register.component';
import {HomeComponent}from'./components/home/home.component';
import {UserEditComponent}from './components/user-edit/user-edit.component';
import {UsersComponent}from './components/users/users.component';
import {TimelineComponent}from './components/timeline/timeline.component';
import {ProfileComponent}from './components/profile/profile.component';
import {FollowingComponent}from './components/following/following.component';
import {FollowedComponent}from './components/followed/followed.component';
import {ExercisesComponent}from './components/exercise/exercises.component';
import {Exercise_getComponent}from './components/exercise_get/exercises_get.component';
import {Rutine_exercise_getComponent}from './components/rutine_exercise_get/rutine_exercise_get.component';
import {BicepComponent}from './components/bicep/bicep.component';
import {ImcComponent}from './components/imc/imc.component';
import {Imc_getComponent}from './components/imc_get/imc_get.component';
import {TricepComponent}from './components/tricep/tricep.component';
import {CardioComponent}from './components/cardio/cardio.component';
import {TipsComponent}from './components/tips/tips.component';
import {ProgresoComponent}from './components/progreso/progreso.component';
import {Progreso_antiguoComponent}from './components/progreso_antiguo/progreso_antiguo.component';
import {BarrasDividendoAnualComponent}from './components/grafica/grafica.component';
import {Rutine_exerciseComponent}from './components/rutine_exercise/rutine_exercise.component';
import {DietComponent}from './components/diet/diet.component';
import {Diet_getComponent}from './components/diet_get/diet_get.component';
import {FoodComponent}from './components/food/food.component';
import {Dieta_get2Component}from './components/dieta_get2/dieta_get2.component';
import {Cuadro_datosComponent}from './components/cuadro_datos/cuadro_datos.component';
//-------------user guard servicio
import{UserGuard}from './services/user.guard';
//constante para que no sea modificable appRoutes
//Routes es el objeto 
//array de objeto json que describe cada una a rutas diferentes
const appRoutes:Routes=[
{path:'',component:HomeComponent},
{path:'login',component:Login2Component},
{path:'registro',component:RegisterComponent},
{path:'home',component:HomeComponent},
{path:'mis-datos',component:UserEditComponent,canActivate:[UserGuard]},
{path:'gente',component:UsersComponent,canActivate:[UserGuard]},
{path:'gente/:page',component:UsersComponent,canActivate:[UserGuard]},
{path:'timeline',component:TimelineComponent,canActivate:[UserGuard]}, 
{path:'exercise',component:ExercisesComponent,canActivate:[UserGuard]},
{path:'tips',component:TipsComponent,canActivate:[UserGuard]},
{path:'exercise_get',component:Exercise_getComponent,canActivate:[UserGuard]},
{path:'bicep',component:BicepComponent,canActivate:[UserGuard]},
{path:'tricep',component:TricepComponent,canActivate:[UserGuard]},
{path:'cardio',component:CardioComponent,canActivate:[UserGuard]},
{path:'imc',component:ImcComponent,canActivate:[UserGuard]},
{path:'imc_get',component:Imc_getComponent,canActivate:[UserGuard]},
{path:'progreso',component:ProgresoComponent,canActivate:[UserGuard]},
{path:'progreso-antiguo',component:Progreso_antiguoComponent,canActivate:[UserGuard]},
{path:'grafica',component:BarrasDividendoAnualComponent,canActivate:[UserGuard]},
{path:'rutine-exercise',component:Rutine_exercise_getComponent,canActivate:[UserGuard]},
{path:'rutine',component:Rutine_exerciseComponent,canActivate:[UserGuard]},
{path:'diet',component:DietComponent,canActivate:[UserGuard]},
{path:'diet_get',component:Diet_getComponent,canActivate:[UserGuard]},
{path:'diet_get2',component:Dieta_get2Component,canActivate:[UserGuard]},
{path:'cuadro',component:Cuadro_datosComponent,canActivate:[UserGuard]},

{path:'food',component:FoodComponent,canActivate:[UserGuard]},
{path:'perfil/:id',component:ProfileComponent,canActivate:[UserGuard]},
{path:'siguiendo/:id/:page',component:FollowingComponent,canActivate:[UserGuard]},
{path:'seguidores/:id/:page',component:FollowedComponent,canActivate:[UserGuard]},
{path:'**',component:HomeComponent}
]; 

export const appRoutingProviders:any[]=[];
export const routing:ModuleWithProviders<any>=RouterModule.forRoot(appRoutes);   