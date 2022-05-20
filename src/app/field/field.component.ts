import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FieldComponentModel } from '../models/FieldComponent.Model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent implements OnInit {
  constructor() {}

  @Input() fData?: FieldComponentModel;
  @Output() fState = new EventEmitter<FieldComponentModel>();
  tempData?: FieldComponentModel;
  fieldState = -1;
  numSize: { 'font-size': string } = { 'font-size': '40px' };

  emitFState() {
    if (this.tempData) {
      this.fState.emit(this.tempData);
    }
  }

  onClick(event: any) {
    if (this.fieldState === -1) {
      this.fieldState = event.button;
      // @ts-ignore
      this.tempData.activated = true;
      event.path[0].classList.add('activated');
      this.emitFState();
    }
  }

  onAuxClick(event: any) {
    if (this.fieldState !== 0) {
      if (this.fieldState === -1) {
        if (event.button === 1) {
          console.log(typeof event.path[0]);
          event.path[0].classList.add('block');
          this.fieldState = 1;
        } else {
          event.path[0].classList.add('mineThere');
          this.fieldState = 2;
        }
      } else if (this.fieldState === 1) {
        if (event.button === 1) {
          event.path[0].classList.remove('block');
          event.path[1].classList.remove('block');
          this.fieldState = -1;
        } else {
          event.path[0].classList.remove('block');
          event.path[1].classList.remove('block');
          event.path[0].classList.add('mineThere');
          this.fieldState = 2;
        }
      } else if (this.fieldState === 2) {
        if (event.button === 2) {
          event.path[0].classList.remove('mineThere');
          event.path[1].classList.remove('mineThere');
          this.fieldState = -1;
        } else {
          event.path[0].classList.add('block');
          event.path[0].classList.remove('mineThere');
          event.path[1].classList.remove('mineThere');
          this.fieldState = 1;
        }
      }
    }
  }

  ngOnInit() {
    let tempSize: number;
    if (this.fData) {
      this.tempData = this.fData;
      if (this.fData.activated) {
        this.fieldState = 0;
        this.fData.fClass = 'game__field activated';
      }
      tempSize = parseInt(this.fData?.fStyle.height) * 0.7;
      let tempFont: string = tempSize + 'px';
      this.numSize = { 'font-size': tempFont };
    }
  }
}
