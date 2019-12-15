const {executeQuery} = require("../helpers/mysqlWrapper");


const addProduct = async(productInfo)=>{
    try {
        let insertQuery = `INSERT INTO product (name, category_name, description, buy_price, sell_price, quantity) VALUES ('${productInfo.name}', '${productInfo.category_name}', '${productInfo.description}', '${productInfo.buy_price}', '${productInfo.sell_price}', '${productInfo.quantity}') `
        await executeQuery(insertQuery);
        let toGetId = `SELECT LAST_INSERT_ID()`;
        let id  = await executeQuery(toGetId);
        productInfo.id = id[0]['LAST_INSERT_ID()']
        return productInfo;
    } catch (error) {
        throw error;
    }
}


const getProduct = async(product_id)=>{
    try {
        let getQuery = `SELECT * FROM product WHERE product_id = '${product_id}'`;
        let productResult = await executeQuery(getQuery);
        if(productResult && productResult.length)
            return productResult[0]
        else
            return false
    }catch (error) {
        throw error;
    }
}


const deleteProduct = async(product_id)=>{
    try {
        let deleteQuery = `DELETE  FROM product WHERE product_id = '${product_id}'`;
        let productResult = await executeQuery(deleteQuery);
        if(productResult && productResult.length)
            return true
        else
            return false
    } catch (error) {
        throw error;
    }
}


const updateProduct = async(product_id, modProductJSON)=>{
    try {
        let updateQuery = `UPDATE product set name = '${modProductJSON.name}',category_name = '${modProductJSON.category_name}', description = '${modProductJSON.description}',buy_price = '${modProductJSON.buy_price}', sell_price = '${modProductJSON.sell_price}', quantity = '${modProductJSON.quantity}'    where id = '${product_id}'`;//update verification as true
        await executeQuery(updateQuery);
        return true;
    } catch (error) {
        throw error;
    }
}



module.exports= {
    addProduct,
    getProduct,
    deleteProduct,
    updateProduct
}