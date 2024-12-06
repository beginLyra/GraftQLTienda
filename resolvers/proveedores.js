const { getConnection, sql } = require('../DB/db');
const { Producto } = require('./productos');

const proveedorResorlvers = {
    Query: {
        proveedores: async () => {
            try {
                const pool = await getConnection();
                const result = await pool.request().query(`
                  select * FROM tienda.Proveedores
                `);
                return result.recordset;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }

    },
    Proveedor: {
        Productos: async (parent) => {
            const pool = await getConnection();
            const result = await pool.request()
                .input('idProveedor', sql.Int, parent.ProveedorID)
                .query(`
                          SELECT 
    P.ProductoID, 
    P.NombreProducto 
FROM 
    [tienda].[Productos] P
INNER JOIN 
    [tienda].[Proveedores] TP 
ON 
    P.ProveedorID = TP.ProveedorID
WHERE 
    TP.ProveedorID = @idProveedor
       
                    
            `);

            return result.recordset.map(row => ({
              

                    ProductoID: row.ProductoID,
                    NombreProducto: row.NombreProducto
                

            }));
        }
    }
};

module.exports = proveedorResorlvers;