const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Proveedor {
        ProveedorID: ID!
        NombreProveedor: String!
        InformacionContacto: String
        Productos: [Producto]
    }

    type Producto {
        ProductoID: ID!
        NombreProducto: String!
        Precio: Float!
        ProveedorID: Int!
        Proveedor: Proveedor
        Pedidos: [DetallePedido]
    }

    type Pedido {
        PedidoID: ID!
        FechaPedido: String!
        NombreCliente: String!
        productos: [DetallePedido]
    }

    type DetallePedido {
        DetallePedidoID: ID!
        PedidoID: Int!
        ProductoID: Int!
        Cantidad: Int!
        Pedido: Pedido
        Producto: Producto
    }
         type ConteoProductoPedido{
        conteo: Int
    }


    type Query {
        proveedores: [Proveedor]
        productos: [Producto]
        pedidos(id:Int):[Pedido]
        conteoProductoPedido:[ConteoProductoPedido]
        
        
       
    }
`;

module.exports = typeDefs;
