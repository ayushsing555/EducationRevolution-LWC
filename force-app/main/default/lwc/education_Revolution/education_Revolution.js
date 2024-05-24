import {LightningElement} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class Education_Revolution extends NavigationMixin(LightningElement) {
    handleGettingStarted() {
        this.handleNavigation();
    }
    handleNavigation() {
        const pageRef = {
            type: 'standard__navItemPage',
            attributes: {
                apiName: 'Education'
            }
        };
        this[NavigationMixin.Navigate](pageRef);
    }
}