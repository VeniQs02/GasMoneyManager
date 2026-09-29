import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass} from '@angular/common';

@Component({
  imports: [
    NgClass
  ],
  selector: 'graph-buttons',
  styleUrl: './graph-buttons.css',
  templateUrl: './graph-buttons.html',
})
export class GraphButtons {
  @Input() buttonNames: string[] = [];
  selectedButton: string = this.buttonNames[0];

  @Output() selectedButtonChange = new EventEmitter();

  changeSelectedButton(buttonName: string) {
    this.selectedButton = buttonName;
    this.selectedButtonChange.emit(this.selectedButton);
  }
}
