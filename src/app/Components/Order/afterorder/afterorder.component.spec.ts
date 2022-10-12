import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfterorderComponent } from './afterorder.component';

describe('AfterorderComponent', () => {
  let component: AfterorderComponent;
  let fixture: ComponentFixture<AfterorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfterorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfterorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
