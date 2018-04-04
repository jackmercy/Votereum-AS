import { browser, element, by } from 'protractor';

export class LoginPage {
    navigateTo() {
      // Navigate to the home page of the app
      return browser.get('/');
    }

    getInputName() {
        return element(by.css('#input-name'));
    }

    getInputId() {
        return element(by.css('#input-id'));
    }

    getSignInButton() {
      return element(by.css('#sign-in-btn'));
    }

    getSnackBar() {
        return element(by.className('mat-simple-snackbar'));
    }

    getSnackButton() {
        return element(by.className('mat-simple-snackbar-action'));
    }

    /* selectNextKey() {
    browser.actions().sendKeys(Key.ARROW_RIGHT).perform();
    } */

    login(name, id) {
        this.getInputName().sendKeys(name);
        this.getInputId().sendKeys(id);

        expect(this.getSignInButton().isEnabled()).toBe(true);

        this.getSignInButton().click();
    }
}
