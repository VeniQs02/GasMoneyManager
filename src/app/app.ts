import {Component, inject, OnInit} from '@angular/core';
import {Unit} from './components/unit/unit';
import {Title} from './components/title/title';
import ApexCharts from 'apexcharts'
import type { ApexOptions } from 'apexcharts';
import { GalleryComponent, GalleryItem } from '@daelmaak/ngx-gallery';
import {Gas} from './data/Gas';
import {HttpClient} from '@angular/common/http';
import {GraphButtons} from './components/graph-buttons/graph-buttons';

@Component({
  imports: [Unit, Title, GalleryComponent, GraphButtons],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  images: GalleryItem[] = [];

  private http = inject(HttpClient);

  gasData: Gas[] = [];
  date: string[] = [];
  lpg: (number | null)[] = [];
  petrol: (number | null)[] = [];
  mileage: (number | null)[] = [];

  ngOnInit() {
    this.displayChart()
    this.displayGallery()
  }

  displayChart() {
    this.http.get<Gas[]>('/gasData.json').subscribe(data => {
      this.gasData = data;

      for (const gas of data) {
        this.date.push(gas.date);
        this.lpg.push(gas.lpg || null);
        this.petrol.push(gas.petrol || null);
        this.mileage.push(gas.mileage || null);
      }
      this.renderChart();
    });
  }

  renderChart() {
    const options: ApexOptions = {
      series: [
        {
          name: 'LPG',
          data: this.lpg,
        },
        {
          name: 'Petrol',
          data: this.petrol,
        },
        {
          name: 'Mileage',
          type: 'line',
          data: this.mileage,
        }
      ],
      chart: {
        width: '370%',
        height: 450,
        type: 'scatter'
      },
      title: {
        text: 'Fuel prices',
        align: 'left',
        offsetX: 110,
      },

      xaxis: {
        categories: this.date,
      },
      yaxis: [
        {
          seriesName: ['LPG', 'Petrol'],
          title: {
            text: 'Fuel price'
          }
        },
        {
          seriesName: 'Mileage',
          opposite: true,
          title: {
            text: 'Mileage'
          }
        }
      ]
    };

    const element = document.getElementById('chart');
    console.log(document.getElementById('chart'));
    if (element) {
      const chart = new ApexCharts(element, options);
      chart.render();
    }
  }

  displayGallery() {
    for(let i = 0; i < 8; i++) {
      this.images.push({src: '/peugeot/peugeot_' + i + '.jpg', alt: '/peugeot/peugeot_' + i + '.jpg', thumbSrc: '/peugeot/peugeot_' + i + '.jpg'});
    }
  }
}
