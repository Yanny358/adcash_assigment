const router = require('express-promise-router')();

const ProductsController = require('../controllers/products');

const {
    validateBody,
    validateParam,
    schemas
} = require('../helpers/routeHelpers');

router.route('/')
.get(ProductsController.index)
.post(validateBody(schemas.productSchema), ProductsController.newProduct);

router.route('/:productId')
    .put([validateParam(schemas.idSchema, 'productId'),
            validateBody(schemas.putProductSchema)],
        ProductsController.updateProduct)
    .delete(validateParam(schemas.idSchema, 'productId'),
        ProductsController.deleteProduct)


module.exports = router;