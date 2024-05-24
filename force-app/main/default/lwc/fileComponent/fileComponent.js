import {LightningElement, wire} from 'lwc';
import {subscribe, unsubscribe, MessageContext, publish} from 'lightning/messageService';
import fileMessage from '@salesforce/messageChannel/file__c';
import {NavigationMixin} from 'lightning/navigation';
import getFiles from '@salesforce/apex/FileHandler.getFiles';
import {refreshApex} from '@salesforce/apex';
import getFilesWithName from '@salesforce/apex/FileHandler.getFilesWithName';
export default class FileComponent extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;
    recordId;
    subscription = null;
    connectedCallback() {
        this.subscription = subscribe(this.messageContext, fileMessage, (message) => {
            this.handleMessage(message);
        });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.recordId = message.recordId;
        refreshApex(this.wiredData);
    }

    @wire(getFilesWithName, {
        recordId: '$recordId'
    }) wiredData;

    get files() {
        return this.wiredData.data;
    }


    get hasfile() {
        let a = this.wiredData.data;
        if (this.wiredData.data && a == 0) {
            return false;
        }
        else {
            return true;
        }
    }

}