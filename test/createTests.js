const assert = require('assert');
const { Product } = require('../database/mongo/models/product.js');

describe('Creating documents', () => {
  it('creates a new product', (done) => {
    const product = new Product({ _id: 1, questions: [] });
    product.save()
      .then(() => {
        assert(!product.isNew);
        done();
      });
  });
});