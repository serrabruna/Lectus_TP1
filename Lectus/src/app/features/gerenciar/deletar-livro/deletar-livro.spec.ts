import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletarLivro } from './deletar-livro';
import { provideRouter } from '@angular/router';

describe('DeletarLivro', () => {
  let component: DeletarLivro;
  let fixture: ComponentFixture<DeletarLivro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletarLivro],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletarLivro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
