import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor() {}

  mapSize: number = 10;
  @Output() mapControl = new EventEmitter<number>();

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
  }
}
