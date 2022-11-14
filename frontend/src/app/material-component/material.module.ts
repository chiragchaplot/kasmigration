import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageConsultantComponent } from './manage-consultant/manage-consultant.component';
import { ConsultantComponent } from './dialog/consultant/consultant.component';
import { ManageStudentComponent } from './manage-student/manage-student.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { ViewApplicationStudentComponent } from './view-application-student/view-application-student.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { UploadDocumentStudentComponent } from './upload-document-student/upload-document-student.component';
import { ViewCourseDetailsComponent } from './view-course-details/view-course-details.component';
import { InactiveAccountsComponent } from './inactive-accounts/inactive-accounts.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageConsultantComponent,
    ConsultantComponent,
    ManageStudentComponent,
    SearchCourseComponent,
    ViewApplicationStudentComponent,
    ViewApplicationComponent,
    CreateApplicationComponent,
    UploadDocumentStudentComponent,
    ViewCourseDetailsComponent,
    InactiveAccountsComponent    
  ]
})
export class MaterialComponentsModule {}
