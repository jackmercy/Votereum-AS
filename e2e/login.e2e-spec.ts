import { LoginPage } from './login.po';
import { browser } from 'protractor';
import { protractor } from 'protractor';
const fs = require('fs');
describe('sign in testing', () => {
    let page: LoginPage;

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        // browser.driver.manage().window().setSize(width, height);
        page = new LoginPage();
    });

    function writeScreenShot(data, filename) {
        const stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
    }

    it('should display No user is found', () => {
        page.navigateTo();

        page.login('asdfsadf', '123124213');

        const snackBar = page.getSnackBar();
        const ec = protractor.ExpectedConditions;
        browser.driver.wait(ec.presenceOf(snackBar), 1500, 'wait for snack bar').then(function() {
            expect(page.getSnackBar().getText()).toEqual('No user is found\nGot it');
            page.getSnackButton().click();
        });

        browser.takeScreenshot().then(function(png) {
            writeScreenShot(png, './e2e/result/sign-in-error.jpg');
        });
    });

    it('should sign in to home page', () => {

        page.navigateTo();

        page.login('test', '123456');

        browser.takeScreenshot().then(function(png) {
            // expect(browser.getCurrentUrl()).toBe('http://localhost:49152/home/voting');
            writeScreenShot(png, './e2e/result/sign-in-success.jpg');
        });
    });


});
