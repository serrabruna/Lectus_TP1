import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Historico } from './historico';
import { provideRouter } from '@angular/router';

describe('Historico', () => {
  let component: Historico;
  let fixture: ComponentFixture<Historico>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Historico],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Historico);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
