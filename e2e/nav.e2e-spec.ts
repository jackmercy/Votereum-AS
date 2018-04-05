import { browser } from 'protractor';
import { protractor } from 'protractor';
import { NavBar } from './nav.po';
import { LoginPage } from './login.po';
const fs = require('fs');
describe('nav bar testing', () => {
    let nav: NavBar;
    let login: LoginPage;

    function writeScreenShot(data, filename) {
        const stream = fs.createWriteStream(filename);
        stream.write(new Buffer(data, 'base64'));
    }

    beforeEach(() => {
        browser.driver.manage().window().maximize();
        nav = new NavBar();
        login = new LoginPage();
        /* login.navigateTo();
        login.login('test', '123456'); */
    });

    it('should display brand Voilà', () => {
        expect(nav.getBrandName().getText()).toEqual('Voilà');
    });

    it('should display voting', () => {
        expect(nav.getNavVoting().getText()).toEqual('Voting');

        nav.getNavVoting().click();

        browser.takeScreenshot().then(function(png) {
            writeScreenShot(png, './e2e/result/voting-clicked.jpg');
        });
    });

    it('should display scoreboard', () => {
        expect(nav.getNavScoreBoard().getText()).toEqual('Scoreboard');

        nav.getNavScoreBoard().click();

        browser.takeScreenshot().then(function(png) {
            writeScreenShot(png, './e2e/result/ScoreBoard-clicked.jpg');
        });
    });
});
