import orderJson from '../../fixtures/order.json';

describe('проверяем доступность приложения (модальные окна и ингредиенты)', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('http://localhost:4000');
  });

  it('проверка на перехват ингридиентов и добавления в заказ', () => {
    cy.get('[data-cy="bun"]').should('have.length.at.least', 1);
    cy.get('[data-cy="main"],[data-cy="sauce"]').should(
      'have.length.at.least',
      1
    );

    const bun = cy.get('[data-cy="bun"]').find('.common_button');
    const main = cy.get('[data-cy="main"]').find('.common_button');
    const sauce = cy.get('[data-cy="sauce"]').find('.common_button');

    bun.click();
    main.click();
    sauce.click();
  });

  describe('модальные окна', () => {
    it('проверка модального окна (открытие)', () => {
      const main = cy.get('[data-cy="main"]');
      main.click();
      cy.get('#modals').children().should('have.length', 2);
    });

    it('проверка модального окна (открытие && перезагрузка)', () => {
      const main = cy.get('[data-cy="main"]');
      main.click();
      cy.reload(true);
      cy.get('#modals').children().should('have.length', 2);
    });

    it('проверка модального окна (закрытие)', () => {
      cy.get('[data-cy="main"]').click();
      cy.get('#modals button:first-of-type').click();
      cy.wait(200);
      cy.get('#modals').children().should('have.length', 0);
    });

    it('проверка модального окна (закрытие на оверлей)', () => {
      cy.get('[data-cy="main"]').click();
      cy.get('#modals>div:nth-of-type(2)').click({ force: true });
      cy.wait(200);
      cy.get('#modals').children().should('have.length', 0);
    });

    it('проверка модального окна (закрытие esc)', () => {
      cy.get('[data-cy="main"]').click();
      cy.get('body').type('{esc}');
      cy.wait(200);
      cy.get('#modals').children().should('have.length', 0);
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
    cy.visit('http://localhost:4000');
  });

  it('проверка на пустой заказ', () => {
    cy.get('[data-cy="order-button"]').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  it('проверка на оформление заказа', () => {
    cy.get('[data-cy="bun"]').find('.common_button').click();
    cy.get('[data-cy="main"]').find('.common_button').click();
    cy.get('[data-cy="sauce"]').find('.common_button').click();

    cy.get('[data-cy="order-button"]').click();
    cy.get('#modals').children().should('have.length', 2);

    cy.get('#modals h2:first-of-type').should(
      'have.text',
      orderJson.order.number
    );

    cy.get('body').type('{esc}');
    cy.wait(200);
    cy.get('#modals').children().should('have.length', 0);

    cy.get('[data-cy="order-button"]').click();
    cy.get('#modals').children().should('have.length', 0);
  });

  afterEach(() => {
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });
});
