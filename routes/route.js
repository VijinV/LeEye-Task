const express = require('express');
const route = express()
const controller = require('../controller/productController');
const multer = require('../config/multer');


route.get('/',controller.loadProductList)

route.get('/addProduct',controller.loadAddProduct)

route.get('/editProduct',controller.loadAddProduct)

route.post('/addProduct',multer.upload.array('image'),controller.addProduct)


route.post('/editProduct',multer.upload.array('image'),controller.addProduct)


route.get('/delete',controller.deleteProduct)



module.exports = route