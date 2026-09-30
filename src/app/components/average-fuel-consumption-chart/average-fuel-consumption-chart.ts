import {Component, Input, OnChanges} from '@angular/core';

@Component({
  imports: [],
  selector: 'average-fuel-consumption-chart',
  styleUrl: './average-fuel-consumption-chart.css',
  templateUrl: './average-fuel-consumption-chart.html',
})
export class AverageFuelConsumptionChart implements OnChanges {

  @Input() fuelingDate: string[] = [];
  @Input() lpg: (number | null)[] = [];
  @Input() petrol: (number | null)[] = [];
  @Input() mileage: (number | null)[] = [];

  @Input() priceDate: string[] = [];
  @Input() lpgPrice: (number | null)[] = [];
  @Input() petrolPrice: (number | null)[] = [];

  AverageLPGConsumptionPer100km: number = 0;
  AverageLPGPrice: number = 0;
  AveragePetrolConsumptionPer100km: number = 0;
  AveragePetrolPrice: number = 0;

  ngOnChanges(): void {
    this.calculateAverage();
  }

  private calculateAverage(): void {
    const firstMileage = this.mileage[0] ?? 0;
    const lastMileage = this.mileage[this.mileage.length - 1] ?? 0;

    const kilometers = lastMileage - firstMileage;

    const totalLPG = this.lpg.reduce<number>(
      (sum, value) => sum + (value == null ? 0 : Number(value)),
      0
    );

    const totalPetrol = this.petrol.reduce<number>(
      (sum, value) => sum + (value == null ? 0 : Number(value)),
      0
    );

    if (kilometers <= 0) {
      this.AverageLPGConsumptionPer100km = 0;
      this.AveragePetrolConsumptionPer100km = 0;
      return;
    }

    const validLPGPrices = this.lpgPrice?.filter(
      (price): price is number => price !== null
    ) ?? [];

    const validPetrolPrices = this.petrolPrice?.filter(
      (price): price is number => price !== null
    ) ?? [];

    this.AverageLPGPrice = validLPGPrices.length > 0
      ? validLPGPrices.reduce((sum, price) => sum + price, 0) / validLPGPrices.length
      : 0;

    this.AverageLPGPrice = Math.round(this.AverageLPGPrice * 100) / 100;

    this.AveragePetrolPrice = validPetrolPrices.length > 0
      ? validPetrolPrices.reduce((sum, price) => sum + price, 0) / validPetrolPrices.length
      : 0;

    this.AveragePetrolPrice = Math.round(this.AveragePetrolPrice * 100) / 100;

    this.AverageLPGConsumptionPer100km =
      this.AverageLPGPrice > 0
        ? Math.round((totalLPG / this.AverageLPGPrice) / kilometers * 10000) / 100
        : 0;

    this.AveragePetrolConsumptionPer100km =
      this.AveragePetrolPrice > 0
        ? Math.round((totalPetrol / this.AveragePetrolPrice) / kilometers * 10000) / 100
        : 0;
  }
}

