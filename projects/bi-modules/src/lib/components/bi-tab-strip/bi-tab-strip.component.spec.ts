import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BITabStripComponent } from './bi-tab-strip.component';

describe('BITabStripComponent', () => {
  let component: BITabStripComponent;
  let fixture: ComponentFixture<BITabStripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BITabStripComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BITabStripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
