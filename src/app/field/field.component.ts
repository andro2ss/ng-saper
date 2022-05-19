import {
  Component,
  EventEmitter,
  Input,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FieldComponentModel } from '../models/FieldComponent.Model';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
  constructor() {}

  @Input() fData?: FieldComponentModel;
  @Output() fState = new EventEmitter<number>();
  fieldState = -1;

  emitFState(fState: number) {
    this.fState.emit(fState);
  }

  onClick(event: any) {
    if (this.fieldState === -1) {
      this.fieldState = event.button;
      event.path[0].classList.add('activeted');

      if (this.fData?.bomb) {
        this.emitFState(-1);
      }
    }
  }

  onAuxClick(event: any) {
    if (this.fieldState !== 0) {
      if (this.fieldState === -1) {
        if (event.button === 1) {
          event.path[0].classList.add('block');
          this.fieldState = 1;
        } else {
          event.path[0].classList.add('mineThere');
          this.fieldState = 2;
        }
      } else if (this.fieldState === 1) {
        if (event.button === 1) {
          event.path[0].classList.remove('block');
          this.fieldState = -1;
        } else {
          event.path[0].classList.remove('block');
          event.path[0].classList.add('mineThere');
          this.fieldState = 2;
        }
      } else if (this.fieldState === 2) {
        if (event.button === 2) {
          event.path[0].classList.remove('mineThere');
          this.fieldState = -1;
        } else {
          event.path[0].classList.add('block');
          event.path[0].classList.remove('mineThere');
          this.fieldState = 1;
        }
      }
    }
  }
}
