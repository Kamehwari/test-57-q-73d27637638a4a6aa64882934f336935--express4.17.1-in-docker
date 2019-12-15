const express = require('express');
const router = express.Router();
const {addProduct, getProduct, deleteProduct, updateProduct} = require('../dataManager/productsDataMgr')
router.post('/api/products/',async(req, res)=>{
    try {
        let body = JSON.parse(req.body);
        if(!body){
            res.status(400);res.json({"status":"failure", "reason" : "Request body mandatory"}); return
        }
        if(body.quantity < 0){
            res.status(416);res.json({"status":"failure", "reason" : "Quantity cannot be negative"}); return
        }
        let result  =  await  addProduct(body);
        if(result){
            res.status(201); res.json({"data":result}); return;
        }else{
            res.status(400); res.json({"status":"failure", "reason":"Error in adding product"}); return;
        }

    } catch (error) {
        res.status(500);res.json({"status": "failure", "reason":"Internal Server Error", "error" : error})
    }
})


router.get('/api/products/:product_id',(req, res)=>{
    try {
        let product_id  = req.params.product_id
        if(!product_id){
            res.status(400);res.json({"status":"failure", "reason" : "product id required to fetch result"}); return
        }
        let result  =  await  getProduct(product_id);
        if(result){
            res.status(200); res.json({"data":result}); return;
        }else{
            res.status(404); res.json({"status":"failure", "reason":"Product not found"}); return;
        }
        
    } catch (error) {
        res.status(500);res.json({"status": "failure", "reason":"Internal Server Error", "error" : error})
    }
})

router.delete('/api/products/:product_id',(req, res)=>{
    try {
        let product_id  = req.params.product_id
        if(!product_id){
            res.status(400);res.json({"status":"failure", "reason" : "product id required to delete the data"}); return
        }
        let result  =  await  deleteProduct(product_id);
        if(result){
            res.status(200); res.json({"status":"Success"}); return;
        }else{
            res.status(404); res.json({"status":"failure", "reason":"Error in deleting product"}); return;
        }        
    } catch (error) {
        res.status(500);res.json({"status": "failure", "reason":"Internal Server Error", "error" : error});
    }
})

router.put('/api/products/:product_id',(req, res)=>{
    try {
        let body = JSON.parse(req.body);
        let product_id  = req.params.product_id
        if(!product_id){
            res.status(400);res.json({"status":"failure", "reason" : "product id required to update the data"}); return
        }
        if(!body){
            res.status(400);res.json({"status":"failure", "reason" : "Request body mandatory"}); return
        }
        let result  =  await  updateProduct(product_id, body);
        if(result){
            res.status(200); res.json({"status":"Success"}); return;
        }else{
            res.status(404); res.json({"status":"failure", "reason":"Error in updating product"}); return;
        }  

        
    } catch (error) {
        res.status(500);res.json({"status": "failure", "reason":"Internal Server Error", "error" : error})
    }
})


module.exports = router;