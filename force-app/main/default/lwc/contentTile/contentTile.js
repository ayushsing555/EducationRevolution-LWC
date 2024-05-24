import {LightningElement, api, wire} from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import {MessageContext, publish} from 'lightning/messageService';
import {fileUpload} from 'c/utils';
import {NavigationMixin} from 'lightning/navigation';
import detailMessage from '@salesforce/messageChannel/detail__c';
import getFiles from '@salesforce/apex/FileHandler.getFiles';
export default class extends NavigationMixin(LightningElement) {
    @api content;
    isUpdate = false;
    changeContentName;

    @wire(MessageContext) messageContext;
    handleChange(event) {
        if (event.target.name == 'content')
            this.changeContentName = event.target.value;
        else if (event.target.name == 'file') {
            fileUpload(event, this.content.Id);
            setTimeout(() => {
                const payload = {
                    recordId: this.content.Id
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
            if (this.changeContentName == null || this.changeContentName == '') {
                return this.handleToastEvent('Error', "Section Name Can't be Empty", 'Error');
            }
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

    AllPreviewFiles() {
        this.documentLinkedId = this.content.Id;
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

    allFiles() {
        const payload = {
            recordId: this.content.Id
        };
        publish(this.messageContext, fileMessage, payload); s;
    }

    viewDetail() {
        const payload = {
            detail: this.content.SubContent_Detail__c
        };
        publish(this.messageContext, detailMessage, payload);
    }

}