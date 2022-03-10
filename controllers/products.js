const Product = require('../models/product');
const Category = require('../models/category');

module.exports = {
    index: async (req, res, next) => {
        const products = await Product.find({});
        res.status(200).json(products);
    },

    newProduct: async (req, res, next) => {
        const category = await Category.findById(req.value.body.category);
        const newProduct = req.value.body;
        delete newProduct.category;
        const product = new Product(newProduct);
        product.category = category;
        await product.save();
        category.products.push(product);
        await category.save();
        res.status(200).json(product);
    },

    updateProduct: async (req, res, next) => {
        const { productId } = req.value.params;
        const newProduct = req.value.body;

        const result = await  Product.findByIdAndUpdate(productId, newProduct);
        res.status(200).json({ success: true});
    },

    deleteProduct: async (req, res, next) => {
        const { productId } = req.value.params;
        const product = await  Product.findById(productId);
        if (!product){
            res.status(404).json({ error: 'Product doesn\'t exist'});
        }
        const categoryId = product.category;
        const category = await Category.findById(categoryId);
        await product.remove();
        category.products.pull(product);
        await category.save();
        res.status(200).json({ success: true });

    }
}