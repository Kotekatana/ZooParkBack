const e = require('express')
const {client,redis} = require ('../redis')

module.exports = function(req,res,next){
    if(req.method ==="OPTIONS"){
        next()
    }
    try{
        if(req.headers.authorization==undefined){
            return res.status(403).json({message:"пользователь не авторизован"})
        }
        const token = req.headers.authorization.split(' ')[1]

        client.get(`usr_${token}`,(err,result)=>{
            if(err) return res.status(403).json({message:"Error"})
            if(!result) return res.status(403).json({message:"Access denied"})

            next()
        })


    }catch(error){
        console.log(error)
        return res.status(403).json({message:"пользователь не авторизован"})
    }
}