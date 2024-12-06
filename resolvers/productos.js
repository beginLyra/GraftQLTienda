const { getConnection,sql } = require('../DB/db');

const productoResorlvers = {
    Query: {
        productos: async () => {
            try{
                const pool = await getConnection();
                const result = await pool.request().query(`
                  select * FROM tienda.productos
                `);
                return result.recordset ;
            }catch(err){
                console.error(err);
                throw err;
            }
   }
    },
    Producto: {
        Pedidos: async (parent) => {
            const pool = await getConnection();
            console.log("acaaaaaaaaaaaaaaaaaa",parent.ProductoID)
            const result = await pool.request()
                .input('idProducto', sql.Int, parent.ProductoID)
                .query(`
                     SELECT DP.*, P.NombreCliente
        FROM tienda.DetallePedidos DP
        JOIN tienda.Pedidos P ON DP.PedidoID = P.PedidoID
        WHERE DP.ProductoID = @idProducto
                         
            `);

            return result.recordset.map(row => ({
                DetallePedidoID: row.DetallePedidoID,
                PedidoID: row.PedidoID,
                ProductoID: row.ProductoID,
                Cantidad: row.Cantidad,
                Pedido: {
                  PedidoID: row.PedidoID,
                  NombreCliente: row.NombreCliente,
                },
              }));
        }
    }
    
};

module.exports = productoResorlvers;