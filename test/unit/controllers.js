const sinon = require('sinon');
const { expect } = require('chai');

const productsService = require('../../services/productsService')
const productsController = require('../../controllers/productsController');

const salesController = require('../../controllers/salesController');
const salesService = require('../../services/salesService');

describe('Ao chamar o controller de criar produto', () => {
  describe('quando é inserido com sucesso', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body =   { name: 'produto', quantity: 10 };

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();

      sinon.stub(productsService, 'register').resolves(true);
    });

    after(() => {
      productsService.register.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await productsController.create(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller obter todos os produtos', () => {
  describe('quando tá tudo certo na chamada', async () => {
    const response = {};
    const request = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      sinon.stub(productsService, 'getAll' ).resolves(true);
    });

    after(() => {
      productsService.getAll.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.getAll(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de alterar um produto', () => {
  describe('quando tá tudo certo na chamada', async () => {
    const response = {};
    const request = {};
    request.body =   { name: 'produto', quantity: 10 };
    request.params =   { id: 1};


    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      sinon.stub(productsService, 'update' ).resolves(true);
    });

    after(() => {
      productsService.update.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.update(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller obter um produto pelo id', () => {
  describe('quando tá tudo certo na chamada', async () => {
    const response = {};
    const request = {};
    request.body =   { name: 'produto', quantity: 10 };
    request.params =   { id: 1};


    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      sinon.stub(productsService, 'getById' ).resolves(true);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.getById(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
  describe('quando não tá tudo certo na chamada', async () => {
    const response = {};
    const request = {};
    request.body =   { name: 'produto', quantity: 10 };
    request.params = { id: 000000};


    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      sinon.stub(productsService, 'getById' ).resolves([]);
    });

    after(() => {
      productsService.getById.restore();
    });

    it('é chamado o status com o código 404', async () => {
      await productsController.getById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
    });
  });
});

describe('Ao chamar o controller de remover produto', () => {
  describe('quando tá tudo certo na chamada', async () => {
    const response = {};
    const request = {};
    request.body =   { name: 'produto', quantity: 10 };
    request.params =   { id: 1};


    before(() => {
      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();
      sinon.stub(productsService, 'remove' ).resolves(true);
    });

    after(() => {
      productsService.remove.restore();
    });

    it('é chamado o status com o código 200', async () => {
      await productsController.deleteProdcut(request, response);

      expect(response.status.calledWith(200)).to.be.equal(true);
    });
  });
});

// salesController -------------------------------------


describe('Ao chamar o controller de criar venda', () => {
  describe('quando é inserido com sucesso', async () => {
    const response = {};
    const request = {};

    before(() => {
      request.body = {
        product_id: 1,
        quantity: 3
      }

      response.status = sinon.stub().returns(response);
      response.send = sinon.stub().returns();


      const mock = {
        id: 1,
        itemsSold: [
          {
            product_id: 1,
            quantity: 2
          },
          {
            product_id: 2,
            quantity: 5
          }
        ]
      } 
      sinon.stub(salesService, 'getAll').resolves(true);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o status com o código 201', async () => {
      await salesController.getAll(request, response);

      expect(response.status.calledWith(201)).to.be.equal(true);
    });
  });
});