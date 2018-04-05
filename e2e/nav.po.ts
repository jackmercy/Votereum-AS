import { browser, element, by } from 'protractor';

export class NavBar {

    getBrandName() {
        return element(by.className('navbar-brand'));
    }

    getNavVoting() {
        return element(by.name('Voting'));
        // return element(by.buttonText('Voting'));
    }

    getNavScoreBoard() {
        return element(by.name('Scoreboard'));
    }
}

