const db = require('../../config/connection');
module.exports={
    serviceCekBarang:(data,callBack)=>{
        db.query(
            `select stok from item where item_code=?`,
            [data.id_barang],
            (err,results)=>{
                if(err){
                    console.log(err)
                    return callBack(err);   
                }if(results.length < 1){
                    return callBack("item not found")
                }if(results[0].stok <= 0){
                    console.log(results[0].stok);
                    return callBack("out of stok");

                }else{
                    return callBack(null,results[0]);
                }
            }
        )
    },
    servicePesanBarang:(data,callBack)=>{
        db.query(
            `select * from item where item_code=?`,
            [data.kodeBarang],(err,results)=>{
                if(err){
                    console.log(err);
                    return callBack(err)
                }if(results.length < 1){
                    return callBack("No-Id")  
                }else if(results[0].stok <= 0){
                    return callBack("out of stok")
                }else if(results[0].stok < data.stok){
                    return callBack("stok tdk cukup")
                }else if(data.namaUser === results[0].owner){
                    return callBack("myItem")
                }
                else{
                    const data_barang = results[0];
                    const total = data_barang.price * data.jumlah
                    const hasil = results[0].stok - data.jumlah
                    console.log(results[0].namaBarang);
                    db.query(
                        `update item set stok=? where item_code=?`,
                        [
                            hasil,
                            data.kodeBarang
                        ]
                    );
                    db.query(
                        `insert into transaksi(namaBarang,namaUser,harga,jumlah,
                            harga_total,nama_pembeli)
                            values(?,?,?,?,?,?)`,
                            [
                                results[0].item_name,
                                results[0].owner,
                                data_barang.price,
                                data.jumlah,
                                total,
                                data.namaUser
                            ]
                    );

                    return callBack(null,results)
                }
            }
        )
    }
}