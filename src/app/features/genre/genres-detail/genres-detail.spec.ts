import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenresDetail } from './genres-detail';

describe('GenresDetail', () => {
  let component: GenresDetail;
  let fixture: ComponentFixture<GenresDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenresDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(GenresDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
