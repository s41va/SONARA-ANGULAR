import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadesEdit } from './localidades-edit';

describe('LocalidadesEdit', () => {
  let component: LocalidadesEdit;
  let fixture: ComponentFixture<LocalidadesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalidadesEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalidadesEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
