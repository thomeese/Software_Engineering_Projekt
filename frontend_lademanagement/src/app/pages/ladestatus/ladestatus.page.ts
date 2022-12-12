import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-ladestatus',
  templateUrl: './ladestatus.page.html',
  styleUrls: ['./ladestatus.page.scss'],
})
export class LadestatusPage implements OnInit {
  percentage = Math.floor(Math.random() * 100);
  batteryFluidColor: string;

  constructor() {
  }

  changeBattery() {
    const batteryStatus = document.querySelector('.battery-level');
    const batteryPercentage = document.querySelector('.battery-percentage');
    batteryPercentage.innerHTML = this.percentage + '%';
    if (this.percentage <= 20) {
      this.batteryFluidColor = 'red';
    } else if (this.percentage <= 40) {
      this.batteryFluidColor = 'orange';
    }else if (this.percentage <= 80) {
      this.batteryFluidColor = 'yellow';
    }else if (this.percentage <= 100) {
      this.batteryFluidColor = 'lightgreen';
    }
  }

  ngOnInit() {
    this.changeBattery();
  }

}
