import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginForm } from './login-form';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../service/login.service';
import { of } from 'rxjs';
import { Header } from '../../../core/header/header';
import { provideRouter } from '@angular/router';

// Criar um mock do serviço para evitar chamadas reais
class MockLoginService {
  logarUsuario() {
    return of({ message: 'Mock login OK' });
  }
}

describe('LoginForm', () => {
  let component: LoginForm;
  let fixture: ComponentFixture<LoginForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginForm,
        RouterTestingModule, // Simula rotas
      ],
      providers: [
        { provide: LoginService, useClass: MockLoginService }, // evita erro de injeção
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
