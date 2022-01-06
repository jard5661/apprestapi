'use strict';

exports.ok = function(value,res){
    var data = {
        'status':200,
        'values':value
    }
     res.json(data);
     res.end();
}

//respone nested matakuliah
exports.oknested = function(value,res){
    //lakukan akumulasi
    const hasil = value.reduce((akumulasikan, item)=>{
        //tentukan key group
        if(akumulasikan[item.nim]){
            //buat variabel group mahasiswa
            const group = akumulasikan[item.nim];
            //cek apakah ada matakuliah yang sama
            if(Array.isArray(group.matakuliah)){
                //tambahkan value ke dalam group matakuliah
                group.matakuliah.push(item.matakuliah);
            }else{
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        }else{
            akumulasikan[item.nim] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status':200,
        'values':hasil
    }
     res.json(data);
     res.end();

}