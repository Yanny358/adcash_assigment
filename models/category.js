const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: String,
    products: [{
        type: Schema.Types.ObjectId,
        ref: 'product'
    }]
});

const Category = mongoose.model('product_category', CategorySchema);
module.exports = Category;