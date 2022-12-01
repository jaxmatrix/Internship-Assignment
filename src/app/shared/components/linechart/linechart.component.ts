import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid,
  ApexNonAxisChartSeries
} from "ng-apexcharts";
import { Observable, Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries | ApexNonAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit, AfterViewInit {

  @Input() updateEvent !: Observable<any>;
  updateListener !: Subscription;

  @Input() title : string = '';

  @ViewChild("chart") chart?: ChartComponent;
  public chartOptions?: Partial<ChartOptions> | any;

  lineData : ApexAxisChartSeries = [];
  constructor() {
    this.lineData = [
      {
        data: [

        ]
      }
    ]
    this.chartOptions = {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },

      dataLabels: {
        enabled: true
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: this.title,
        align: "center"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        type: "datetime",
        labels: {
          rotate:90
        }
      }
    };
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.chartOptions.title = {
      text: this.title,
      align: "center"
    }

    this.updateListener = this.updateEvent.subscribe(data => {
      // console.log("Updating LineChart", data);
      // this.chartOptions.series.data = this.chartOptions.series.push(data);
      // console.log(this.chartOptions.series);
      if(this.lineData[0].data.length > 8)
        this.lineData[0].data.splice(0,1);
      this.lineData[0].data.push(data);
      // console.log(this.lineData);
      this.chart?.updateSeries(this.lineData);
    })
  }
}
