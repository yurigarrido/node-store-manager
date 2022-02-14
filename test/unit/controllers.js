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


describe('SALES', () => {
  describe('quando encontra todas as vendas', async () => {
    const response = {};
    const request = {};
    const mock = [
      {
        saleId: 1,
        date: '2022-02-14T00:39:15.000Z',
        product_id: 1,
        quantity: 1
      },
      {
        saleId: 1,
        date: '2022-02-14T00:39:15.000Z',
        product_id: 2,
        quantity: 1
      }
    ]

    before(() => {
      request.body = {
        product_id: 1,
        quantity: 3
      }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'getAll').resolves(mock);
    });

    after(() => {
      salesService.getAll.restore();
    });

    it('é chamado o status com o código 201', async () => {
       await salesController.getAll(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('é chamado o status com o código 201', async () => {
      await salesController.getAll(request, response)
     expect(response.status.calledWith(200)).to.be.equal(true);
   });
  });

    describe('quando da errado', async () => {
      const response = {};
      const request = {};
      const mock = {
        saleId: 1,
        itemUpdated: [
          {
            product_id: 1,
            quantity: 6
          }
        ]
      }    
  
      before(() => {
        request.params = {
          id: 1,
        }
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(salesService, 'getById').resolves([]);
      });
  
      after(() => {
        salesService.getById.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
         await salesController.getById(request, response)
        expect(response.status.calledWith(404)).to.be.equal(true);
      });
      it('é chamado o status com o código 201', async () => {
        await salesController.getById(request, response)
       expect(response.status.calledWith(404)).to.be.equal(true);
     });
    })


     describe('qaundo da certo', async () => {
      const response = {};
      const request = {};
      const mock = {
        saleId: 1,
        itemUpdated: [
          {
            product_id: 1,
            quantity: 6
          }
        ]
      }    
  
      before(() => {
        request.params = {
          id: 1,
        }
  
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
  
        sinon.stub(salesService, 'getById').resolves(mock);
      });
  
      after(() => {
        salesService.getById.restore();
      });
  
      it('é chamado o status com o código 201', async () => {
         await salesController.getById(request, response)
        expect(response.status.calledWith(200)).to.be.equal(true);
      });
      it('é chamado o status com o código 201', async () => {
        await salesController.getById(request, response)
       expect(response.status.calledWith(200)).to.be.equal(true);
     });
  });

  describe('deleteById', async () => {
    const response = {};
    const request = {};
    const mock =   [
      { 
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      },
      {
        date: '2021-09-09T04:54:54.000Z',
        product_id: 2,
        quantity: 2
      }
    ]     

    before(() => {
      request.params = {
        id: 1,
      }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').resolves(mock);
    });

    after(() => {
      salesService.deleteSale.restore();
    });

    it('é chamado o status com o código 200', async () => {
       await salesController.deleteById(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('é chamado o status com o código 200', async () => {
      await salesController.deleteById(request, response)
     expect(response.status.calledWith(200)).to.be.equal(true);
   });
  });

  describe('deleteById quando da errado', async () => {
    const response = {};
    const request = {};
    const mock =   [
      { 
        date: '2021-09-09T04:54:29.000Z',
        product_id: 1,
        quantity: 2
      },
      {
        date: '2021-09-09T04:54:54.000Z',
        product_id: 2,
        quantity: 2
      }
    ]     

    before(() => {
      request.params = {
        id: 1,
      }

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'deleteSale').resolves([]);
    });

    after(() => {
      salesService.deleteSale.restore();
    });

    it('é chamado o status com o código 404', async () => {
       await salesController.deleteById(request, response)
      expect(response.status.calledWith(404)).to.be.equal(true);
    });
    it('é chamado o status com o código 404', async () => {
      await salesController.deleteById(request, response)
     expect(response.status.calledWith(404)).to.be.equal(true);
   });
  });

  describe('create', async () => {
    const response = {};
    const request = {};
    const mock = {
      id: 1,
      itemsSold: [
        {
          product_id: 1,
          quantity: 3
        }
      ]
    }     

    before(() => {
      request.body = [
        {
          product_id: 1,
          quantity: 30,
        }
      ]

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'createSale').resolves(mock);
    });

    after(() => {
      salesService.createSale.restore();
    });

    it('é chamado o status com o código 201', async () => {
       await salesController.create(request, response)
      expect(response.status.calledWith(201)).to.be.equal(true);
    });
    it('é chamado o status com o código 201', async () => {
      await salesController.create(request, response)
     expect(response.status.calledWith(201)).to.be.equal(true);
   });
  });

  describe('updateById', async () => {
    const response = {};
    const request = {};
    const mock = {
      saleId: 1,
      itemUpdated: [
        {
          product_id: 1,
          quantity: 6
        }
      ]
    }   

    before(() => {
      request.params = 
        {
          id: 1,
        }
      request.body = [
        {
          product_id: 1,
          quantity: 6
        }
      ]
      

      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();

      sinon.stub(salesService, 'updateById').resolves(mock);
    });

    after(() => {
      salesService.updateById.restore();
    });

    it('é chamado o status com o código 200', async () => {
       await salesController.updateById(request, response)
      expect(response.status.calledWith(200)).to.be.equal(true);
    });
    it('é chamado o status com o código 200', async () => {
      await salesController.updateById(request, response)
     expect(response.status.calledWith(200)).to.be.equal(true);
   });
  });
});