import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BibliotecaCentralComponent } from './biblioteca-central-component';

describe('BibliotecaCentralComponent', () => {
  let component: BibliotecaCentralComponent;
  let fixture: ComponentFixture<BibliotecaCentralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BibliotecaCentralComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BibliotecaCentralComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
