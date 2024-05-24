import {LightningElement, api} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class FileTile extends NavigationMixin(LightningElement) {
    @api file;
    get title() {
        let a = this.file.Title;
        if (a.length > 13)
            return this.file.Title.slice(0, 13) + '...';
        return this.file.Title;
    }
    handleClick() {
        const pageRef = {
            type: 'standard__namedPage',
            attributes: {
                pageName: 'filePreview'
            },
            state: {
                recordIds: this.file.Id
            }
        };
        this[NavigationMixin.Navigate](pageRef);
    }


}