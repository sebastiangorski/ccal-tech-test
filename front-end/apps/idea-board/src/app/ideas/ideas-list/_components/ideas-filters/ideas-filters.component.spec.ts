import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdeasFiltersComponent } from './ideas-filters.component';

describe('IdeasFiltersComponent', () => {
  let component: IdeasFiltersComponent;
  let fixture: ComponentFixture<IdeasFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IdeasFiltersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IdeasFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
