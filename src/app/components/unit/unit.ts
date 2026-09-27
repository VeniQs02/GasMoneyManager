import {Component, Input} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  imports: [
    NgStyle,
    NgClass
  ],
  selector: 'unit',
  styleUrl: './unit.css',
  templateUrl: './unit.html',
})
export class Unit {
  @Input({required: true}) unitTitle: String = '';
  @Input({required: true}) unitIcon: String = '';
  isContentHidden: boolean = false;
}
