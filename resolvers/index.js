const { mergeResolvers } = require('@graphql-tools/merge');

const proveedorResolvers = require('./proveedores')
const productoResolvers = require('./productos')
const pedidosResolvers = require('./pedidos')
const conteoResolvers = require('./totalProPe')



const resolversArray = [
    proveedorResolvers,
    productoResolvers,
    pedidosResolvers,
    conteoResolvers
    
]

const resolvers = mergeResolvers( resolversArray );

module.exports = resolvers;