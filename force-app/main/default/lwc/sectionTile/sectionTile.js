import {LightningElement, api, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import TopicMessageService from '@salesforce/messageChannel/topic__c';
import contentMessage from '@salesforce/messageChannel/content__c';
import {MessageContext, publish} from 'lightning/messageService';
import {fileUpload} from 'c/utils';
import getFiles from '@salesforce/apex/FileHandler.getFiles';
import {NavigationMixin} from 'lightning/navigation';
import fileMessage from '@salesforce/messageChannel/file__c';
import detailMessage from '@salesforce/messageChannel/detail__c';
export default class SectionTile extends NavigationMixin(LightningElement) {
    @api section;
    isUpdate = false;
    changeSectionName;
    documentLinkedId;
    @wire(MessageContext) messageContext;
    handleChange(event) {
        if (event.target.name == 'section')
            this.changeSectionName = event.target.value;
        else if (event.target.name == 'file') {
            fileUpload(event, this.section.Id);
            setTimeout(() => {
                const payload = {
                    recordId: this.section.Id
                };
                publish(this.messageContext, fileMessage, payload);
                this.handleToastEvent('success', 'File Successfully uploaded', 'success');
            }, 7000);
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
    changeName() {
        this.isUpdate = !this.isUpdate;
        if (!this.isUpdate) {
            if (this.changeSectionName == null || this.changeSectionName == '') {
                return this.handleToastEvent('Error', "Section Name Can't be Empty", 'Error');
            }
        }
    }
    viewTopic() {
        let payload = {
            SectionId: this.section.Id
        };
        publish(this.messageContext, TopicMessageService, payload);
        payload = {
            recordId: null,
            recordType: null
        };
        publish(this.messageContext, contentMessage, payload);
        payload = {
            detail: null
        };
        publish(this.messageContext, detailMessage, payload);
    }

    handleToastEvent(title, message, variant) {
        const newEvent = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(newEvent);
    }

    viewContent() {
        const payload = {
            recordId: this.section.Id,
            recordType: 'Section'
        };
        publish(this.messageContext, contentMessage, payload);
    }

    AllPreviewFiles() {
        this.documentLinkedId = this.section.Id;
        console.log(this.documentLinkedId);
    }
    filesLink = [];
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
            return this.handleToastEvent('errror', 'No files Atteched', 'error');
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
    }

    showAllFiles() {
        const payload = {
            recordId: this.section.Id
        };
        publish(this.messageContext, fileMessage, payload);
    }

}