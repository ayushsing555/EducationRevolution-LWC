import {LightningElement, track, wire} from 'lwc';
import {subscribe, unsubscribe, MessageContext} from 'lightning/messageService';
import detailMessage from '@salesforce/messageChannel/detail__c';
export default class DetailComponent extends LightningElement {
    subscription = null;
    @track detail;
    @wire(MessageContext) messageContext;
    connectedCallback() {
        this.subscription = subscribe(this.messageContext, detailMessage, (message) => {
            this.handleMessage(message);
        });
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
        this.subscription = null;
    }
    handleMessage(message) {
        this.detail = message.detail;
    }
}