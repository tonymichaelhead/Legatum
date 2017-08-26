import { LegatumClientPage } from './app.po';

describe('legatum-client App', () => {
  let page: LegatumClientPage;

  beforeEach(() => {
    page = new LegatumClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
