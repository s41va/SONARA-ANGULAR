import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresEdit } from './genres-edit';

describe('GenresEdit', () => {
  let component: GenresEdit;
  let fixture: ComponentFixture<GenresEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(GenresEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
