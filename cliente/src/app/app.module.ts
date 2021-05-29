import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxCaptchaModule } from 'ngx-captcha';
//import { RecaptchaModule } from "ng-recaptcha";
import { ReactiveFormsModule } from '@angular/forms';

import {FormsModule } from '@angular/forms';
//import {HttpModule } from './app.routing';
import {HttpClientModule } from '@angular/common/http';
//importamos lo de la clase routing
import{routing, appRoutingProviders} from './app.routing';
//a este lo instale el paquete angular2 para las fechas
//import{MomentModule}from'angular2-moment';
import { MomentModule } from 'ngx-moment';
//-------------------------CARGAR MODULO CUSTON MENSAJE
import{MessagesModule}from './messages/messages.module';
//------------CARGAR SERVICIOS
import{UserService}from './services/user.service';
import{UserGuard}from './services/user.guard'; 
//graficas
  import { ChartsModule } from 'ng2-charts'
//cargar componentes
import { AppComponent } from './app.component';
import {LoginComponent} from  './components/login/login.component';
import {RegisterComponent}from'./components/register/register.component';
import {Login2Component}from'./components/login2/login2.component';
import {HomeComponent}from './components/home/home.component';
import {UserEditComponent}from './components/user-edit/user-edit.component';
import {UsersComponent}from './components/users/users.component';
import {SidebarComponent}from './components/sidebar/sidebar.component';
import {TimelineComponent}from './components/timeline/timeline.component';
import {PublicationsComponent}from './components/publications/publications.component';
import {ProfileComponent}from './components/profile/profile.component';
import {FollowingComponent}from './components/following/following.component';
import {FollowedComponent}from './components/followed/followed.component';
import {ExercisesComponent}from './components/exercise/exercises.component';
import {Exercise_getComponent}from './components/exercise_get/exercises_get.component';
import {BicepComponent}from './components/bicep/bicep.component';
import {TricepComponent}from './components/tricep/tricep.component';
import {CardioComponent}from './components/cardio/cardio.component';
import {ImcComponent}from './components/imc/imc.component';
import {ImcsComponent}from './components/imcs/imcs.component';
import {Imc_getComponent}from './components/imc_get/imc_get.component';
import {TipsalimentacionComponent}from './components/tipsalimentacion/tipsalimentacion.component';
import {TipsComponent}from './components/tips/tips.component';
import {TipComponent}from './components/tip/tip.component';
import {Rutine_exerciseComponent}from './components/rutine_exercise/rutine_exercise.component';
import {Rutine_exercise_getComponent}from './components/rutine_exercise_get/rutine_exercise_get.component';
import {ProgresoComponent}from './components/progreso/progreso.component';
import {Progreso_antiguoComponent}from './components/progreso_antiguo/progreso_antiguo.component';
import {BarrasDividendoAnualComponent}from './components/grafica/grafica.component';
import {DietComponent}from './components/diet/diet.component';
import {Diet_getComponent}from './components/diet_get/diet_get.component';
import {Dieta_get2Component}from './components/dieta_get2/dieta_get2.component';
import {Cuadro_datosComponent}from './components/cuadro_datos/cuadro_datos.component';

import {FoodComponent}from './components/food/food.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Login2Component,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
    TimelineComponent,
    PublicationsComponent,
    ProfileComponent,
    FollowingComponent,
    FollowedComponent,
    ExercisesComponent,
    Exercise_getComponent,
    BicepComponent,
    ImcComponent,
    Imc_getComponent,
    ImcsComponent,
    TipsalimentacionComponent,
    TipsComponent,
    TricepComponent,
    CardioComponent,
    TipComponent,
    Rutine_exerciseComponent,
    Rutine_exercise_getComponent,
    ProgresoComponent,
    Progreso_antiguoComponent,
    BarrasDividendoAnualComponent,
    DietComponent,
    FoodComponent,
    Diet_getComponent,
     Dieta_get2Component,
     Cuadro_datosComponent
  ], 
  imports: [
     BrowserModule,
      ChartsModule,
    HttpClientModule, 
    FormsModule,
    routing,
    MomentModule,
    MessagesModule,
     NgxCaptchaModule,
    //RecaptchaModule,
    ReactiveFormsModule
   
  ],
  providers: [
  appRoutingProviders,UserService,UserGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
