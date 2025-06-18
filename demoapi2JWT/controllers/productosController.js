const db = require('../models');
const category = db.categorias;
const product = db.productos;
const { QueryTypes } = require('sequelize');

const dto = require('../dto/productosdto');
const { param } = require('../routes/productRoutes');
const { json } = require('body-parser');

console.log('modelo=>', db.productos);
console.log('modelo=>', db.categorias);

console.log('productos associations=>', db.Producto.associations);
console.log('categorias associations=>', db.Categoria.associations);

exports.findAllv0 = async (req, res ) => {

    try{

        const productos = await product.findAll();
        res.status(200).send(productos);
    }catch(error)
    {
        console.error('Error', error);
        res.status(400).send({  
            message: error.message
        });
    }


};


exports.findAll = async (req, res) => {
  try {
    const productos = await db.Producto.findAll(
        {
            include: { model: category, as: 'categorias' }
        });
    res.status(200).send(productos);
  } catch (error) {
    console.error('Error', error);
    res.status(400).send({
      message: error.message
    });
  }
};

exports.findAllv2 = async (req, res ) => {

    try{

        const productos = await db.Producto.findAll(
            {
            
                include: { model: category, as: 'categorias'  }

            }
        );

        const proddto = dto.fromList(productos);

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
        const productos = await db.Producto.findByPk(id, 
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

exports.findOnev2 = async (req, res ) => {

    try{

        const id = req.params.idproducto;
        const prod = await  db.sequelize.query('SELECT * FROM productos where idproducto=?', {
                replacements: [id],
                type: QueryTypes.SELECT
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

exports.findOnev3 = async (req, res ) => {

    try{

        const id = req.params.idproducto;
        const idcategoria = req.params.idcategoria;
        const prod = await  db.sequelize.query('SELECT * FROM productos where idproducto= :idprod and idcategoria= :idcat', {
                replacements: { idprod: id, idcat: idcategoria  },
                 type: QueryTypes.SELECT,
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

//funciones con raw query
exports.funcrawquery = async (req, res ) => {

    try{

        const id = req.params.idproducto;
        const prod = await  db.sequelize.query('SELECT * FROM consfproductocategoria (?)', {
                replacements: [id],
                type: QueryTypes.SELECT
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

//procedures con raw query
exports.procrawquery = async (req, res ) => {

    try{

        const id = req.params.idproducto;
        const query = `
            DO $$
            DECLARE
                v_id_prod INTEGER;
                v_nombre_prod VARCHAR(255);
                v_nombre_cat VARCHAR(255);
            begin
                CALL consprocproductocategoria(param, v_id_prod, v_nombre_prod, v_nombre_cat);
                RAISE NOTICE 'ID Producto: %, Nombre Producto: %, Categoría: %', v_id_prod, v_nombre_prod, v_nombre_cat;
            END $$;
        `;
        const prod = await  db.sequelize.query(query.replace('param', ':idprod'), {
                 replacements: { idprod: id},
                type: QueryTypes.SELECT
                });
        res.status(200).json(prod);
        console.log(prod);
    }catch(error)
    {
        console.error('Error', error);
        res.status(400).send({  
            message: error.message
        });
    }


};