import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtistsCreate } from './artists-create';

describe('ArtistsCreate', () => {
  let component: ArtistsCreate;
  let fixture: ComponentFixture<ArtistsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtistsCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtistsCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
