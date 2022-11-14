import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadDocumentStudentComponent } from './upload-document-student.component';

describe('UploadDocumentStudentComponent', () => {
  let component: UploadDocumentStudentComponent;
  let fixture: ComponentFixture<UploadDocumentStudentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadDocumentStudentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadDocumentStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
