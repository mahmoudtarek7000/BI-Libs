import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiNavComponent } from './bi-nav.component';

describe('BIModulesComponent', () => {
  let component: BiNavComponent;
  let fixture: ComponentFixture<BiNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
