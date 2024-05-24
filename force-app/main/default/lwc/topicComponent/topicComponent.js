import {LightningElement, wire} from 'lwc';
import TopicMessage from '@salesforce/messageChannel/topic__c';
import {MessageContext, subscribe, unsubscribe, } from 'lightning/messageService';
import getTopics from '@salesforce/apex/TopicHandler.getTopic';
import {NavigationMixin} from "lightning/navigation";
import {encodeDefaultFieldValues} from "lightning/pageReferenceUtils";
export default class TopicComponent extends NavigationMixin(LightningElement) {
    @wire(MessageContext) messageContext;
    subscription = null;
    sectionId;
    connectedCallback() {
        this.subscription = subscribe(this.messageContext, TopicMessage, (message) => {
            this.handleMessage(message);
        });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }

    handleMessage(message) {
        this.sectionId = message.SectionId;
    }

    @wire(getTopics, {
        SectionId: '$sectionId'
    }) wiredData;

    get topics() {
        console.log(this.wiredData.data);
        return this.wiredData.data;
    }

    get hastopic() {
        console.log(this.wiredData.data);
        let a = this.wiredData.data;
        if (this.wiredData.data && a == 0) {
            return false;
        }
        else {
            return true;
        }
    }

    handleNewTopic() {
        const defaultValues = encodeDefaultFieldValues({
            Sections__c: this.sectionId
        });
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'Topic__c',
                actionName: 'new'
            },
            state: {
                defaultFieldValues: defaultValues
            }
        });
    }

}