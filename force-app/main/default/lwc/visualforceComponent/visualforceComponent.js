import {LightningElement} from 'lwc';
import {NavigationMixin} from 'lightning/navigation';
export default class VisualforceComponent extends NavigationMixin(LightningElement) {
    handleNavigate(event) {
        this.handleNavigation(event);
    }

    handleNavigation(event) {
        const {name} = event.target;
        console.log(name);
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__webPage',
            attributes: {
                url: `/apex/${name}VisualForcePage`
            }
        }).then(generatedUrl => {
            window.open(generatedUrl);
        });
    }
}