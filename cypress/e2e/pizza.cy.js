describe('OrderPage', () => {
  it('ad soyad alanına metin girmelidir', () => {
    cy.visit(' http://localhost:5174/OrderPage');

    cy.get('[data-cy="name"]')
      .type('Aybuke Yavuz')
      .should('have.value', 'Aybuke Yavuz');
  });
});

describe('OrderPage', () => {
  it('birden fazla malzeme seçilmelidir', () => {
    cy.visit('http://localhost:5174/OrderPage');

    cy.get('[data-cy="Pepperoni"]').check();

    cy.get('[data-cy="Sucuk"]').check();
    cy.get('[data-cy="Sucuk"]').should('be.checked');

    cy.get('[data-cy="Mısır"]').uncheck();
    cy.get('[data-cy="Mısır"]').should('not.be.checked');
  });
});
describe('OrderPage', () => {
  it('formu göndermelidir', () => {
    cy.visit('http://localhost:5174/OrderPage');

    cy.get('[data-cy="name"]').type('Aybuke Filiz');
    cy.get('[data-cy="textarea"]').type('acil olsun lütfen');
    cy.get('[data-cy="size"]').check("small");
    cy.get('[data-cy="thickness"]').select('Orta');
    cy.get('[data-cy="Pepperoni"]').check();
    cy.get('[data-cy="Sosis"]').check();
    cy.get('[data-cy="Sucuk"]').check();
    cy.get('[data-cy="Mısır"]').check();

    cy.get('form').submit();

    cy.url().should('include', '/OrderPage');
  });
});