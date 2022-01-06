/// <reference types="cypress" />
import Register from "../support/page/Cadastro/Cadastro";
const elements = require("../support/page/Cadastro/CadastroElements").ELEMENTS;
import Utils from "../Utils/validations";
const faker = require("faker-br");


describe("Cadastrar usuário", ()=> {

    const client = {
        name: faker.name.firstName() + " " + faker.name.lastName(),
        email: faker.internet.email(),
        password: "12345678"

    };

    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();
        Register.accessRegister();
      });

      it("Validar carregamento de campos vazios", ()=> {
        Utils.validateItemVisible(elements.inputName);
        Utils.validateItemVisible(elements.inputEmail);
        Utils.validateItemVisible(elements.inputPassword);
        Utils.validateTextItemVisible(
                elements.inputName, '');
        Utils.validateTextItemVisible(
                elements.inputEmail, '');
        Utils.validateTextItemVisible(
                elements.inputPassword, '');

        
        });

        it("Cadastrar usuário sem preencher nenhum campo", ()=> {
            const clientWithoutInfo = Object.create(client);

            clientWithoutInfo.name = "";
            clientWithoutInfo.email = "";
            clientWithoutInfo.password = "";

            Register.doRegister(clientWithoutInfo);
            Utils.validateItemVisible(elements.ErrorMessage);
            Utils.validateTextItemVisible(
                elements.ErrorMessage, "O campo Nome é obrigatório.");
            Utils.validateTextItemVisible(
                    elements.ErrorMessage, "O campo E-mail é obrigatório.");
            Utils.validateTextItemVisible(
                        elements.ErrorMessage, "O campo Senha é obrigatório.");

            
            
            });

        it("Cadastrar usuário sem nome", ()=> {
            const clientWithoutName = Object.create(client);
            clientWithoutName.name = "";
            Register.doRegister(clientWithoutName);
            Utils.validateItemVisible(elements.ErrorMessage);
            Utils.validateTextItemVisible(
                elements.ErrorMessage, "O campo Nome é obrigatório.");

            
            
            });

        it("Cadastrar usuário sem e-mail", ()=> {
                const clientWithoutEmail = Object.create(client);
                clientWithoutEmail.email = "";
                Register.doRegister(clientWithoutEmail);
                Utils.validateItemVisible(elements.ErrorMessage);
                Utils.validateTextItemVisible(
                    elements.ErrorMessage, "O campo E-mail é obrigatório.");
    
                
                
                });

        it("Cadastrar usuário sem senha", ()=> {
                const clientWithoutPassword = Object.create(client);
                clientWithoutPassword.password = "";
                Register.doRegister(clientWithoutPassword);
                Utils.validateItemVisible(elements.ErrorMessage);
                Utils.validateTextItemVisible(
                elements.ErrorMessage, "O campo Senha é obrigatório.");
            
                        
                    });

        it("Cadastrar usuário com o primeiro nome", ()=> {
                const clientWithFirstName = Object.create(client);
                clientWithFirstName.name = "Pedro";
                Register.doRegister(clientWithFirstName);
                Utils.validateItemVisible(elements.ErrorMessage);
                Utils.validateTextItemVisible(
                elements.ErrorMessage, "Por favor, insira um nome completo.");
                
                            
                            
                    });

        it("Cadastrar usuário com e-mail inválido", ()=> {
                const clientWithEmailInvalid = Object.create(client);
                clientWithEmailInvalid.email = "testeqa@1";
                Register.doRegister(clientWithEmailInvalid);
                Utils.validateItemVisible(elements.ErrorMessage);
                Utils.validateTextItemVisible(
                elements.ErrorMessage, "Por favor, insira um e-mail válido.");
                        
                                    
                                    
                    });
        
        it("Cadastrar usuário com senha menor de 8 caracteres", ()=> {
                const clientWithPasswordInvalid = Object.create(client);
                clientWithPasswordInvalid.password = "1234567";
                Register.doRegister(clientWithPasswordInvalid);
                Utils.validateItemVisible(elements.ErrorMessage);
                Utils.validateTextItemVisible(
                elements.ErrorMessage, "A senha deve conter ao menos 8 caracteres.");
                                
                                            
                                            
                    });

        it("Cadastrar multiplos usuários com sucesso", ()=> {
            for (let i = 1; i <= 2; i++){
                Register.doRegister(client);
                Utils.validateItemVisible(elements.tableUserName + i);
                Utils.validateItemVisible(elements.tableUserEmail  + i);
                Utils.validateTextItemVisible(
                elements.tableUserName  + i, client.name);
                Utils.validateTextItemVisible(
                elements.tableUserEmail  + i, client.email);
            }


            
                    });

        it("Excluir usuário com sucesso", ()=> {
                let i = 0;
                for (i; i <= 2; i++){
                Register.doRegister(client);
                }

                Register.doDelete(i);
            
            });

});
