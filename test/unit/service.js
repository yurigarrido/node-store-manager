const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

describe('Insere um novo produto no BD', () => {
  describe('quando é inserido com sucesso', async () => {
    const payloadProduct = [{ name: 'Teclado', quantity: 10 }];

    before(() => {
      const mock = [{id: 1, name: 'Teclado', quantity: 10 }];

      sinon.stub(productsModel, 'register').resolves(mock);
    });

    after(() => {
      productsModel.register.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsService.register(payloadProduct.name, payloadProduct.quantity);

      expect(response[0]).to.be.a('object');
    });

    it('tal objeto possui o "id" do novo produto inserido', async () => {
      const response = await productsService.register(payloadProduct.name, payloadProduct.quantity);

      expect(response[0]).to.have.a.property('id');
    });
  });
});

describe('busca todos produtos no BD', () => {
  describe('quando todos os produtos são encontrados', async () => {
    // const payloadProduct = [{ name: 'Teclado', quantity: 10 }];

    before(() => {
      const mock = [
       {id: 1, name: 'Teclado', quantity: 10 },
       {id: 2, name: 'mouse', quantity: 4 }
      ];

      sinon.stub(productsModel, 'getAll').resolves(mock);
    });

    after(() => {
      productsModel.getAll.restore();
    });

    it('retorna array com as informações', async () => {
      const response = await productsService.getAll();

      expect(response).to.be.not.empty;
    });

    it('tal objeto possui o "id" do novo produto', async () => {
      const response = await productsService.getAll();

      expect(response[0]).to.have.a.property('id');
    });
  });
});

describe('busca um produto pelo "id" no BD', () => {
  describe('quando o produto é encontrado', async () => {
    const id = 1;

    before(() => {
      const mock = [
       {id: 1, name: 'Teclado', quantity: 10 },
      ];

      sinon.stub(productsModel, 'getById').resolves(mock);
    });

    after(() => {
      productsModel.getById.restore();
    });

    it('retorna array com as informações do produto', async () => {
      const response = await productsService.getById(id);

      expect(response).to.be.not.empty;
    });

    it('o objeto possui o "id" do produto procurado', async () => {
      const response = await productsService.getById(id);

      expect(response[0]).to.have.a.property('id');
    });

    it('o "id" do produto procurado é igual ao "id" da busca', async () => {
      const response = await productsService.getById(id);

      expect(response[0].id).to.be.equals(id);
    });
  });
});

describe('altera as informções de um produto existente', () => {
    const id = 1;
    const name = 'Violão'
    const quantity = 100;

    before(() => {
      const mock = [
       {id: 1, name: 'Violão', quantity: 100 },
      ];

      sinon.stub(productsModel, 'update').resolves(mock);
    });

    after(() => {
      productsModel.update.restore();
    });

    it('o array retornado não é vazio', async () => {
      const response = await productsService.update(name, quantity,id);

      expect(response).to.be.not.empty;
    });

    it('o objeto possui o "id" do produto procurado', async () => {
      const response = await productsService.update(name, quantity,id);

      expect(response[0]).to.have.a.property('id');
    });

    it('o "id" do produto procurado é igual ao "id" da busca', async () => {
      const response = await productsService.update(name, quantity,id);

      expect(response[0].id).to.be.equals(id);
    });
});

describe('remove um produto existente', () => {
  const id = 1;

  before(() => {
    const mock = [{ message: 'Product deleted' }];
    const mockInfo = [{ id: 1, name: 'Violão', quantity: 100 }];

    sinon.stub(productsModel, 'deleteProduct').resolves(mock);
    sinon.stub(productsModel, 'getById').resolves(mockInfo);
  });

  after(() => {
    productsModel.deleteProduct.restore();
  });

  it('o array retornado não é vazio', async () => {
    const response = await productsService.remove(id);

    expect(response).to.be.not.empty;
  });

  it('o objeto possui o "id" do produto procurado', async () => {
    const response = await productsService.remove(id);

    expect(response).to.have.a.property('id');
  });

  it('o "id" do produto procurado é igual ao "id" da busca', async () => {
    const response = await productsService.remove(id);

    expect(response.id).to.be.equals(id);
  });
});