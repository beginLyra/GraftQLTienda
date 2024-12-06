const { getConnection, sql } = require('../DB/db');

const pedidosResolvers = {
  Query: {
    conteoProductoPedido: async () => {
      try {
        // Obtener la conexión a la base de datos
        const pool = await getConnection();

        // Ejecutar la consulta SQL para contar los productos totales
        const result = await pool.request()
          .query(`
            SELECT SUM(DP.Cantidad)  AS conteo
            FROM tienda.DetallePedidos DP
          `);

        // Devolver el total de productos sumando las cantidades
        return result.recordset.map( row => ({
            conteo: row.conteo
            
        }));
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

module.exports = pedidosResolvers;
