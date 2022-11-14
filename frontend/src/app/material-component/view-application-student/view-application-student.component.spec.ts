import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewApplicationStudentComponent } from './view-application-student.component';

describe('ViewApplicationStudentComponent', () => {
  let component: ViewApplicationStudentComponent;
  let fixture: ComponentFixture<ViewApplicationStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewApplicationStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewApplicationStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
