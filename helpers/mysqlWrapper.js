const mysql                     = require("mysql")
const dbConnectionProperties    = require("../config/mysqlConfig")
let pool                        = mysql.createPool(dbConnectionProperties.connection);

const executeQuery = (incomingQuery)=>{
    return new Promise((resolve, reject)=>{
        console.log("inside executequery", incomingQuery)
        pool.getConnection((error, connection)=>{
            if(error)
                reject(error)
            else{
                connection.query(incomingQuery, (err, data)=>{
                    if(err)
                        reject(err)
                    else    
                        resolve(data)
                })
            }
        })
    })
}

module.exports = {
    executeQuery
}