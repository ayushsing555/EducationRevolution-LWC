
import createContentVersion from '@salesforce/apex/FileUploaderClass.createContentVersion';
import createContentDocumentLink from '@salesforce/apex/FileUploaderClass.createContentLink'; // Correct function name
import {ShowToastEvent} from 'lightning/platformShowToastEvent';

export function fileUpload(event, recordId) {
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onload = async () => {
        try {
            let base64 = reader.result.split(',')[1];
            let fileName = file.name;

            const contentVersion = await createContentVersion({
                base64: base64,
                fileName: fileName
            });
            const contentLink = await createContentDocumentLink({
                contentVersionId: contentVersion.Id,
                recordId: recordId
            });
            console.log(contentLink);
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    reader.readAsDataURL(file);
}

function handleToastEvent(title, message, variant) {
    const newEvent = new ShowToastEvent({
        title,
        message,
        variant
    });
    this.dispatchEvent(newEvent);
}
