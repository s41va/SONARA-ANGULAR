import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciertosEdit } from './conciertos-edit';

describe('ConciertosEdit', () => {
  let component: ConciertosEdit;
  let fixture: ComponentFixture<ConciertosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciertosEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ConciertosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
