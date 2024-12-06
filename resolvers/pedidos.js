const { getConnection, sql } = require('../DB/db');

const pedidosResorlvers = {
    Query: {
        pedidos: async ( _ , args) => {
            try {
                const pool = await getConnection();
                const request = pool.request();
                 let qry = "SELECT * FROM tienda.Pedidos where 1=1"
                 if(args.id){
                    request.input( 'idpedido' , sql.Int, args.id )
                    qry += " and PedidoID=@idpedido"
                }

                const result= await request.query(qry)

                return result.recordset;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
    },
    Pedido: {
        productos: async (parent) => {
            try {
                const pool = await getConnection();
                console.log("PedidoID:", parent.PedidoID);
                const result = await pool.request()
                    .input('idpedido', sql.Int, parent.PedidoID)
                    .query(`
                        SELECT 
                            DP.DetallePedidoID,
                            DP.Cantidad,
                            DP.PedidoID,
                            P.ProductoID, 
                            P.NombreProducto, 
                            P.Precio 
                        FROM tienda.DetallePedidos DP
                        INNER JOIN tienda.Productos P 
                            ON DP.ProductoID = P.ProductoID
                        WHERE DP.PedidoID = @idpedido
                    `);

                return result.recordset.map(row => ({
                    DetallePedidoID: row.DetallePedidoID,
                    PedidoID: row.PedidoID,
                    ProductoID: row.ProductoID,
                    Cantidad: row.Cantidad,
                    Producto: {
                        ProductoID: row.ProductoID,
                        NombreProducto: row.NombreProducto,
                        Precio: row.Precio,
                    },
                }));
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
    },
};

module.exports = pedidosResorlvers;
