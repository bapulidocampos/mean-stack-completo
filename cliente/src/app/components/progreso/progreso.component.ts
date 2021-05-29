

//import {Component,OnInit}from '@angular/core';
import {Component,OnInit,EventEmitter, Input,Output,ViewChild,ElementRef} from "@angular/core";
import {Router,ActivatedRoute,Params} from '@angular/router';
import {Imc} from '../../models/imc';
import {GLOBAL } from '../../services/global';
import {UserService}from '../../services/user.service';
import {ImcService}from '../../services/imc.service';
//lo use para el scroll
import * as $ from 'jquery';
//import * as 'moment';

import {ChartDataSets}from 'chart.js';
import {Color, Label}from 'ng2-charts';

 import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
	selector:'progreso',
	templateUrl:'./progreso.component.html',
	//styleUrls: ['./morris.css'],
	  //styleUrls: ['./line-chart.component.scss'],
	//provider para dentro de ella cargar los servicios que quiero tener disponible
providers:[UserService,ImcService]
})
 
export class ProgresoComponent implements OnInit{
	 
//someData[0]=1;
//someData[1]=3;
//someData[2]=2;

//this.lineChartData.data[1]=someData;



/*
[
// 65, 59, 80, 81, 56, 55, 140
//95, 89, 80, 71, 66, 55, 140

    { data:[65, 59, 80, 81, 56, 55, 140] , label: 'My First dataset' },
    { data:[90, 90, 90, 90, 90, 90, 90] , label: 'My Second dataset' }


  ];
*/ 

//['January', 'February', 'March', 'April', 'May', 'June', 'July'];

//this.peso.map(item=>item.peso)
//public lineChartData:ChartDataSets[];
//90, 90, 90, 90, 90, 90, 90

someData: any[] = [];
public lineChartData: ChartDataSets[] = [
   { data:[] , label: 'Mi peso' },
   { data:[] , label: 'Mi imc' },
    // { data:[] , label: 'Mi tmb' },
  //  { data:[] , label: 'My Second dataset' }
  ];

public lineChartLabels:Label[] = [];
public lineChartColors:Color[] = [ 
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'black',

      borderWidth: 2,
    },
   {
      backgroundColor: 'rgba(199, 35, 182, .2)',
      borderColor: 'black',

      borderWidth: 2,
    },
  ];


  //que va hacer responsive nuestro grafico
lineChartOptions= {
    responsive: true 
  };
  lineChartLegend=true;
  lineChartPlugins=[];
  lineChartType="line";

  public chartClicked(e: any): void { }
  public chartHovered(e: any): void { }


//	 this.peso[1]=20;

public title:string;
public identity;
public token; 
public url;
public status:string;
public page;
public edad;
//total de elementos
public total;  
//numero de pagina
public pages; 
public itemsPerPage;
//donde vamos a guardar las publicaciones
public publications:Imc[];
//public exercises:Exercise[];
 
 public peso=[];
public fecha=[];
public imcc=[];
public tmbb=[];
public imccs=[14,46,37,46,48];

public fechamodificada=[];
public list=[];
public num;
 len=this.peso.length;
//console.log(len);

public showImage;
cadenaDelTxt:string;
cadena:string;
file_name:string;
public suma:string;
@Input()user:string;
constructor(
private _route:ActivatedRoute,
private _router:Router,
private _userService:UserService,
private _imcService:ImcService
	){
	this.title='Indice de Masa Corporal';
	this.identity=this._userService.getidentity();
	this.token=this._userService.getToken();
	this.url=GLOBAL.url;
	this.page=1;
	this.num="3,3,2,2,3";
}


