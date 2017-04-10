import { DrbyNgFrontendPage } from './app.po';

describe('drby-ng-frontend App', () => {
  let page: DrbyNgFrontendPage;

  beforeEach(() => {
    page = new DrbyNgFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('drby works!');
  });
});
