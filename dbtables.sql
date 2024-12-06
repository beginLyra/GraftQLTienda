-- Crear tabla Proveedores
CREATE TABLE tienda.Proveedores (
    ProveedorID INT IDENTITY(1,1) PRIMARY KEY,
    NombreProveedor NVARCHAR(100) NOT NULL,
    InformacionContacto NVARCHAR(100)
);

-- Crear tabla Productos
CREATE TABLE tienda.Productos (
    ProductoID INT IDENTITY(1,1) PRIMARY KEY,
    NombreProducto NVARCHAR(100) NOT NULL,
    Precio DECIMAL(10,2) NOT NULL,
    ProveedorID INT NOT NULL,
    FOREIGN KEY (ProveedorID) REFERENCES tienda.Proveedores(ProveedorID)
);

-- Crear tabla Pedidos
CREATE TABLE tienda.Pedidos (
    PedidoID INT IDENTITY(1,1) PRIMARY KEY,
    FechaPedido DATE NOT NULL DEFAULT GETDATE(),
    NombreCliente NVARCHAR(100) NOT NULL
);

-- Crear tabla DetallePedidos
CREATE TABLE tienda.DetallePedidos (
    DetallePedidoID INT IDENTITY(1,1) PRIMARY KEY,
    PedidoID INT NOT NULL,
    ProductoID INT NOT NULL,
    Cantidad INT NOT NULL,
    FOREIGN KEY (PedidoID) REFERENCES tienda.Pedidos(PedidoID),
    FOREIGN KEY (ProductoID) REFERENCES tienda.Productos(ProductoID)
);