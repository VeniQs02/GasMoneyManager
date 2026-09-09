import {Component, Input} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  imports: [
    NgStyle
  ],
  selector: 'divider',
  styleUrl: './divider.css',
  templateUrl: './divider.html',
})
export class Divider {
  @Input() backgroundColor: string = '#eee';
}
