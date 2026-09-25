import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JatsGeneratorComponent } from './jats-generator-component';

describe('JatsGeneratorComponent', () => {
  let component: JatsGeneratorComponent;
  let fixture: ComponentFixture<JatsGeneratorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JatsGeneratorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(JatsGeneratorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
