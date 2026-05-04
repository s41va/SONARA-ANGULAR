import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEdit } from './usuarios-edit';

describe('UsuariosEdit', () => {
  let component: UsuariosEdit;
  let fixture: ComponentFixture<UsuariosEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
