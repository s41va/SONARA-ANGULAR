import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SolicitudCrearComponent } from './peticiones-user';

describe('SolicitudCrearComponent', () => {
  let component: SolicitudCrearComponent;
  let fixture: ComponentFixture<SolicitudCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Si tu componente es Standalone, va en imports. 
      // Si es clásico, cámbialo a declarations.
      imports: [
        SolicitudCrearComponent, 
        HttpClientTestingModule, 
        RouterTestingModule,
        ReactiveFormsModule
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});