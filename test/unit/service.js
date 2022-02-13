const sinon = require('sinon');
const { expect } = require('chai');

const productsModel = require('../../models/productsModel');
const productsService = require('../../services/productsService');

const salesModel = require('../../models/salesModel');
const salesService = require('../../services/salesService');

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

// ------------- salesService ---------

describe('busca todas as vendas no DB', () => {
  describe('quando encontra todas as vendas', async () => {
    const payloadProduct = [{ name: 'Teclado', quantity: 10 }];

    before(() => {
      const mock = [
        {
          saleId: 1,
          date: '2022-02-13T21:10:43.000Z',
          product_id: 1,
          quantity: 1
        },
        {
          saleId: 1,
          date: '2022-02-13T21:10:43.000Z',
          product_id: 2,
          quantity: 1
        },
        {
          saleId: 2,
          date: '2022-02-13T21:11:10.000Z',
          product_id: 3,
          quantity: 1
        },
        {
          saleId: 2,
          date: '2022-02-13T21:11:10.000Z',
          product_id: 4,
          quantity: 1
        }
      ];

      sinon.stub(salesModel, 'getAllSales').resolves(mock);
    });

    after(() => {
      salesModel.getAllSales.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await salesService.getAll();

      expect(response[0]).to.be.a('object');
    });

    it('o objeto possui o id da venda', async () => {
      const response = await salesService.getAll();

      expect(response[0]).to.have.a.property('saleId');
    });
  });
});

describe('busca uma determinada venda pelo id', () => {
  describe('quando encontra a venda', async () => {
    const id = 1;

    before(() => {
      const mock = [
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
      ];

      sinon.stub(salesModel, 'getById').resolves(mock);
    });

    after(() => {
      salesModel.getById.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await salesService.getById();

      expect(response[0]).to.be.a('object');
    });

    it('o objeto não é vazio', async () => {
      const response = await salesService.getById();

      expect(response[0]).to.not.empty;
    });

    it('o objeto possui o id do produto vendido', async () => {
      const response = await salesService.getById();

      expect(response[0]).to.have.a.property('product_id');
    });
  });
});

describe('deleta uma determinada venda pelo id', () => {
    const id = 1;

    before(() => {
      const mock = [
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
      ];

      const mockSale = [
        {
          date: '2022-02-13T21:36:14.000Z',
          product_id: 1,
          quantity: 1
        },
        {
          date: '2022-02-13T21:36:14.000Z',
          product_id: 2,
          quantity: 1
        }
      ]

      sinon.stub(salesModel, 'deleteById').resolves(mock);
      sinon.stub(salesModel, 'getById').resolves(mockSale);
    });

    after(() => {
      salesModel.deleteById.restore();
      salesModel.getById.restore();
    });

    it('retorna um array de objetos', async () => {
      const response = await salesService.deleteSale(id);

      expect(response[0]).to.be.a('object');
    });

    it('o objeto não é vazio', async () => {
      const response = await salesService.deleteSale(id);
      
      expect(response[0]).to.not.empty;
    });

    it('o objeto possui o id do produto vendido', async () => {
      const response = await salesService.deleteSale(id);

      expect(response[0]).to.have.a.property('product_id');
    });
});

describe('altera determinada venda pelo id', () => {
  const id = 1;
  const body = {
    productId: 1, quantity: 6,
 }
  before(() => {
    const mock = [
      {
        saleId: 1,
        itemUpdated: [
          {
            product_id: 1,
            quantity: 6
          }
        ]
      }   
    ];

    sinon.stub(salesModel, 'updateById').resolves(mock);
  });

  after(() => {
    salesModel.updateById.restore();
  });

  it('retorna um objetos', async () => {
    const response = await salesService.updateById(id, body);

    expect(response).to.be.a('object');
  });

  it('o objeto não é vazio', async () => {
    const response = await salesService.updateById(id, body);
    
    expect(response).to.not.empty;
  });

  it('o objeto possui o id da venda', async () => {
    const response = await salesService.updateById(id, body);
    expect(response).to.have.a.property('saleId');
  });
});

describe('cria uma venda', () => {
  const id = 1;
  const body =  [
    {
      product_id: 1,
      quantity: 3
    }
  ]
  before(() => {
    const mock = 
      {
        id: 1,
        itemsSold: [
          {
            product_id: 1,
            quantity: 3
          }
        ]
      }   
    ;

    sinon.stub(salesModel, 'createSale').resolves(mock);
  });

  after(() => {
    salesModel.createSale.restore();
  });

  it('retorna um objetos', async () => {
    const response = await salesService.createSale(id, body);

    expect(response).to.be.a('object');
  });

  it('o objeto não é vazio', async () => {
    const response = await salesService.createSale(id, body);
    
    expect(response).to.not.empty;
  });

  it('o objeto possui o id da venda', async () => {
    const response = await salesService.createSale(id, body);
    expect(response).to.have.a.property('itemsSold');
  });
});