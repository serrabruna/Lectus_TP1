import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumoPedido } from './resumo-pedido';
import { provideRouter } from '@angular/router';

describe('ResumoPedido', () => {
  let component: ResumoPedido;
  let fixture: ComponentFixture<ResumoPedido>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumoPedido],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumoPedido);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
