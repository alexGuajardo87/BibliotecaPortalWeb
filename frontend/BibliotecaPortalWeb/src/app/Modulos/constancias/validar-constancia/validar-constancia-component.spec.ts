import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarConstanciaComponent } from './validar-constancia-component';

describe('ValidarConstanciaComponent', () => {
  let component: ValidarConstanciaComponent;
  let fixture: ComponentFixture<ValidarConstanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarConstanciaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValidarConstanciaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
