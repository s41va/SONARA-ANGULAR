import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conciertos } from './conciertos';

describe('Conciertos', () => {
  let component: Conciertos;
  let fixture: ComponentFixture<Conciertos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Conciertos],
    }).compileComponents();

    fixture = TestBed.createComponent(Conciertos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
