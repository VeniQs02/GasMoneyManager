import {Component, Input, OnChanges} from '@angular/core';

@Component({
  imports: [],
  selector: 'statistics',
  styleUrl: './statistics.css',
  templateUrl: './statistics.html',
})
export class Statistics implements OnChanges {

  @Input() fuelingDate: string[] = [];
  @Input() lpg: (number | null)[] = [];
  @Input() petrol: (number | null)[] = [];
  @Input() mileage: (number | null)[] = [];

  @Input() priceDate: string[] = [];
  @Input() lpgPrice: (number | null)[] = [];
  @Input() petrolPrice: (number | null)[] = [];

  AverageLPGConsumptionPer100km: number = 0;
  AverageLPGPrice: number = 0;
  LPGPriceIncreasePercent: number = 0;
  TotalLPG: number = 0;
  AveragePetrolConsumptionPer100km: number = 0;
  AveragePetrolPrice: number = 0;
  PetrolPriceIncreasePercent: number = 0;
  TotalPetrol: number = 0;
  Kilometers: number = 0;
  Savings: number = 0;

  ngOnChanges(): void {
    this.calculateChart();
  }

  private calculateChart(): void {
    const firstMileage = this.mileage[0] ?? 0;
    const lastMileage = this.mileage[this.mileage.length - 1] ?? 0;

    this.Kilometers = lastMileage - firstMileage;

    const totalLPG = this.lpg.reduce<number>(
      (sum, value) => sum + (value == null ? 0 : Number(value)),
      0
    );

    const totalPetrol = this.petrol.reduce<number>(
      (sum, value) => sum + (value == null ? 0 : Number(value)),
      0
    );

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
        ? Math.round((totalLPG / this.AverageLPGPrice) / this.Kilometers * 10000) / 100
        : 0;

    this.AveragePetrolConsumptionPer100km =
      this.AveragePetrolPrice > 0
        ? Math.round((totalPetrol / this.AveragePetrolPrice) / this.Kilometers * 10000) / 100
        : 0;

    this.LPGPriceIncreasePercent = validLPGPrices.length >= 2
      ? Math.round(
      ((validLPGPrices[validLPGPrices.length - 1] - validLPGPrices[0]) /
        validLPGPrices[0]) * 10000
    ) / 100
      : 0;

    this.PetrolPriceIncreasePercent = validPetrolPrices.length >= 2
      ? Math.round(
      ((validPetrolPrices[validPetrolPrices.length - 1] - validPetrolPrices[0]) /
        validPetrolPrices[0]) * 10000
    ) / 100
      : 0;

    this.TotalLPG = Math.round(this.AverageLPGConsumptionPer100km * this.Kilometers) /100;
    this.TotalPetrol = Math.round(this.AveragePetrolConsumptionPer100km * this.Kilometers) / 100;

    this.Savings = Math.round(this.TotalLPG * (this.AverageLPGPrice - this.AveragePetrolPrice) * 100) / 100;
  }
}

