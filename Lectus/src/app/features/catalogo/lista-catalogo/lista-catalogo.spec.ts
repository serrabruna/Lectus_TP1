import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCatalogo } from './lista-catalogo';
import { provideRouter } from '@angular/router';

describe('ListaCatalogo', () => {
  let component: ListaCatalogo;
  let fixture: ComponentFixture<ListaCatalogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCatalogo],
      providers: [provideRouter([])]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListaCatalogo);
    component = fixture.componentInstance;
    fixture.detectChanges();

    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
