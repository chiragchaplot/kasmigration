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
        state: 'searchcourse',
        name: 'Search Courses',
        icon: ' list_alt',
        role: ''
    },
    {
        state: 'view-application-student',
        name: 'View Applications',
        icon: 'desktop_mac',
        role: 'student'
    },
    {
        state: 'view-application',
        name: 'View Applications',
        icon: 'desktop_mac',
        role: 'admin'
    },
    {
        state: 'view-application',
        name: 'View Applications',
        icon: 'desktop_mac',
        role: 'consultant'
    },
    // {
    //     state: 'inactive-accounts',
    //     name: 'Inactive Accounts',
    //     icon: 'warning',
    //     role: 'consultant'
    // },
    // {
    //     state: 'inactive-accounts',
    //     name: 'Inactive Accounts',
    //     icon: 'warning',
    //     role: 'admin'
    // },
    // {
    //     state: 'create-application',
    //     name: 'Create Application',
    //     icon: 'note_add',
    //     role: 'student'
    // },
    // {
    //     state: 'upload-document-student',
    //     name: 'Upload Document',
    //     icon: 'cloud_upload',
    //     role: 'student'
    // },
    {
        state: 'consultant',
        name: 'Manage Consultant',
        icon: 'event_note',
        role: 'admin'
    }
];

@Injectable()
export class MenuItems {
    getMenuItems(): Menu[] {
        return MENUITEMS;
    }
}