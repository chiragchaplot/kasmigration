import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouteGuardService } from '../services/routeGuard/route-guard.service';
import { CreateApplicationComponent } from './create-application/create-application.component';
import { InactiveAccountsComponent } from './inactive-accounts/inactive-accounts.component';
import { ManageConsultantComponent } from './manage-consultant/manage-consultant.component';
import { SearchCourseComponent } from './search-course/search-course.component';
import { UploadDocumentStudentComponent } from './upload-document-student/upload-document-student.component';
import { ViewApplicationStudentComponent } from './view-application-student/view-application-student.component';
import { ViewApplicationComponent } from './view-application/view-application.component';
import { ViewStudentDetailsComponent } from './view-student-details/view-student-details.component';



export const MaterialRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: {
            expectedRole: ['admin', 'consultant', 'student']
        }
    },
    {
        path: 'consultant',
        component: ManageConsultantComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'searchcourse',
        component: SearchCourseComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'consultant', 'student']
        }
    },
    {
        path: 'view-application-student',
        component: ViewApplicationStudentComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['student']
        }
    },
    {
        path: 'view-application',
        component: ViewApplicationComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'consultant']
        }
    },
    {
        path: 'create-application',
        component: CreateApplicationComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['student']
        }
    },
    {
        path: 'upload-document-student',
        component: UploadDocumentStudentComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['student']
        }
    },
    {
        path: 'inactive-accounts',
        component: InactiveAccountsComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'consultant']
        }
    },
    {
        path: 'view-student-details',
        component: ViewStudentDetailsComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'consultant']
        }
    }

];
