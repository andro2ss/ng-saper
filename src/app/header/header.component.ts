import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private primengConfig: PrimeNGConfig) {}

  @Input() menu: number = 1;

  ngOnInit() {
    this.primengConfig.ripple = true;
  }

  changeStatus(num: number) {
    if (num === 0) {
      return 1;
    } else {
      return 0;
    }
  }

  toggleMenu() {
    this.menu = this.changeStatus(this.menu);
    let menuElement = document.getElementById('menu');
    if (menuElement) {
      menuElement.classList.toggle('close');
    }
  }

  mapSize: number = 10;
  @Output() mapControl = new EventEmitter<number>();
  visibleSidebar: any;

  sendMapControl(value: number) {
    this.mapControl.emit(value);
  }

  changeMap(event: any) {
    let tempSelected = document.getElementsByClassName('selected');
    tempSelected[0].classList.remove('selected');
    event.target.parentElement.classList.add('selected');
    this.mapSize = Number(event.target.value);
  }

  handleStartBtn() {
    this.sendMapControl(this.mapSize);
    this.toggleMenu();
  }
}
