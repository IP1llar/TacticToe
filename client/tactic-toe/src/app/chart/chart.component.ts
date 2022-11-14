import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  title = 'ng2-charts-demo';

  @Input() history: ([string, number])[] = [['0',0]]

  @Input() dimensions = [400,200];

  public lineChartData: ChartConfiguration<'line'>['data'] = { // TODO: decide how to display history of first turn or second turn
    labels: this.history.map(el => el[0]),
    datasets: [
      {
        data: this.history.map(el => el[1]),
        tension: 0.5,
        borderColor: 'black', // TODO: Set color to user's choice
        pointBackgroundColor: 'black',
        pointBorderColor: 'black'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
    animation: false

  };
  public lineChartLegend = false;

  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.lineChartData = {
      labels: this.history.map(el => el[0]), 
      datasets: [
        {
          data: this.history.map(el => el[1]),
          tension: 0.5,
          borderColor: 'black',
          pointBackgroundColor: 'black',
          pointBorderColor: 'none'
        }
      ]
    };
  }
}
