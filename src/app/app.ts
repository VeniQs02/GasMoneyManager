import {Component, inject, OnInit} from '@angular/core';
import {Unit} from './components/unit/unit';
import {Title} from './components/title/title';
import ApexCharts from 'apexcharts'
import type {ApexOptions} from 'apexcharts';
import {GalleryComponent, GalleryItem} from '@daelmaak/ngx-gallery';
import {Gas} from './data/Gas';
import {HttpClient} from '@angular/common/http';
import {GraphButtons} from './components/graph-buttons/graph-buttons';
import {FuelPrice} from './data/FuelPrice';

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
  fuelingDate: string[] = [];
  lpg: (number | null)[] = [];
  petrol: (number | null)[] = [];
  mileage: (number | null)[] = [];

  fuelPriceData: FuelPrice[] = [];
  priceDate: string[] = [];
  lpgPrice: (number | null)[] = [];
  petrolPrice: (number | null)[] = [];


  ngOnInit() {
    this.prepareCharts()
    this.displayGallery()
  }

  prepareCharts() {
    this.http.get<Gas[]>('/gasData.json').subscribe(data => {
      this.gasData = data;

      for (const gas of data) {
        this.fuelingDate.push(gas.date);
        this.lpg.push(gas.lpg || null);
        this.petrol.push(gas.petrol || null);
        this.mileage.push(gas.mileage || null);
      }
      this.renderFuelingChart();
    });

    this.http.get<FuelPrice[]>('/fuelPricesData.json').subscribe(data => {
      this.fuelPriceData = data;

      for (const fuelPrice of data) {
        this.priceDate.push(fuelPrice.date);
        this.lpgPrice.push(fuelPrice.lpgPrice || null);
        this.petrolPrice.push(fuelPrice.petrolPrice || null);
      }
    })
  }

  displayChart(chartName: string) {
    if (chartName == 'Average fuel price chart') {
      this.renderAverageFuelPriceChart()
    } else if (chartName == 'Fueling chart') {
      this.renderFuelingChart();
    } else if (chartName == 'Fueling price chart') {

    }
  }

  renderFuelingChart() {
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
      xaxis: {
        categories: this.fuelingDate,
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

    const fuelingChart = document.getElementById('chart');
    if (fuelingChart) {
      const chart = new ApexCharts(fuelingChart, options);
      chart.render();
    }
  }

  renderAverageFuelPriceChart() {
    const options: ApexOptions = {
      series: [
        {
          name: 'LPG Price',
          data: this.lpgPrice,
        },
        {
          name: 'Petrol Price',
          data: this.petrolPrice,
        }
      ],
      chart: {
        width: '370%',
        height: 450,
        type: 'line'
      },
      title: {
        text: 'Fuel prices',
        align: 'left',
        offsetX: 110,
      },

      xaxis: {
        categories: this.priceDate,
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

    const averageFuelPriceChart = document.getElementById('chart');
    if (averageFuelPriceChart) {
      const chart = new ApexCharts(averageFuelPriceChart, options);
      chart.render();
    }
  }

  displayGallery() {
    for (let i = 0; i < 8; i++) {
      this.images.push({
        src: '/peugeot/peugeot_' + i + '.jpg',
        alt: '/peugeot/peugeot_' + i + '.jpg',
        thumbSrc: '/peugeot/peugeot_' + i + '.jpg'
      });
    }
  }
}
