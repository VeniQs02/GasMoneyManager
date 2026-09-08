import { Component, signal } from '@angular/core';
import {Unit} from './components/unit/unit';
import {Title} from './components/title/title';

@Component({
  imports: [Unit, Title],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('GasMoneyManager');
}
