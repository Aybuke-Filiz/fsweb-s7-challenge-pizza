describe('Order Page', () => {
  describe("Error Messages",()=>{
    it('name input throws error for 3 chars', () => {
      //Arange
      cy.visit(' http://localhost:5173/');
      //Act
      cy.get(`[data-cy="name-input"]`).type("emr");
      //assert
      cy.contains();

  })
  
  })
})