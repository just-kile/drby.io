import { browser, element, by } from 'protractor';

export class DrbyNgFrontendPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('drby-root h1')).getText();
  }
}
