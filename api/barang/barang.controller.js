const{
    serviceAddItem,
    serviceUpdateItem,
    serviceDeleteItem,
    serviceGetItem,
    serviceGetItemById
} = require("./barang.service")
const {
    checkToken
} = require("../../auth/token_validation")
const { verify } = require("jsonwebtoken")

module.exports = {
    controllerAddItem: (req, res)=>{
        let body = req.body
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login firts"
                    })
                }else{
                    var user = decoded.result
                    const data_item ={
                        item_name: body.namaBarang,
                        price: body.harga,
                        stok: body.stok,
                        owner: user.firstName,
                        email: user.email
                    }
                    serviceAddItem(data_item, (err, results)=>{
                        if(err){
                            console.log(err)
                            return res.json({
                                success: 0,
                                message: "not success input item"
                            })
                        }else{
                            return res.json({
                                success: 1,
                                message: "succes input new item",
                                data: results
                            })
                        }
                    })
                }
            })
        }
    },
    controllerUpdateItem: (req, res)=>{
        let body = req.body
        let token = req.get("authorization")
        if(token){
            token = token.slice(7)
            verify(token, "secretkey", (err, decoded)=>{
                if(err){
                    res.json({
                        success: 0,
                        message: "login first"
                    })
                }else{
                    var user = decoded.result
                    const data_item ={
                        item_code: body.kode,
                        item_name: body.namaBarang,
                        price: body.harga,
                        stok: body.stok,
                        email: user.email
                    }
                    serviceUpdateItem(data_item, (err, results)=>{
                        if(err){
                            if(err === "false"){
                                return res.json({
                                    success: 0,
                                    message: "user account access denied to access data"
                                })
                            }
                            else{
                                return console.log(err)
                            }
                        }if(!results){
                            console.log(results)
                            return res.json({
                                success: 0,
                                message: "Data Not Found"
                            })
                        }else{
                            return res.json({
                                success: 1,
                                message: "Update succesfuly"
                            })
                        }
                    })
                }
            })
        }
    },
    controllerDeleteItem:(req,res)=>{
        const body = req.body;
        serviceDeleteItem(body,(err,results)=>{
            if(err){
                return res.json({
                    success:0,
                    message:"Not Found data"+err
                })
            }else{
                return res.json({
                    success:1,
                    message:"Delete Success"
                })
            }
        })
    },
    controllerGetItem:(req,res)=>{
        serviceGetItem((err,results)=>{
            if(err){
                console.log(err)
                return
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
    controllerGetItemById:(req,res)=>{
        const data = req.params.id;
        serviceGetItemById(data,(err,results)=>{
            if(err){
                return res.json({
                    success:0,
                    message:"Not Found"
                })
            }else{
                return res.json({
                    success:1,
                    data:results
                })
            }
        })
    },
}