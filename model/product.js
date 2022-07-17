const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        default: ""
    },
    productPrice: {
        type: Number,
        default: 0
    },
    productImage: {
        type: String
    },
    isFeaturedProduct: {
        type: Boolean,
        default: false
    },
    isTopRatedProduct: {
        type: Boolean,
        default: false
    },
    isProductOffer: {
        type: Boolean,
        default: false
    },
    isBestSeller:{
        type:Boolean,
        default:false
    }
});

module.exports = mongoose.model("Product", productSchema);