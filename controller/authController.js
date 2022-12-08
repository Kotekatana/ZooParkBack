const bcrypt = require('bcryptjs');
const db = require('../db/index');
const {client} = require ('../redis')
const Users = db.users;

generateToken = (name)=>{
    return bcrypt.hashSync(`${name + new Date()}`, 7)
}
class authController {
    async registration(req,res){
        const {name,email,phone,password} = req.body

        const user = await Users.findAll({
            where:{
                name
            }
        });
        if(!user.length == 0){
            return res.status(400).json('Пользователь с таким именем уже существует')
        }
        try{
            Users.create({
                name:name,
                email:email,
                phone:phone,
                password:bcrypt.hashSync(password, 7)
            })
        }
        catch(err){
            console.log(err)
            return res.status(400).json('Что то пошло не так')
        }
        res.status(200).json("Новый пользователь успешно создан")
    }
    async login(req,res){
        console.log(req.body)
        const {name,password} = req.body
        const response = await Users.findAll({
            where:{
                name
            }
        })
        if(response.length == 0){
            return res.status(400).json({message:"Неверный логин или пароль"})
        }
        const user = response[0].dataValues
        if(!bcrypt.compareSync(password, user.password)){
            res.status(401).json("Неверный логин или пароль")
        }
        const token = generateToken(name)
        user.token = token
        client.set( `usr_${token}`,user.id ,"EX", 60*15)
        return res.status(200).json({user})


    }
}
module.exports = new authController