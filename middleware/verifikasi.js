const jwt = require('jsonwebtoken');
const config = require('../config/secret');

function verifikasi(){
    return function(req,rest,next){
        var role = req.body.role;
        //cek authorization header
        var tokenWithBearer = req.headers.authorization;
        if(tokenWithBearer){
            var token = tokenWithBearer.split(' ')[1];
            //verifikasi
            jwt.verify(token, config.secret, function(err, decode){
                if(err){
                    return rest.status(401).send({auth: false, mesagge: 'Token Tidak Terdaftar!'});
                }else{
                    if(role == 2){
                        req.auth = decode;
                        next();
                    }else{
                        return rest.status(401).send({auth: false, mesagge: 'Gagal Mengautorisasi Role Anda!'});
                    }
                }
            });
        }else{
            return rest.status(401).send({auth: false, mesagge: 'Token Tidak Tersedia!'});
        }
    }
}

module.exports = verifikasi;