import { Component } from '@angular/core';
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
  isContentHidden: boolean = false;
}
