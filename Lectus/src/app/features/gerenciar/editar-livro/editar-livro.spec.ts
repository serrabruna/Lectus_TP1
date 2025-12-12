import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarLivro } from './editar-livro';
import { provideRouter } from '@angular/router';

describe('EditarLivro', () => {
  let component: EditarLivro;
  let fixture: ComponentFixture<EditarLivro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarLivro],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarLivro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
