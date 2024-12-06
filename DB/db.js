const sql = require('mssql');

const dbConfig = {
    user: process.env.SQL_USERNAME
    , password: process.env.SQL_PASSWORD
    , server: process.env.SQL_SERVER
    , database: process.env.SQL_DATABASE
    , options: {
        encrypt: process.env.DB_ENCRYPT === 'true'
    }
};

let pool;

async function getConnection() {
    try {

        if (pool){
            return pool;
        }

        pool = await sql.connect(dbConfig);
        if (!pool) {
            throw new Error("No se pudo establecer la conexión con la base de datos");
        }
        return pool;

    } catch(err){
        console.error("Error al conectar a la base de datos", err)
    }
}

module.exports = {
    sql, getConnection
}