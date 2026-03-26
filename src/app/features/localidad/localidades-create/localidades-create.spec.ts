import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalidadesCreate } from './localidades-create';

describe('LocalidadesCreate', () => {
  let component: LocalidadesCreate;
  let fixture: ComponentFixture<LocalidadesCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LocalidadesCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(LocalidadesCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
