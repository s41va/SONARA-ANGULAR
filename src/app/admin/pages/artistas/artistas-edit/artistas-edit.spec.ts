import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasEdit } from './artistas-edit';

describe('ArtistasEdit', () => {
  let component: ArtistasEdit;
  let fixture: ComponentFixture<ArtistasEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistasEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistasEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
