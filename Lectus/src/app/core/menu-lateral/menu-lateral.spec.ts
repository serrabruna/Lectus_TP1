import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLateral } from './menu-lateral';
import { provideRouter } from '@angular/router';

describe('MenuLateral', () => {
  let component: MenuLateral;
  let fixture: ComponentFixture<MenuLateral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuLateral],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLateral);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
