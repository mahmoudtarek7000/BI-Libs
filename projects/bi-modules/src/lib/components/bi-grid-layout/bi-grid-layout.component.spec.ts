import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BIGridLayoutComponent } from './bi-grid-layout.component';

describe('BIGridLayoutComponent', () => {
  let component: BIGridLayoutComponent;
  let fixture: ComponentFixture<BIGridLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BIGridLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BIGridLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
