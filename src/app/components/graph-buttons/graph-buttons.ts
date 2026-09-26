import {Component, Input} from '@angular/core';

@Component({
  imports: [],
  selector: 'graph-buttons',
  styleUrl: './graph-buttons.css',
  templateUrl: './graph-buttons.html',
})
export class GraphButtons {
  @Input() buttonNames: string[] = [];
}
