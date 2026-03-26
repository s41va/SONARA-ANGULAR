import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsEdit } from './artists-edit';

describe('ArtistsEdit', () => {
  let component: ArtistsEdit;
  let fixture: ComponentFixture<ArtistsEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistsEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
