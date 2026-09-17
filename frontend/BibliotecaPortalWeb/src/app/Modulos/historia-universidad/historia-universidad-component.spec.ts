import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriaUniversidadComponent } from './historia-universidad-component';

describe('HistoriaUniversidadComponent', () => {
  let component: HistoriaUniversidadComponent;
  let fixture: ComponentFixture<HistoriaUniversidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoriaUniversidadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HistoriaUniversidadComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
