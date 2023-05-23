import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIGridLayoutItemComponent } from './bi-grid-layout-item.component';

describe('BIGridLayoutItemComponent', () => {
  let component: BIGridLayoutItemComponent;
  let fixture: ComponentFixture<BIGridLayoutItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIGridLayoutItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BIGridLayoutItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
