
const mysql= require('mysql');
const {promisify}=require('util'); //libreria que convierte callback en promesas

const{database}= require('./keys');

const pool=mysql.createPool(database);  //para tener hilos

pool.getConnection( (err, connection)=>{
    if(err){
        if(err.code==='PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION CLOSED');
        }

        if(err.code==='ER_CON_COUNT_ERROR') {
            console.error('DATABASE HAS TO MANY CONNECTIONS');
        }

        if(err.code=='ECONNREFUSED'){
            console.error('DATABASE CONNECTION REFUSED');
        }
    }
   
    if(connection) connection.release ();
     console.log('DB is connected');
     return;
} );  // dar al modulo la conexion y la mantiene

pool.query=promisify(pool.query);

module.exports=pool;