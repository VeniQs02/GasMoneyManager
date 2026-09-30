import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AverageFuelConsumptionChart } from './average-fuel-consumption-chart';

describe('AverageFuelConsumptionChart', () => {
  let component: AverageFuelConsumptionChart;
  let fixture: ComponentFixture<AverageFuelConsumptionChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AverageFuelConsumptionChart],
    }).compileComponents();

    fixture = TestBed.createComponent(AverageFuelConsumptionChart);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
