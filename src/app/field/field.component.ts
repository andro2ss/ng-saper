import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss'],
})
export class FieldComponent {
  constructor() {}

  @Input() fieldStyle = { height: 10 + 'px', width: 10 + 'px' };
}
