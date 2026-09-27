import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DividerVertical} from './divider-vertical';

describe('DividerVertical', () => {
  let component: DividerVertical;
  let fixture: ComponentFixture<DividerVertical>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DividerVertical],
    }).compileComponents();

    fixture = TestBed.createComponent(DividerVertical);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
