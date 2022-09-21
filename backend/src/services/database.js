const MongoClient = require( 'mongodb' ).MongoClient;

const uri = 'mongodb://winform:winform123@localhost:27017/admin';

let _db;
const client = new MongoClient(uri);

module.exports = {

  connectToMongoServer: async function( callback ) {
    _db = client.db('winform');
    // MongoClient.connect( uri,  { useNewUrlParser: true }, function( err, client ) {
    //   console.log('Mongo db connection yapıyorum')
    //   _db  = client.db('admin');
    //   return callback( err );
    // } );
    return callback('ok')
  },

  getDb: function() {
    return _db;
  }
};
