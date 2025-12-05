import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaCatalogo } from './lista-catalogo';

describe('ListaCatalogo', () => {
  let component: ListaCatalogo;
  let fixture: ComponentFixture<ListaCatalogo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaCatalogo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaCatalogo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
