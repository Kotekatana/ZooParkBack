const db = require('../db/index');
const Users = db.users;

class UserController{
    async createUser(data){
        const {name,email,phone,password} = data
        console.log(name,email,phone,password)
        try{
            Users.create({
                name,email,phone,password
            })
        }catch(err){
            console.log(err)
        }
    }
    async getUsers(removed = false){
        try{
            if(removed){
                return await Users.findAll();
            }else{
                return await Users.findAll({
                    where:{
                        removed
                    }
                });
            }
        }catch(err){
            console.log(err)
        }
    }
    async getUser(id){
        try{
            const user = await Users.findAll({
                attributes: ['name', 'email','phone','id'],
                where:{
                    id
                }
            });
            return user
        }catch(err){
            console.log(err)
        }
    }
    async updateUser(req,res){

    }
    async deleteUser(id){
        try{
            await Users.update({ removed: true }, {
                where: {
                  id
                }
            });
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = new UserController()