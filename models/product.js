const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'product_category'
    }
});

const Product = mongoose.model('product', ProductSchema);
module.exports = Product;