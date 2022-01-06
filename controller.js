'use strict';
var response = require('./res');
var connection = require('./koneksi');

exports.index = function(req,res){
    response.ok('Applikasi berjalan',res);
}

//menampilkan semua data mahasiswa
exports.tampilsemuamahasiswa = function(req,res){
    connection.query('SELECT * FROM mahasiswa', function(error, rows, fields){
        if(error){
            connection.log(error);
        }else{
            response.ok(rows,res,fields);
        }
    });
};

//menampilkan data mahasiswa berdasarkan id
exports.tampilberdasarkanid = function(req,res){
    let id = req.params.id;
    connection.query('SELECT * FROM mahasiswa WHERE id_mahasiswa = ?',[id],
        function(error, rows, fields){
            if(error){
                connection.log(error);
            }else{
                response.ok(rows,res,fields);
            }
        });
};

//menambahkan data mahasiswa
exports.tambahmahasiswa =  function(req,res){
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('INSERT INTO mahasiswa (nim,nama,jurusan) VALUES (?,?,?)', [nim,nama,jurusan],
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.ok("Berhasil Menambahkan Data!", res)
            }
        });
};

//mengubah data mahasiswa berdasarkan id
exports.ubahMahasiswa = function(req,res){
    var id_mahasiswa = req.body.id_mahasiswa;
    var nim = req.body.nim;
    var nama = req.body.nama;
    var jurusan = req.body.jurusan;

    connection.query('UPDATE mahasiswa SET nim=?, nama=?, jurusan=? WHERE id_mahasiswa = ? ',[nim,nama,jurusan,id_mahasiswa],
    function(error,rows,fields){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasil Mengubah Data Mahasiswa",res)
        }

    });
};

//menghapus data mahasiswa berdasarkan id
exports.hapusMahasiswa = function(req,res){
    var id_mahasiswa = req.body.id_mahasiswa;
    connection.query('DELETE FROM mahasiswa WHERE id_mahasiswa =?',[id_mahasiswa],
    function(error,rows,field){
        if(error){
            console.log(error);
        }else{
            response.ok("Berhasi Menghapus Data Mahasiswa",res)
        }
    });
};

//menampilkan getAll data mahasiswa,krs,matakuliah
exports.getAlldataMahasiswa = function(req,res){
    connection.query('SELECT a.id_mahasiswa,a.nim,a.nama,a.jurusan,b.id_krs,b.tanggal_krs,b.id_matakuliah,c.matakuliah,c.sks FROM mahasiswa a JOIN krs b ON b.id_mahasiswa = a.id_mahasiswa JOIN matakuliah c ON c.id_matakuliah = b.id_matakuliah ORDER BY a.id_mahasiswa', 
        function(error,rows,fields){
            if(error){
                console.log(error);
            }else{
                response.oknested(rows,res,fields)
            }

        });
};