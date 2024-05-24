import {LightningElement, wire} from 'lwc';
import ContentMessage from '@salesforce/messageChannel/content__c';
import getContent from '@salesforce/apex/contentHandler.getContent';
import {MessageContext, subscribe, unsubscribe} from 'lightning/messageService';
import {NavigationMixin} from "lightning/navigation";
import {encodeDefaultFieldValues} from "lightning/pageReferenceUtils";
export default class ContentComponent extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;
    subscription = null;
    recordId;
    recordType;
    connectedCallback() {
        this.subscription = subscribe(this.messageContext, ContentMessage, (message) => {
            this.handleMessage(message);
        });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        console.log(message);
        this.recordId = message.recordId;
        this.recordType = message.recordType;
    }

    @wire(getContent, {
        recordId: '$recordId',
        recordType: '$recordType'
    }) wiredData;

    get Contents() {
        // console.log(this.wiredData.data);
        return this.wiredData.data;
    }

    get hasContent() {
        console.log(this.wiredData.data);
        let a = this.wiredData.data;
        console.log(a);
        if (this.wiredData.data && a == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    handleNewContent() {
        let defaultValues;
        if (this.recordType == 'Course') {
            defaultValues = encodeDefaultFieldValues({
                Course__c: this.recordId
            });
        }
        else if (this.recordType == 'Section') {
            defaultValues = encodeDefaultFieldValues({
                Section__c: this.recordId
            });
        }
        else {
            defaultValues = encodeDefaultFieldValues({
                Topic__c: this.recordId
            });
        }
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Content__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }
}