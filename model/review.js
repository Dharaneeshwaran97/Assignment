const mongoose = require('mongoose');

const productReviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    rating: {
        type: Number
    }
});

module.exports = mongoose.model('ProductReviw', productReviewSchema);