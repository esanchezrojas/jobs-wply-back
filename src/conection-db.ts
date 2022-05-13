import mysql from 'promise-mysql';
import keys from './config/keys';



const db = mysql.createPool(keys.database);
db.getConnection()
.then(connection => {
    db.releaseConnection(connection);
    console.log('DB is connected');
});




export default db;