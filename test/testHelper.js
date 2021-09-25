const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/sdcTests');
mongoose.connection
  .once('open', () => console.log('Connected!'))
  .on('error', (error) => {
    console.warn('Error : ', error);
  });

beforeEach((done) => {
  mongoose.connection.collections.products.drop(() => {
    done();
  });
});