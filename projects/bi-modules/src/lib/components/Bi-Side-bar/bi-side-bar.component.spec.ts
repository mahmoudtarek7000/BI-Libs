import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BISideBarComponent } from './bi-side-bar.component';

describe('BISideBarComponent', () => {
  let component: BISideBarComponent;
  let fixture: ComponentFixture<BISideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BISideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BISideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
