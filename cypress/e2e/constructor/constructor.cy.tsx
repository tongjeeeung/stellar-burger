import orderJson from '../../fixtures/order.json';

const testUrl = 'http://localhost:4000';
const bunSelector = '[data-cy="bun"]';
const mainSelector = '[data-cy="main"]';
const sauceSelector = '[data-cy="sauce"]';
const orderButtonSelector = '[data-cy="order-button"]';
const modalsSelector = '#modals';

describe('проверяем доступность приложения (модальные окна и ингредиенты)', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit(testUrl);
  });

  it('проверка на перехват ингридиентов и добавления в заказ', () => {
    cy.get(bunSelector).should('have.length.at.least', 1);
    cy.get(`${mainSelector}, ${sauceSelector}`).should(
      'have.length.at.least',
      1
    );

    const bun = cy.get(bunSelector).find('.common_button');
    const main = cy.get(mainSelector).find('.common_button');
    const sauce = cy.get(sauceSelector).find('.common_button');

    bun.click();
    main.click();
    sauce.click();
  });

  describe('модальные окна', () => {
    it('проверка модального окна (открытие)', () => {
      const main = cy.get(mainSelector);
      main.click();
      cy.get(modalsSelector).children().should('have.length', 2);
    });

    it('проверка модального окна (открытие && перезагрузка)', () => {
      const main = cy.get(mainSelector);
      main.click();
      cy.reload(true);
      cy.get(modalsSelector).children().should('have.length', 2);
    });

    it('проверка модального окна (закрытие)', () => {
      cy.get(mainSelector).click();
      cy.get(modalsSelector + ' button:first-of-type').click();
      cy.wait(200);
      cy.get(modalsSelector).children().should('have.length', 0);
    });

    it('проверка модального окна (закрытие на оверлей)', () => {
      cy.get(mainSelector).click();
      cy.get(modalsSelector + '>div:nth-of-type(2)').click({ force: true });
      cy.wait(200);
      cy.get(modalsSelector).children().should('have.length', 0);
    });

    it('проверка модального окна (закрытие esc)', () => {
      cy.get(mainSelector).click();
      cy.get('body').type('{esc}');
      cy.wait(200);
      cy.get(modalsSelector).children().should('have.length', 0);
    });
  });
});

describe('проверяем оформление заказа', () => {
  beforeEach(() => {
    cy.setCookie('accessToken', 'token');
    localStorage.setItem('refreshToken', 'token');

    cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.intercept('POST', 'api/orders', { fixture: 'order' });
    cy.visit(testUrl);
  });

  it('проверка на пустой заказ', () => {
    cy.get(orderButtonSelector).click();
    cy.get(modalsSelector).children().should('have.length', 0);
  });

  it('проверка на оформление заказа', () => {
    cy.get(bunSelector).find('.common_button').click();
    cy.get(mainSelector).find('.common_button').click();
    cy.get(sauceSelector).find('.common_button').click();

    cy.get(orderButtonSelector).click();
    cy.get(modalsSelector).children().should('have.length', 2);

    cy.get(modalsSelector + ' h2:first-of-type').should(
      'have.text',
      orderJson.order.number
    );

    cy.get('body').type('{esc}');
    cy.wait(200);
    cy.get(modalsSelector).children().should('have.length', 0);

    cy.get(orderButtonSelector).click();
    cy.get(modalsSelector).children().should('have.length', 0);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
