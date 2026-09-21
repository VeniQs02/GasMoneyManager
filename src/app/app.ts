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
      series: [
        {
          name: 'Revenue',
          type: 'column',
          data: [140, 200, 250, 150, 250, 280, 380, 460, 1],
        },
        {
          name: 'Headcount',
          type: 'column',
          data: [110, 300, 310, 400, 410, 490, 650, 850, 1],
        },
        {
          name: 'Share Price',
          type: 'line',
          data: [20, 29, 37, 36, 44, 45, 50, 58],
        },
      ],
      chart: {
        width: '150%',
        type: 'line',
        stacked: false,
      },
      title: {
        text: 'Company Performance (2017 - 2024)',
        align: 'left',
        offsetX: 110,
      },
      xaxis: {
        categories: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 1],
      }
    };
    const element = document.getElementById("chart");

    if (element) {
      const chart = new ApexCharts(element, options);
      chart.render();
    }
  }
}
