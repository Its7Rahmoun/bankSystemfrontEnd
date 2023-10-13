import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotAuthorazedComponent } from './not-authorazed.component';

describe('NotAuthorazedComponent', () => {
  let component: NotAuthorazedComponent;
  let fixture: ComponentFixture<NotAuthorazedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotAuthorazedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotAuthorazedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
