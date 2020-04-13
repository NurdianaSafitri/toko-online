const db = require("../../config/connection")

module.exports = {
    serviceAddUser: (data, callBack)=>{
        db.query(
            `insert into registration(firstName, lastName, gender, email, password, number)
                values (?,?,?,?,?,?)`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number
            ],
            (err, results, fields) => {
                if(err){
                    return callBack(err);
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceGetUsers: callBack => {
        db.query(
            `select * from registration`,
            [],
            (err, results, fields)=> {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceGetUsersById: (IDBCursor, callBack)=> {
        db.query(
            `select * from registration where id = ?`,
            [id],
            (err, results, fields) => {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    },
    serviceUpdateUser: (data, callBack)=> {
        db.query(
            `update registration set firstName=?, lastName=?, gender=?, email=?, password=?, number=? where id=?`,
            [
                data.first_name,
                data.last_name,
                data.gender,
                data.email,
                data.password,
                data.number,
                data.id
            ],
            (err, results, fields) => {
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results)
                }
            }
        )
    },
    serviceDeleteUser: (data, callBack) => {
        db.query(`select * from registration where id=?`,
            [data.id],
            (err, results)=>{
                if(err){
                    callBack(err)

                }if(!results){
                   callBack(results)
                   //console.log(result)
                }
                else{
                    db.query('delete from registration where id=?',
                            [data.id]
                )
                    //console.log(results)
                    return callBack(null, results[0])
            }}
        )
    },
    serviceGetUserByEmail: (email, callBack)=> {
        db.query(
            `select firstName, email, password from registration where email = ?`,
            [email],
            (err, results, fields)=>{
                if(err){
                    return callBack(err)
                }else{
                    return callBack(null, results[0])
                }
            }
        )
    }
}
