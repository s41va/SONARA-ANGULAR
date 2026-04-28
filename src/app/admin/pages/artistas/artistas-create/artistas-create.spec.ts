import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasCreate } from './artistas-create';

describe('ArtistasCreate', () => {
  let component: ArtistasCreate;
  let fixture: ComponentFixture<ArtistasCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistasCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistasCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
