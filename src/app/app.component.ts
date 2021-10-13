import { Component } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { io } from 'socket.io-client';
import {
  SingleDataSet,
  Label,
  monkeyPatchChartJsLegend,
  monkeyPatchChartJsTooltip,
} from 'ng2-charts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})


export class AppComponent {
  teams: any[] = [];
  numberOfTicket:number = 0;
  socket:any;
  teamsData:any

  
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };

  public pieChartLabels: Label[] = ['Melbourne', 'Port Adelaide', 'Geelong Cats', "Brisbane Lions", "Western Bulldogs", "Sydney Swans", "GWS Giants", "Essendon"];
  public pieChartData: SingleDataSet = [500, 500, 500, 500, 500, 500, 500, 500];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor() {
    this.socket = io();
    this.listenToMyEvents();
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }


  listenToMyEvents() {
    this.socket.on("team", (data: any) => {
      console.log(data)
      this.teamsData = data;
    });
  }


  purchaseTickets(){(
    this.socket.emit('purchaseTicketEvent',{
      purchaseTicket: this.purchaseTickets
    })
  )}

  purchaseCount(){(
    this.socket.emit('purchaseCount',{
      numberOfTicket:this.purchaseTickets
    })
  )}

  ngOnInit() {
    this.teams = new Array();
    this.listenToMyEvents();
    this.purchaseTickets();
  }
}
