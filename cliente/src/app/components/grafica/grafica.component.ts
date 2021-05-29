import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-barras-dividendo-anual',
  templateUrl: './grafica.component.html',
 // styleUrls: ['./barras-dividendo-anual.component.css']
})
export class BarrasDividendoAnualComponent implements OnInit {

  // Barras
  public barChartData: ChartDataSets[] = [
    { data: [5, 10], label: 'IE00B0M62S72 - iShares Euro Dividend UCITS ETF EUR' },
    { data: [20, 40], label: 'IE00B14X4T88 - iShares Asia Pacific Dividend UCITS ETF USD' },
    { data: [9, 4], label: 'IE00B0M63177 - iShares MSCI Emerging Markets UCITS ETF' },
    { data: [15, 10], label: 'IE00B27YCK28 - iShares MSCI EM Latin America UCITS ETF USD' }
  ];


  // Eje X
  public barChartLabels: Label[] = ['2019', '2020'];

  // Opciones de la gráfica
  public barChartOptions: ChartOptions = {
    responsive: true,
    // maintainAspectRatio: false,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    title: {
      text: 'Dividendo Anual',
      fontSize: 20,
      fontColor: 'rgba(0,0,0,1)',
      display: true
    },
    legend: {
      position: 'bottom',
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };

  // Colores de las barras
  public barChartColors: Color[] = [
    { // Euro - Azul
      backgroundColor: 'rgba(0,0,255,1)',
      borderColor: 'rgba(0,0,255,1)',
      hoverBackgroundColor: 'rgba(0,0,255,1)',
      hoverBorderColor: 'rgba(0,0,255,1)'
    },
    { // Asia - Rojo
      backgroundColor: 'rgba(255,0,0,1)',
      borderColor: 'rgba(255,0,0,1)',
      hoverBackgroundColor: 'rgba(255,0,0,1)',
      hoverBorderColor: 'rgba(255,0,0,1)'
    },
    { // Emerging Markets - Amarillo
      //backgroundColor: 'rgba(255,255,0,1)',
      borderColor: 'rgba(255,255,0,1)',
      hoverBackgroundColor: 'rgba(255,255,0,1)',
      hoverBorderColor: 'rgba(255,255,0,1)'
    },
    { // Latin America - Verde
    //  backgroundColor: 'rgba(0,255,0,1)',
      borderColor: 'rgba(0,255,0,1)',
      hoverBackgroundColor: 'rgba(0,255,0,1)',
      hoverBorderColor: 'rgba(0,255,0,1)'
    }
  ];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  constructor() { }

  ngOnInit() {
     var peso=[];
     peso[0]=2;
     peso[1]=3;
      peso[1]=4;
   //  peso[1]=3;
   console.log(peso);
 console.log(this.barChartData[0].data); 
  console.log(this.barChartData[0].data[0]); 
   console.log(this.barChartData[0].data); 
   //this.barChartData[0].data[0]=(peso[1]);
   this.barChartData[0].data[0]=(peso);
   console.log(this.barChartData[0].data[0]); 
  // console.log(this.barChartData[1].data[0]); 
 

 //this.barChartData[0]
  //console.log(this.barChartData[1]); 

  }


}