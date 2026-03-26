import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadesDetail } from './localidades-detail';

describe('LocalidadesDetail', () => {
  let component: LocalidadesDetail;
  let fixture: ComponentFixture<LocalidadesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalidadesDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalidadesDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
