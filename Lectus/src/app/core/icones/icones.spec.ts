import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Icones } from './icones';
import { provideRouter } from '@angular/router';

describe('Icones', () => {
  let component: Icones;
  let fixture: ComponentFixture<Icones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Icones],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Icones);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
