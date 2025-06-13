const db = require('../models');
//const category = require('../models/categorias');
const category = db.categorias;
const product = db.productos;

const dto = require('../dto/productosdto');


console.log('modelo=>', db.productos);

exports.findAll = async (req, res ) => {

    try{

        const productos = await product.findAll(
            {
            
                include: { model: category, as: 'categorias', attributes: ['idcategoria', 'name']  }

            }
        );
        res.status(200).send(productos);
    }catch(error)
    {
        console.error('Error', error);
        res.status(400).send({  
            message: error.message
        });
    }


};

exports.findAllv2 = async (req, res ) => {

    try{

        const productos = await product.findAll(
            {
            
                include: { model: category, as: 'categorias', attributes: ['idcategoria', 'name']  }

            }
        );

        const proddto = new dto(productos);

        res.status(200).send(proddto);
    }catch(error)
    {
        console.error('Error', error);
        res.status(400).send({  
            message: error.message
        });
    }


};


exports.findAllv3 = async (req, res ) => {

    try{

        const prod = await  db.sequelize.query('SELECT * FROM productos', {
                model: product,
                mapToModel: true
                });
        res.status(200).send(prod);
    }catch(error)
    {
        console.error('Error', error);
        res.status(400).send({  
            message: error.message
        });
    }


};

exports.findOne = async (req, res ) => {

    try{

        const id = req.params.idproducto;
        const productos = await product.findByPk(id, 
            {
                include: { model: category, as: 'categorias', attributes: ['idcategoria', 'name', 'description']  }
            });
        if(!productos)
        {
            return res.status(400).send({message: 'Producto no encontrado'});
        }
            res.status(200).send(productos);
    }catch(error)
    {
        console.error('Error', error);
        res.status(400).send({  
            message: error.message
        });
    }
};

// Crear un nuevo producto
exports.create = async (req, res) => {
try {
        console.log(req.body);
        const { nombreproducto, precio, descripcion, idcategoria } = req.body;
        
        /*if (!nombreproducto || !precio || descripcion) {
        return res.status(400).send({ message: 'El nombre, precio y descripcion son campos requeridos.' });
        }*/
        
        const categoriaid = await category.findByPk(idcategoria);

        if(!categoriaid)
        {
             return res.status(400).send({message: 'Categoria no existe'});
        }

        const productos = await product.create({ nombreproducto, precio, descripcion, idcategoria});
        res.status(202).send(productos);
        
        } 
        catch (error) 
        {
            console.error('Error al crear el producto:', error);
            res.status(400).send({
            message: error.message || 'Ocurrió un error al crear el producto.'
            });
        }
}


//actualizacion
exports.update = async (req, res) => {

    const { idcategoria } = req.body;
    const id = req.params.idproducto;

    try {

         const categoriaid = await category.findByPk(idcategoria);

        if(!categoriaid)
        {
             return res.status(400).send({message: 'Categoria no existe'});
        }

      const [num] = await product.update(req.body, { where: { idproducto: id } })
    
      if (num == 1)
      {
        res.status(202).send({message: 'producto actualizado'});
      }
      else
      {
        res.status(400).send({
            message: 'Ocurrió un error al actualizar el producto:' + id
            });
      }
        
    } catch (error) 
        {
            console.error('Error al actualizar el producto con idproducto: ' + id, error);
            res.status(400).send({
            message: error.message || 'Error al actualizar el producto con idproducto: ' + id
            });
        }

};


//eliminacion de datos
exports.delete = async (req, res) => {

    const id = req.params.idproducto;

    try {

      const num = await product.destroy({ where: { idproducto: id } })
    
      if (num == 1)
      {
        res.status(202).send({message: 'producto eliminado'});
      }
      else
      {
        res.status(400).send({
            message: 'Ocurrió un error al eliminar el producto:' + id
            });
      }
        
    } catch (error) 
        {
            console.error('Error al eiminar el producto con idproducto: ' + id, error);
            res.status(400).send({
            message: error.message || 'Error al eiminar el producto con idproducto: ' + id
            });
        }

};
