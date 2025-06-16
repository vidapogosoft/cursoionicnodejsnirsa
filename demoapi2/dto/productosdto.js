// dtos/productos-dto.js
class productosdto {
    constructor(productInstance) {
        // Asegúrate de que estas propiedades coincidan con los nombres de las columnas
        // que Sequelize te devuelve de la instancia del modelo Producto.
        this.id = productInstance.idproducto; 
        this.producto = productInstance.nombre; 
        this.precio = productInstance.precio;
        this.descripcion = productInstance.descripcion;
        this.categoria = productInstance.categorias.name;
    }

    // Este método estático es fundamental para mapear la lista
    static fromList(productlist) {
        // 'map' transforma cada elemento de la lista de Sequelize a una instancia de ProductosDto
        return productlist.map(product => new productosdto(product));
    }
}

module.exports = productosdto;