//const express = require('express');
const router = require('express-promise-router')();

const CategoryController = require('../controllers/categories');
const { validateParam,validateBody, schemas } = require('../helpers/routeHelpers');

router.route('/')
    .get(CategoryController.index)
    .post(validateBody(schemas.categorySchema), CategoryController.newCategory);

router.route('/:categoryId')
    .get(validateParam(schemas.idSchema, 'categoryId'), CategoryController.getCategory)
    .put([validateParam(schemas.idSchema, 'categoryId'),
        validateBody(schemas.categorySchema)],
        CategoryController.updateCategory)
    .delete(validateParam(schemas.idSchema, 'categoryId'), CategoryController.deleteCategory)

router.route('/:categoryId')
    .get(validateParam(schemas.idSchema, 'categoryId'), CategoryController.getCategoryProducts)
    .post([validateParam(schemas.idSchema, 'categoryId'),
            validateBody(schemas.categoryProductSchema)],
        CategoryController.newCategoryProduct);


module.exports = router;