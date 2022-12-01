import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateDataService {


  energyData = {
    voltage : {
      value: 120,
      max: 240,
    },

    current : {
      value: 12,
      max: 24
    },

    power : {
      value: 122,
      max: 500
    },

    powerfactor : {
      value: 0.8,
      max: 1
    },

    frequency : {
      value : 50.6,
      max : 60.5
    }
  };

  realtimePowerData : number = 0;

  // energyDataUpdates : Subject<any> = new Subject<any>();

  constructor() {

  }

  getEnergyData() {
    return this.energyData;
  }

  getRealtimePowerData() {
    let value = 2*(Math.random()-0.5)*20 + 120;
    let time = new Date();
    return [time.getTime(), Number(value.toFixed(1))];
  }

  getRealtimePowerFactorData() {
    let value = 2*(Math.random()-0.5)*0.5 + 0.5;
    let time = new Date();
    return [time.getTime(), Number(value.toFixed(1))];
  }
  // getEnergyDataUpdates() {
  //   return this.energyDataUpdates;
  // }

}
