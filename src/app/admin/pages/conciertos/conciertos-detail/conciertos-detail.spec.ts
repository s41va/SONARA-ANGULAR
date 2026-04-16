import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConciertosDetail } from './conciertos-detail';

describe('ConciertosDetail', () => {
  let component: ConciertosDetail;
  let fixture: ComponentFixture<ConciertosDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConciertosDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ConciertosDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
