const product = require('../model/product');
const productReview = require('../model/review');
const multer = require('multer');
module.exports = function (app) {

    const mutlterStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'public');
        },
        filename: (req, file, cb) => {
            const extention = file.mimetype.split("/")[1];
            const fileName = file.fieldname
            cb(null, `images/admin-${fileName}-${Date.now()}.${extention}`);
        }
    });
    const upload = multer({
        storage: mutlterStorage
    });

    app.post('/createProduct', upload.any(), async (req, res) => {
        try {
            const {
                productName,
                productPrice,
                isFeaturedProduct,
                isTopRatedProduct,
                isProductOffer,
                isBestSeller
            } = req.body;
            const productDetails = new product({
                productName,
                productPrice,
                isFeaturedProduct,
                isTopRatedProduct,
                isProductOffer,
                isBestSeller,
                productImage: req.files[0].filename
            });
            productDetails.save(result => {
                if (result) {
                    return res.status(200).json({
                        status: "Success",
                        message: "File created success"
                    })
                } else {
                    return res.status(500).json({
                        status: "Error",
                        message: "Something went wrong not able to save the data"
                    });
                }
            });
        } catch (err) {
            res.status(500).send(err);

        }
    });


    app.get('/getFeaturedProduct', (req, res) => {
        try {
            product.aggregate([{
                $match: {
                    isFeaturedProduct: true
                },
            }, {
                $lookup: {
                    from: 'productReview',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'reviews'
                }
            }, {
                $unwind: "$reviews"
            }, {
                $group: {
                    _id: '$reviews._id',
                    ratingCount: {
                        "$sum": "$reviews.rating"
                    }
                }
            }, {
                $addFields: {
                    reviewsSum: {
                        $divide: ['$ratingCount', 5]
                    }
                }
            }]).exec(function (err, result) {
                if (result === '') {
                    res.send('');
                } else {
                    res.send(result);
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    });

    app.get('/topRatedProducts', (req, res) => {
        try {
            product.aggregate([{
                $match: {
                    isFeaturedProduct: true
                },
            }, {
                $lookup: {
                    from: 'productReview',
                    localField: '_id',
                    foreignField: 'product',
                    as: 'reviews'
                }
            }, {
                $unwind: "$reviews"
            }, {
                $group: {
                    _id: '$reviews._id',
                    count: {
                        "$sum": 1
                    }
                }
            }, {
                $addFields: {
                    reviewsSum: {
                        $divide: ['$count', 5]
                    }
                }
            }]).exec(function (err, result) {
                if (result === '') {
                    res.send('');
                } else {
                    res.send(result);
                }
            });
        } catch (err) {
            res.status(500).send(err);
        }
    })

}