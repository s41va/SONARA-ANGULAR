import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Concierto } from './concierto';

describe('Concierto', () => {
  let component: Concierto;
  let fixture: ComponentFixture<Concierto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Concierto],
    }).compileComponents();

    fixture = TestBed.createComponent(Concierto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
