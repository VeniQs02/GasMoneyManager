import {AfterViewInit, Component} from '@angular/core';
import {Unit} from './components/unit/unit';
import {Title} from './components/title/title';
import ApexCharts from 'apexcharts'
import type { ApexOptions } from 'apexcharts';
import { GalleryComponent, GalleryItem } from '@daelmaak/ngx-gallery';

@Component({
  imports: [Unit, Title, GalleryComponent],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  images: GalleryItem[] = [{ src: 'favicon.png', alt: 'essa', thumbSrc:'favicon.png' }, { src: 'favicon.png', alt: 'essa' }];

  ngAfterViewInit() {
    const options: ApexOptions = {
      chart: {
        type: 'line'
      },
      series: [{
        name: 'sales',
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
      }],
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      }
    }
    const element = document.getElementById("chart");

    if (element) {
      const chart = new ApexCharts(element, options);
      chart.render();
    }
  }
}
