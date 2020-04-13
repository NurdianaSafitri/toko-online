const db = require("../../config/connection")

module.exports = {
    serviceAddItem: (data, callBack)=>{
        db.query(
            `insert into item set ?`,
            data,
            (err, result, fields)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, result)
                }

            }
        )
    },
    serviceUpdateItem: (data, callBack)=>{
        db.query(
            `select * from item where item_code=?`,
            [data.item_code],
            (err, result)=>{
                if(err){
                    return callBack(err)
                }else if(result[0] == null){
                    return callBack(null, result)
                }else if(data.email == result[0].email){
                    db.query(
                        `update item set ? where item_code=?`,
                        [data, data.item_code],
                        (err, result)=>{
                            if(err){
                                return callBack(err)
                            }else{
                                return callBack(null, result)
                            }
                        }
                    )
                }else{
                    return callBack("false")
                }
            }
        )

    },
    serviceDeleteItem:(data,callBack)=>{
        db.query(
            `select item_code from item where item_code=?`,
        [data.item_code],
        (err,results)=>{
            if(err){
                return callBack(err);
            }else{
                db.query(
                    `delete from item where item_code=?`,
                    [data.item_code]);
                return callBack(null,results)
            }
        }
    )},
    serviceGetItem:callBack=>{
        db.query(`select * from item`,
        [],
        (err,result)=>{
            if(err){
                return callBack(err)
            }else{
                return callBack(null,result)
            }
        })
    },
    serviceGetItemById:(data,callBack)=>{
        db.query(
            `select * from item where item_code=?`,
            [data],
            (err,results)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null,results)
                }
            }
        )
    },
}