import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciertosCreate } from './conciertos-create';

describe('ConciertosCreate', () => {
  let component: ConciertosCreate;
  let fixture: ComponentFixture<ConciertosCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciertosCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ConciertosCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
