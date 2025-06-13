
class productosdto{

    constructor(product)
    {

        this.id = product.idproducto;
        this.producto = product.nombreproducto;
        this.precio = product.precio;
        this.categoria = product.categoria.name;
    }

    static fromlist(productlist)
    {
        return productlist.map(product => new productosdto(product))
    }

}

module.exports = productosdto;