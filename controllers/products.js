const Product = require('../models/product');
const getAllProductsStatic = async (req, res) => {
    const products = await Product.find({});
    res.status(200).json(products);
};

const getAllProducts = async (req, res) => {
    const { featured, company, name, sort, fields } = req.query;
    const queryObject = {};

    if (featured) {
        queryObject.featured = featured === 'true';
    }
    if (company) {
        queryObject.company = company;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }

    let result = Product.find(queryObject);
    //sort
    if (sort) {
        const sortList = sort.split(',').join(' ');
        result = result.sort(sortList);
    } else {
        result = result.sort('createAt');
    }

    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(fieldsList)
    }
    const products = await result;
    res.status(200).json({ products });
};

module.exports = {
    getAllProductsStatic,
    getAllProducts
};