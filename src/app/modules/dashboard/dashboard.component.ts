import { Component, OnInit } from '@angular/core';
import { Subject, Subscription, switchMap, timer } from 'rxjs';
import { UpdateDataService } from 'src/app/shared/dataServices/update-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {
  energyData = {
    voltage : {
      value: 0,
      max: 100,
    },

    current : {
      value: 0,
      max: 100
    },

    power : {
      value: 0,
      max: 100
    },

    powerfactor : {
      value: 0,
      max: 100
    },

    frequency : {
      value : 0,
      max : 100
    }
  };

  subscription !: Subscription;
  subscriptionPowerLine !: Subscription;
  subscriptionPowerFactorLine !: Subscription;

  updateVoltageGauge : Subject<any> = new Subject();
  updateCurrentGauge : Subject<any> = new Subject();
  updatePowerGauge : Subject<any> = new Subject();
  updatePowerFactor : Subject<any> = new Subject();
  updateFrequency : Subject<any> = new Subject();

  updatePowerLineChart : Subject<any> = new Subject();
  updatePowerFactorLineChart : Subject<any> = new Subject();

  constructor(private dataService: UpdateDataService) {}

  ngOnInit() {
    this.energyData = this.dataService.getEnergyData();

    this.subscription = timer(0,2000).pipe(switchMap( async () => this.dataService.getEnergyData())).subscribe(data => {
      this.energyData.voltage.value += 1;
      this.energyData.current.value += 2;
      this.energyData.power.value += 12;
      this.energyData.powerfactor.value += 0.1;
      this.energyData.frequency.value += 3;

      if (this.energyData.voltage.value >= this.energyData.voltage.max ){
        this.energyData.voltage.value = 0;
      }
      this.updateVoltageGauge.next(this.energyData.voltage);

      if (this.energyData.current.value >= this.energyData.current.max ){
        this.energyData.current.value = 0;
      }
      this.updateCurrentGauge.next(this.energyData.current);

      if (this.energyData.power.value >= this.energyData.power.max ){
        this.energyData.power.value = 0;
      }
      this.updatePowerGauge.next(this.energyData.power);

      if (this.energyData.powerfactor.value >= this.energyData.powerfactor.max ){
        this.energyData.powerfactor.value = 0;
      }
      this.updatePowerFactor.next(this.energyData.powerfactor);

      if (this.energyData.frequency.value >= this.energyData.frequency.max ){
        this.energyData.frequency.value = 0;
      }
      this.updateFrequency.next(this.energyData.frequency);

    });

    this.subscriptionPowerLine = timer(0,2000).pipe(switchMap( async () => this.dataService.getRealtimePowerData())).subscribe(data => {
      // console.log("New Data every 2 second", data);
      this.updatePowerLineChart.next(data);
    });

    this.subscriptionPowerFactorLine = timer(0,2000).pipe(switchMap( async () => this.dataService.getRealtimePowerFactorData())).subscribe(data => {
      // console.log("New Data every 2 second", data);
      this.updatePowerFactorLineChart.next(data);
    });

  }
}
