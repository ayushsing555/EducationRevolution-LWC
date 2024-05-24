import {LightningElement, api, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import updateCourseName from '@salesforce/apex/courseHandler.updateCourse';
import sectionMsgService from '@salesforce/messageChannel/section__c';
import contentMessage from '@salesforce/messageChannel/content__c';
import {MessageContext, publish} from 'lightning/messageService';
import {fileUpload} from 'c/utils';
import getFiles from '@salesforce/apex/FileHandler.getFiles';
import topic from '@salesforce/messageChannel/topic__c';
import content from '@salesforce/messageChannel/content__c';
import {NavigationMixin} from 'lightning/navigation';
import fileMessage from '@salesforce/messageChannel/file__c';
import detailMessage from '@salesforce/messageChannel/detail__c';
import deleteCourseName from '@salesforce/apex/courseHandler.deleteCourse';
export default class CourseTile extends NavigationMixin(LightningElement) {
    @api course;
    isUpdate = false;
    isLoading = false;
    documentLinkedId;

    @wire(MessageContext) messageContext;

    subscription = null;
    deleteCourse() {
        deleteCourseName({
            recordId: this.course.Id
        }).then((res) => {
            this.handleToastEvent('Success', "courseName successfully changed", 'Success');
            return this.dispatchEventToParentForRefreshApex();
        }).catch((err) => {
            return this.handleToastEvent('Error', "Something went wrong", 'error');
        });
    }

    courseChangeValue;

    handleChange(event) {
        if (event.target.name == 'course')
            this.courseChangeValue = event.target.value;
        else if (event.target.name == 'file') {
            this.isLoading = true;
            fileUpload(event, this.course.Id);
            setTimeout(() => {
                this.isLoading = false;
                const payload = {
                    recordId: this.course.Id
                };
                publish(this.messageContext, fileMessage, payload);
                this.handleToastEvent('success', 'File Successfully uploaded', 'success');
            }, 7000);
        }
    }

    changeName() {
        this.isUpdate = !this.isUpdate;
        if (!this.isUpdate) {
            if (this.courseChangeValue == '' || this.courseChangeValue == null) {
                return this.handleToastEvent('Error', "Course Name can't be empty", 'error');
            }
            updateCourseName({
                CourseName: this.courseChangeValue,
                CourseId: this.course.Id
            }).then((res) => {
                this.handleToastEvent('Success', "courseName successfully changed", 'Success');
                return this.dispatchEventToParentForRefreshApex();
            }).catch((error) => {
                return this.handleToastEvent('Error', "Something went wrong", 'error');
            });
        }
    }

    get getIcon() {
        if (this.isUpdate) {
            return 'action:approval';

        }
        else {
            return 'action:edit_relationship';
        }
    }

    handleToastEvent(title, message, variant) {
        const newEvent = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(newEvent);
    }
    dispatchEventToParentForRefreshApex() {
        const newEvent = new CustomEvent('update');
        this.dispatchEvent(newEvent);
    }
    viewCourse() {
        console.log('ayush');
        let payload = {
            recordId: this.course.Id
        };
        publish(this.messageContext, sectionMsgService, payload);
        payload = {
            SectionId: null,
        };
        publish(this.messageContext, topic, payload);

        payload = {
            recordId: null,
            recordType: null
        };
        publish(this.messageContext, content, payload);

        payload = {
            detail: null
        };
        publish(this.messageContext, detailMessage, payload);
    }

    viewContent() {
        const payload = {
            recordId: this.course.Id,
            recordType: 'Course'
        };
        publish(this.messageContext, contentMessage, payload);
    }

    AllPreviewFiles() {
        this.documentLinkedId = this.course.Id;
        console.log(this.documentLinkedId);
    }
    @wire(getFiles, {
        recordId: '$documentLinkedId'
    }) wiredData({data, error}) {
        if (data) {
            this.NavigateFiles(data);
        }
        else if (error) {
            console.log(error);
        }
    }

    NavigateFiles(filesData) {
        if (filesData == 0) {
            this.handleToastEvent('errror', 'No files Atteched', 'error');
            return this.dispatchEventToParentForRefreshApex();
        }
        this[NavigationMixin.Navigate]({
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                recordIds: filesData.join(",")
            }
        });
        return this.dispatchEventToParentForRefreshApex();
    }

    seeAllFiles() {
        const payload = {
            recordId: this.course.Id
        };
        publish(this.messageContext, fileMessage, payload);
    }
}