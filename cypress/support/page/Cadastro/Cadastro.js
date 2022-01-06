const elements = require("./CadastroElements").ELEMENTS;

class Register {
  accessRegister() {
    cy.visit(`${Cypress.env("baseUrl", "teste/qa/")}`, {
      onBeforeLoad(win) {
        delete win.fetch;
      },
    });
  }

  doRegister(obj) {
    if (obj.name !== "") {
      cy.get(elements.inputName).type(obj.name);
    }
    if (obj.email !== "") {
      cy.get(elements.inputEmail).type(obj.email);
    }
    if (obj.password !== "") {
        cy.get(elements.inputPassword).type(obj.password);
      }
    
    cy.wait(2000);
    cy.get(elements.RegisterButton).click();
  }

  doDelete(position) {  
    cy.wait(3000)
    cy.get(elements.DeleteButton + position).click();
  }

}

export default new Register();
