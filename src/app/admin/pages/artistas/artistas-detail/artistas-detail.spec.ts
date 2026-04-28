import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistasDetail } from './artistas-detail';

describe('ArtistasDetail', () => {
  let component: ArtistasDetail;
  let fixture: ComponentFixture<ArtistasDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistasDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistasDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
