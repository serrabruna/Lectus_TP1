import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { RouterTestingModule } from '@angular/router/testing';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        Header,            // seu componente standalone
        RouterTestingModule // corrige erro de RouterLink / ActivatedRoute
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
