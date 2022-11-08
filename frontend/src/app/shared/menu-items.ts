import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    icon: string;
    role: string;
}

const MENUITEMS = [
    {
        state: 'dashbaord',
        name: 'Dashboard',
        icon: 'dashboard',
        role: ''
    },
    {
        state: 'searchCourse',
        name: 'Search Courses',
        icon: ' list_alt',
        role: ''
    },
    {
        state: 'viewApplications',
        name: 'View Applications',
        icon: 'desktop_mac',
        role: ''
    },
    {
        state: 'inactiveAccounts',
        name: 'Inactive Accounts',
        icon: 'warning',
        role: 'consultant'
    },
    {
        state: 'inactiveAccounts',
        name: 'Inactive Accounts',
        icon: 'warning',
        role: 'admin'
    },
    {
        state: 'matchedStudents',
        name: 'Matched Students',
        icon: 'group',
        role: 'admin'
    },
    {
        state: 'unmatchedStudents',
        name: 'Unmatched Students',
        icon: 'group-add',
        role: 'admin'
    },
    {
        state: 'createApplication',
        name: 'Create Application',
        icon: 'note_add',
        role: 'student'
    },
    {
        state: 'uploadDocument',
        name: 'Upload Document',
        icon: 'cloud_upload',
        role: 'student'
    }
];

@Injectable()
export class MenuItems {
    getMenuItems(): Menu[] {
        return MENUITEMS;
    }
}