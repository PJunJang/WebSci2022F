import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pt3Component } from './pt3.component';

describe('Pt3Component', () => {
  let component: Pt3Component;
  let fixture: ComponentFixture<Pt3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Pt3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Pt3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
