import {LightningElement, wire} from 'lwc';
import {subscribe, unsubscribe, MessageContext} from 'lightning/messageService';
import sectionMsgService from '@salesforce/messageChannel/section__c';
import getSections from '@salesforce/apex/sectionHandler.getSection';
import {encodeDefaultFieldValues} from "lightning/pageReferenceUtils";
import {NavigationMixin} from "lightning/navigation";
export default class SectionsComponent extends NavigationMixin(LightningElement) {
    courseId;
    @wire(MessageContext) messgeContext;
    subscription = null;
    connectedCallback() {
        this.subscription = subscribe(this.messgeContext, sectionMsgService, (message) => {
            this.handleMessage(message);
        });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        console.log(message);
        this.courseId = message.recordId;
    }

    @wire(getSections, {
        courseId: '$courseId'
    }) wiredData;

    get Sections() {
        return this.wiredData.data;
    }

    get hassection() {
        let a = this.wiredData.data;
        if (this.wiredData.data && a == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    handleNewSection() {
        const defaultValues = encodeDefaultFieldValues({
            Course__c: this.courseId
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Section__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }
}