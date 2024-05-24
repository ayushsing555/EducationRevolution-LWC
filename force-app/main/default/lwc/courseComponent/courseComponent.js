import {LightningElement, wire} from 'lwc';
import getCourses from '@salesforce/apex/courseHandler.getCourses';
import {refreshApex} from '@salesforce/apex';
import {NavigationMixin} from 'lightning/navigation';
export default class CourseComponent extends NavigationMixin(LightningElement) {
    searchValue = "";
    error;
    @wire(getCourses, {
        CourseName: '$searchValue'
    }) wiredData;
    get courses() {
        return this.wiredData.data;
    }

    refresh() {
        refreshApex(this.wiredData);
    }

    SwitchTab() {
        this[NavigationMixin.Navigate]({
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Advanced_Features'
            }
        });
    }

    createCourse() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Course__c',
                actionName: 'new'
            }
        });
    }
}