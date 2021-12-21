import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCategoryMenuComponent } from './property-category-menu.component';

describe('PropertyCategoryMenuComponent', () => {
  let component: PropertyCategoryMenuComponent;
  let fixture: ComponentFixture<PropertyCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropertyCategoryMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
