import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BITabStripTabComponent } from './bi-tab-strip-tab.component';

describe('BITabStripTabComponent', () => {
  let component: BITabStripTabComponent;
  let fixture: ComponentFixture<BITabStripTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BITabStripTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BITabStripTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
