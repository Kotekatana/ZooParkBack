const db = require('../db/index');
const Animals = db.animals;

class AnimalController{
    async createAnimal(data){
        const {kind_of_animal,description} = data
        console.log(kind_of_animal,description)
        try{
            Animals.create({
                kind_of_animal,
                description
            })
        }catch(err){
            console.log(err)
        }
    }
    async getAnimals(removed = false){
        try{
            if(removed){
                return await Animals.findAll();
            }else{
                return await Animals.findAll({
                    where:{
                        removed
                    }
                });
            }
        }catch(err){
            console.log(err)
        }
    }
    async getAnimal(id){
        try{
            return await Animals.findAll({
                where:{
                    id
                }
            });
        }catch(err){
            console.log(err)
        }
    }
    async updateAnimal(data){

    }
    async deleteAnimal(id){
        try{
            await Animal.update({ removed: true }, {
                where: {
                  id
                }
            });
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = new AnimalController()