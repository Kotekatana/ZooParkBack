const db = require('../db/index');
const AnimalCard = db.animalCards;
const Animals = db.animals
const fs = require('fs')
function base64_encode(file) {
    try{
        return `data:image/${file.split('.')[1]};base64,` + fs.readFileSync(`./upload/${file}`, 'base64');
    }catch(err){
        return null
    }

}
class AnimalCardController{
    async createAnimalCard(data){
        const {animal_type,moniker,aviary_number,birthday,description,food,photo} = data
        let imgName = null
        const response = await Animals.findAll({
            attributes: ['id'],
            where:{
                "kind_of_animal":animal_type
            }
        });
        if(response.length==0){
            return {message:'no such animal'}
        }
        const id = response[0].dataValues.id

        if(birthday){
            const date = new Date(birthday).toString()
            console.log('date :',date)
        }

        if(photo){
            imgName = `img_${new Date().getTime()}.${photo.split(';')[0].split('/')[1]}`
            fs.writeFileSync(`./upload/${imgName}`,photo.split(',')[1],'base64',(err)=>{
                console.log(err)
            })
        }

        try{
            await AnimalCard.create({
                animal_id:id,moniker,aviary_number,birthday:new Date(birthday).toString(),description,food,photo:imgName
            })
        }
        catch(err){
            return {message:'error'}
        }



        return {status:'ok'}

    }
    async getAnimalCards(removed = false){
        try{
            if(removed){
                return await AnimalCard.findAll();

            }else{
                let cards = await AnimalCard.findAll({
                    where:{
                        removed
                    }
                });
                cards = cards.map((card)=>{
                    return {...card.dataValues,photo:base64_encode(card.dataValues.photo)}
                })

                return cards

            }
        }catch(err){
            console.log(err)
        }
    }
    async getAnimalCard(id){
        try{
            return await AnimalCard.findAll({
                where:{
                    id
                }
            });
        }catch(err){
            console.log(err)
        }
    }
    async updateAnimalCard(data){

    }
    async deleteAnimalCard(id){
        try{
            await AnimalCard.update({ removed: true }, {
                where: {
                  id
                }
            });
        }catch(err){
            console.log(err)
        }
    }

}

module.exports = new AnimalCardController()