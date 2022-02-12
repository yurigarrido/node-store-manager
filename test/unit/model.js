const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

describe.only('Insere um novo produto no BD', () => {
  const newProduct =  { 
    name: "produto",
    quantity: 10
  };

  before(async () => {
    const mock = [{ insertId: 1 }];

    sinon.stub(connection, 'execute').resolves(mock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('quando é inserido com sucesso', async () => {
    it('retorna um objeto', async () => {
      const response = await productsModel.register(newProduct.name, newProduct.quantity);

      expect(response).to.be.a('object');
    });

    it('o objeto retornado possui o "id", "name" e "quantity" do novo produto inserido', async () => {
      const response = await productsModel.register(newProduct.name, newProduct.quantity);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

    it('o objeto retornado não é vazio', async () => {
      const response = await productsModel.register(newProduct.name, newProduct.quantity);
      console.log(response)
      expect(response).not.to.be.empty;
    });
    it('o "id" retornado não é do tipo number', async () => {
      const response = await productsModel.register(newProduct.name, newProduct.quantity);
      expect(response.id).to.be.a('number');
    });
    it('o "name" retornado não é do tipo string', async () => {
      const response = await productsModel.register(newProduct.name, newProduct.quantity);
      expect(response.name).to.be.a('string');
    });
    it('o "quantity" retornado não é do tipo number', async () => {
      const response = await productsModel.register(newProduct.name, newProduct.quantity);
      expect(response.quantity).to.be.a('number');
    });
  });
});