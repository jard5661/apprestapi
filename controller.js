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