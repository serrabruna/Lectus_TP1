import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardLivro } from './card-livro';
import { DescontoPipe } from '../../../shared/desconto-pipe/desconto-pipe';
import { QuantidadeControle } from '../../../shared/quantidade-controle/quantidade-controle';
import { provideRouter } from '@angular/router';

describe('CardLivro', () => {
  let component: CardLivro;
  let fixture: ComponentFixture<CardLivro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLivro,DescontoPipe, QuantidadeControle],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLivro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