ngOnInit(){

//va a recibir una pagina
//adding para agregar mas publicaciones
console.log("usuario visitado"+this.user);
//console.log(response);
//console.log(response.imcs);
//onsole.log("este es el vector de imc"+response.imcs);
//console.log(response.imcs);

//console.log(response.follow_cleans);
//console.log(response.follow_cleanss);


this._imcService.getPublicationss(this.token,this.user,this.page).subscribe(
response=>{
//console.log(this.response.follow_cleanssss);
console.log("aqui esta imc todo");
console.log(response);
console.log(response.follow_cleanssss);
console.log("aqui esta imc todo");
this.peso=response.follow_cleans;
console.log(this.peso);
this.fecha=response.follow_cleanss;
console.log(this.fecha);
console.log("por aqui");
this.imcc=response.follow_cleanssss;
console.log(this.imcc)
this.tmbb=response.follow_cleansss;
console.log(this.tmbb)
const pesaa=response.imcs.map(item=>item.peso);
console.log(pesaa);
console.log("dentro del metodo ");
 console.log(this.lineChartData[0].data); 


 for (var i = 0; i <this.peso.length; i++) {
	 	  this.lineChartData[0].data[i]=(this.peso[i]);
	 	 console.log(this.peso[i]);
	 	 }
	 	  //this.lineChartData[0].data[0]=(beso[0]);
	 	  	 console.log(this.lineChartData[0].data); 
	 	  	 console.log(this.peso);
	 	  	 console.log("por aqui es el ultimo parce");


 for (var i = 0; i <this.imcc.length; i++) {
	 	  this.lineChartData[1].data[i]=(this.imcc[i]);
	 	 console.log(this.imcc[i]);
	 	 }
	 	  //this.lineChartData[0].data[0]=(beso[0]);
	 	  	 console.log(this.lineChartData[1].data); 
	 	  	 console.log(this.imcc);
	 	  	 console.log("por aqui es el ultimo parce");

/*
 for (var i = 0; i <this.tmbb.length; i++) {
	 	  this.lineChartData[2].data[i]=(this.tmbb[i]);
	 	 console.log(this.tmbb[i]);
	 	 }
	 	  //this.lineChartData[0].data[0]=(beso[0]);
	 	  	 console.log(this.lineChartData[1].data); 
	 	  	 console.log(this.imcc);
	 	  	 console.log("por aqui es el ultimo parce");

	 	  	*/


for (var i = 0; i <this.peso.length; i++) {
	 	  this.lineChartLabels[i]=(this.fecha[i]);
	 	 console.log(this.fecha[i]);
	 	 }
	 	  //this.lineChartData[0].data[0]=(beso[0]);
	 	  	 console.log(this.lineChartLabels); 
	 	  	 console.log(this.fecha);
	 	  	 console.log("por aqui es el ultimo parce");



//muestra los labeles

console.log(this.lineChartLabels);
console.log(this.lineChartLabels[0]);

	   var hoy = new Date();
    var cumpleanos = new Date(this.identity.date_birth);
     this.edad = hoy.getFullYear() - cumpleanos.getFullYear();
    var m = hoy.getMonth() - cumpleanos.getMonth();

    if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        this.edad--;
    }

    console.log("esta es mi "+this.edad);
      console.log("esta es mi cumpleanos "+hoy);
       console.log("esta es mi cumpleanos arreglado "+cumpleanos.toDateString());

        console.log("esta es mi cumpleanos "+cumpleanos.getMonth()+1);
   console.log("esta es mi "+cumpleanos.getFullYear());
    //console.log("esta es mi "+this.edad);

var cumpleanoss2 = new Date(this.fecha[0]);
var cumpleanoss3 = new Date(this.fecha[1]);
console.log("por aqui ñiño");
console.log(cumpleanoss2);
console.log(this.fecha[0]);
var fechax=this.fecha[0];
var cumpleanoss23 = new Date(fechax);
console.log(cumpleanoss23);
console.log(this.identity.date_birth);
console.log(fechax);
fechax="";
console.log("vacio "+fechax);

var cumpleanos3;
/*
for (var i = 0; i < this.fecha.length; i++) {
	cumpleanos3 = new Date(this.fecha[i]);
console.log(cumpleanos3);
	this.fechamodificada[i]=cumpleanos3;
	//cumpleanos="";
}
console.log(this.fechamodificada);
*/



if(response.imcs){
	this.total=response.total_items;
	this.pages=response.pages;
	this.itemsPerPage=response.items_per_pag;
	 
	//si la pagina actual es mayor a la pagina que tengo guardada 
if(this.page>this.pages){
	//this._router.navigate(['/home']);
}



}


else{
	this.status='error';
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



//termina el metodo





	//aqui va lo ultimo
	 var beso=[];
     beso[0]=90;
     beso[1]=85;
      beso[2]=80;
       beso[3]=73;
     beso[4]=60;
      beso[5]=50;
	console.log("cargado correctamente");
	 //console.log(this.lineChartData[0].data[0]); 
	 	 console.log(this.lineChartData[0].data); 

//METODO QUE SI FUNCIONA

/*

	 	 for (var i = 0; i <beso.length; i++) {
	 	  this.lineChartData[0].data[i]=(beso[i]);
	 	 console.log(beso[i]);
	 	 }
	 	  //this.lineChartData[0].data[0]=(beso[0]);
	 	  	 console.log(this.lineChartData[0].data); 
	 	  	 console.log(this.peso);
	 	  	 console.log("por aqui es el ultimo parce");



*/





	//this.getPublications(this.page);


}
//termina el onInit





  
 public noMore=false;
//llamar cuando de click al botn
viewMore(){
	this.page+=1;
if(this.page==this.pages){
this.noMore=true;
}
else{
	//this.page+=1;
}
//this.getPublications(this.page,true);
}
refresh(event=null){
//console.log(event);
//this.getPublications(1);
}
//esto es para ver la imagen
showThisImage(id){
this.showImage=id;
}

//para quitar la imagen
hideThisImage(id){
this.showImage=0;
}







//fin del compoente
}


/*





/*
pesaa=>{

	pesaa.forEach((res, i) => {
            this.lineChartData[0]=this.peso[i];
           
          });
}

 var pesoa=[];


 Number  peso3=[];
 peso3[0]=10;
 peso3[1]=20;
 peso3[2]=30;


for (var i = 0; i < this.peso.length; i++) {
	pesoa[i]=this.peso[i];
}
console.log(pesoa);

pesoa => {
pesoa.forEach((res, i) => {
           //this.lineChartData[0].pesoa[i] = res[0];
          // this.lineChartData[1].pesoa[i] = res[0];
         //   this.lineChartData[0] = peso3[i];
            //this.lineChartData[1] = pesoa[i];
           
          });
 }
 //this.lineChartData[0]=pe

for (var i = 0; i < pesoa.length; i++) {
	//this.lineChartData[0]=pesoa[i];
}



console.log(pesaa);
console.log("por aqui");









*/