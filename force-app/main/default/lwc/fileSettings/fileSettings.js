// LWC

import {LightningElement, wire} from 'lwc';
import getFiles from '@salesforce/apex/FileHandler.getFilesWithTitle';
import {refreshApex} from '@salesforce/apex';
import updateFile from '@salesforce/apex/FileHandler.updateFile';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
const columns = [
    {
        label: 'Id', fieldName: 'Id'
    },
    {
        label: 'Name', fieldName: 'Name', editable: true
    },
    {
        label: 'Download Link', fieldName: 'ContentDownloadUrl',
    },
    {
        label: 'Public Url', fieldName: 'DistributionPublicUrl',
    },
    {
        label: 'Total Views', fieldName: 'ViewConunt'
    }
];
export default class FileSettings extends LightningElement {
    columns = columns;
    @wire(getFiles) wiredData({
        data, error
    }) {
        if (data) {
            console.log(data);
        }
        else if (error) {
            console.log(error);
        }
    }
    draftValues = [];
    async handleSave(event) {
        this.draftValues = event.detail.draftValues;
        await updateFile({ListOfFiles: this.draftValues});
        this.draftValues = [];
        this.dispatchEvent(
            new ShowToastEvent(
                {
                    title: "Success",
                    varaint: 'success',
                    message: 'Record update successfully'
                }
            )
        );
        await refreshApex(this.wiredData);
    }
    catch(error) {
        this.dispatchEvent(new ShowToastEvent({
            title: 'Error',
            varaint: 'error',
            message: error.body.message
        }));
    }
}