import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConlainuasComponent } from './conlainuas-component';

describe('ConlainuasComponent', () => {
  let component: ConlainuasComponent;
  let fixture: ComponentFixture<ConlainuasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConlainuasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConlainuasComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
