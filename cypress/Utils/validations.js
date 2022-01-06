class Utils {
    validateItemVisible(item) {
      cy.get(item).should("be.visible");
    }
  
    validateTextItemVisible(item, text) {
      cy.get(item).should("contain.text", text);
    }

    
  }
  
  export default new Utils();