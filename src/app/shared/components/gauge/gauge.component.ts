import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ApexFill, ApexNonAxisChartSeries, ApexPlotOptions, ChartComponent } from 'ng-apexcharts';
import { Observable, Subscription } from 'rxjs';

export type ChartOptions = {
  series: ApexNonAxisChartSeries | ApexAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  fill: ApexFill;
};

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit, AfterViewInit {

  @Input() labels: Array<string> = [];
  @Input('c-value') value?: number;
  @Input('c-max') max?: number;
  @Input() updateEvent !: Observable<any>;
  @ViewChild('gauge', { static : false}) gauge !: ChartComponent;
  @Input() formatterFunction !: (args: any) => string;


  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  plotOptions: ApexPlotOptions;
  fill: ApexFill;

  public chartOptions !: Partial<ChartOptions>;
  private updateListener !: Subscription;


  ngAfterViewInit(): void {

    this.updateListener = this.updateEvent.subscribe((data)=>{
      // console.log(`Updateing ${this.labels[0]}`, data);
      let dataValue = Number((data.value/data.max*100).toFixed(1));
      this.value = data.value;
      this.max = data.value;

      this.formatterFunction = (d: number ) => {
        let value = d/100*data.max;
        return value.toFixed(2);
      }

      this.series = [dataValue]

      this.plotOptions = {
        radialBar: {
          startAngle: -90,
          endAngle: 90,
          hollow: {
            margin: 15,
            size: '72%',
            // color: '#00cc00'
          },
          track: {
            background: "#e7e7e7",
            strokeWidth: "12%",
            margin: 5, // margin is in pixels
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              opacity: 0.31,
              blur: 2,
            }
          },
          dataLabels: {

            name: {
              show: true,
              fontSize: '18px',
              offsetY: 64,
              color: '#475569',
            },
            value: {
              offsetY: -2,
              fontSize: "42px",
              formatter: this.formatterFunction
            }
          }
        }
      };

    })
  }

  ngOnInit() {
    this.value = this.value || 0;
    this.max = this.max || 100;

    let seriesValue = this.value/this.max*100;
    this.series = [Number(seriesValue.toFixed(1))];


  }


  constructor() {

    this.value = this.value || 0;
    this.max = this.max || 100;

    let max = this.max;


    this.formatterFunction = (d : number ) => {
      let value = d/100*max;
      return d.toFixed(1);
    }

    let seriesValue = this.value/this.max*100;
    this.series = [Number(seriesValue.toFixed(1))];
    this.chart = {
      type: 'radialBar',
      toolbar: {
        show: false
      }
    }

    this.plotOptions = {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: {
          margin: 15,
          size: '72%',
          // color: '#00cc00'
        },
        track: {
          background: "#e7e7e7",
          strokeWidth: "12%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            opacity: 0.31,
            blur: 2,
          }
        },
        dataLabels: {

          name: {
            show: true,
            fontSize: '18px',
            offsetY: 64,
            color: '#475569',
          },
          value: {
            offsetY: -2,
            fontSize: "48px",
            formatter: this.formatterFunction
          }
        }
      }
    };

    this.fill = {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91]
      }
    }

    this.chartOptions = {
      series : [Number(seriesValue.toFixed(2))],

    }

  }
}

