const sinon = require('sinon');
const { expect } = require('chai');
const connection = require('../../models/connection');
const productsModel = require('../../models/productsModel');

describe('busca por um id específico', () => {
  const id =  2;

  
  describe('quando o produto é encontrado com sucesso', async () => {
    before(async () => {
      const mock = [{
        id: 2,
        name: "produto B",
        quantity: 20
      }];
      sinon.stub(connection, 'execute').resolves(mock);
    });
  
    after(async () => {
      connection.execute.restore();
    });

    it('retorna um objeto', async () => {
      const response = await productsModel.getById(id);
      expect(response).to.be.a('object');
    });

    it('o objeto não é vazio', async () => {
      const response = await productsModel.getById(id);
      expect(response).not.to.be.empty;
    });

    it('o objeto retornado possui o "id", "name" e "quantity" do produto encontrado', async () => {
      const response = await productsModel.getById(id);

      expect(response).to.have.a.property('id');
      expect(response).to.have.a.property('name');
      expect(response).to.have.a.property('quantity');
    });

    it('o "id" retornado é do tipo number', async () => {
      const response = await productsModel.getById(id);
      expect(response.id).to.be.a('number');
    });
    it('o "name" retornado é do tipo string', async () => {
      const response = await productsModel.getById(id);
      expect(response.name).to.be.a('string');
    });
    it('o "quantity" retornado é do tipo number', async () => {
      const response = await productsModel.getById(id);
      expect(response.quantity).to.be.a('number');
    });
  });

  describe('quando o produto/id não existe', () => {
    const idInexistente = 3;
  
    before(async () => {
      const mock = [{}];
  
      sinon.stub(connection, 'execute').resolves(mock);
    });
  
    after(async () => {
      connection.execute.restore();
    });
  
    it('retorna um array vazio', async () => {
      const response = await productsModel.getById(idInexistente);

      expect(response).to.be.empty;
    });
  });
})

describe('Insere um novo produto no BD', () => {
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

describe('busca todos os produtos do BD', () => {
    const allProducts =  [
      {
        id: 1,
        name: 'produto A',
        quantity: 10
      },
      {
        id: 2,
        name: 'produto B',
        quantity: 20
      }
    ];
  
    before(async () => {  
      sinon.stub(connection, 'execute').resolves(allProducts);
    });
  
    after(async () => {
      connection.execute.restore();
    });
  
    describe('todos os produtos foram retornados', async () => {
      it('resultado não é vazio', async () => {
        const response = await productsModel.getAll();
  
        expect(response).to.not.be.empty;
      });
  
      it('o objeto retornado possui o "id", "name" e "quantity" do novo produto encontrado', async () => {
        const response = await productsModel.getAll();
        expect(response).to.have.all.keys('id', 'name', 'quantity');
      });
  });
});

describe('altera um produto existente', () => {
  const productUpdated =   [{ id: 1, name: "produto", quantity: 15 }];
  const newName = 'produto';
  const id = 1;
  const newQuantity = 15;

  before(async () => {  
    sinon.stub(connection, 'execute').resolves(productUpdated);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('a alterção foi bem sucedida', async () => {
    it('resultado não é vazio', async () => {
      const response = await productsModel.update(newName, newQuantity, id);

      expect(response).to.not.be.empty;
    });

    it('o objeto retornado possui o "id", "name" e "quantity" do novo produto encontrado', async () => {
      const response = await productsModel.getAll();
      expect(response).to.have.all.keys('id', 'name', 'quantity');
    });
});
});

describe('deleta um produto existente', () => {
  const id = 1;
  const mock = [{message: 'Product deleted'}]

  before(async () => {  
    sinon.stub(connection, 'execute').resolves(mock);
  });

  after(async () => {
    connection.execute.restore();
  });

  describe('a alterção foi bem sucedida', async () => {
    it('resultado não é vazio', async () => {
      const response = await productsModel.deleteProduct(id);

      expect(response).to.not.be.empty;
    });
  });
});
