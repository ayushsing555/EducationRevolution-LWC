import {LightningElement, api, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {MessageContext, publish} from 'lightning/messageService';
import {fileUpload} from 'c/utils';
import contentMessage from '@salesforce/messageChannel/content__c';
import {NavigationMixin} from 'lightning/navigation';
import fileMessage from '@salesforce/messageChannel/file__c';
import detailMessage from '@salesforce/messageChannel/detail__c';
import getFiles from '@salesforce/apex/FileHandler.getFiles';
export default class SectionTile extends NavigationMixin(LightningElement) {
    @api topic;
    isUpdate = false;
    changeTopicName;
    documentLinkedId;
    @wire(MessageContext) messageContext;
    handleChange(event) {
        if (event.target.name == 'topic')
            this.changeTopicName = event.topic.value;
        else if (event.target.name == 'file') {
            fileUpload(event, this.topic.Id);
            setTimeout(() => {
                const payload = {
                    recordId: this.topic.Id
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
            if (this.changeTopicName == null || this.changeTopicName == '') {
                return this.handleToastEvent('Error', "Section Name Can't be Empty", 'Error');
            }
        }
    }

    viewContent() {
        let payload = {
            recordId: this.topic.Id,
            recordType: 'Topic'
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

    AllPreviewFiles() {
        this.documentLinkedId = this.topic.Id;
        console.log(this.documentLinkedId);
    }
    filesLink = [];
    @wire(getFiles, {
        recordId: '$documentLinkedId'
    }) wiredData({data, error}) {
        if (data) {
            console.log(data);
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

    allFiles() {
        const payload = {
            recordId: this.topic.Id
        };
        publish(this.messageContext, fileMessage, payload);
    }
}