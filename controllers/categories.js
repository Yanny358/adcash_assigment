const Category = require('../models/category');
const Product = require('../models/product');


module.exports = {
    index: async (req, res, next) => {
        const categories = await Category.find({});
        res.status(200).json(categories);

    },
    newCategory: async (req, res, next) => {
        const newCategory = new Category(req.value.body);
        const category = await newCategory.save();
        res.status(201).json(category);
    },

    getCategory: async (req, res, next) => {
        const { categoryId } = req.value.params;
        const category = await Category.findById(categoryId);
        res.status(200).json(category);
    },

    updateCategory: async (req, res, next) => {
        const { categoryId } = req.params;
        const newCategory = req.body;
        const result = await Category.findByIdAndUpdate(categoryId, newCategory);
        res.status(200).json({success: true});
    },

    getCategoryProducts: async (req, res, next) => {
        const { categoryId } = req.value.params;
        const category = await Category.findById(categoryId).populate('products');
        res.status(200).json(category.products)
    },

    newCategoryProduct: async (req, res, next) => {
        const { categoryId } = req.value.params;
        const newProduct = new Product(req.value.body);
        const category = await Category.findById(categoryId);
        newProduct.categories = category;
        await newProduct.save();
        category.products.push(newProduct);
        await category.save();
        res.status(201).json(newProduct);
    },
    deleteCategory: async (req, res, next) => {
        const { categoryId } = req.value.params;
        const category = await Category.findById(categoryId);
        if (!category) {
            res.status(404).json({error: 'Category doesn\'t exist'});
        }
        await category.remove();
        res.status(200).json({success: true});
    }
};