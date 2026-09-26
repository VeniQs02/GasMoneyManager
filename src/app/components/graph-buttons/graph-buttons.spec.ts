import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GraphButtons } from './graph-buttons';

describe('GraphButtons', () => {
  let component: GraphButtons;
  let fixture: ComponentFixture<GraphButtons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GraphButtons],
    }).compileComponents();

    fixture = TestBed.createComponent(GraphButtons);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
