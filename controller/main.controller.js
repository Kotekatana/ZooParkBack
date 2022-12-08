const userController = require('./user.controller');
const animalController = require('./animal.controller');
const animalCardController = require('./animal.card.controller');

class MainController{
    async getEntity(req,res){
        try{
            switch (req.params.entityName){
                case 'user':
                    const user = await userController.getUser(req.params.id)
                    delete user.password
                    res.send(user)
                    break
                case 'animal':
                    const animal = await animalController.getAnimal(req.params.id)
                    res.send(animal)
                    break
                case 'animalCard':
                    const animalCard = await animalCardController.getAnimalCard(req.params.id)
                    res.send(animalCard)
                    break
                default:
                    res.sendStatus('404')
            }
        }catch(err){
            console.log(err)
            res.send('error')
        }
    }

    async getEntityCollection(req,res){
        try{
            switch (req.params.entityName){
                case 'user':
                    const users = await userController.getUsers(req.query.removed)
                    res.send(users)
                    break
                case 'animal':
                    const animals = await animalController.getAnimals(req.query.removed)
                    res.send(animals)
                    break
                case 'animalCard':
                    const animalCards = await animalCardController.getAnimalCards(req.query.removed)
                    res.send(animalCards)
                    break
                default:
                    res.sendStatus('404')
            }
        }catch(err){
            console.log(err)
            res.send('error')
        }
    }

    async createEntity(req,res){

            switch (req.params.entityName){
                case 'user':
                    try{
                        const result = await userController.createUser(req.body)
                        res.sendStatus(200)
                        break
                    }
                    catch{
                        res.sendStatus(500)
                        break
                    }
                case 'animal':
                    try{
                        animalController.createAnimal(req.body)
                        res.sendStatus(200)
                        break
                    }
                    catch{
                        res.sendStatus(500)
                        break
                    }

                case 'animalCard':
                    // try{
                        const result = await animalCardController.createAnimalCard(req.body)
                        console.log('message',result)

                        if(result.message){
                            res.status(400).send({message:result.message})
                        }else{
                            res.status(200).send({message:'good'})
                        }

                        break

                    // }
                    // catch{
                    //     console.log('Мы упали в кэч')
                    //     res.sendStatus(500)
                    //     break
                    // }

                default:
                    res.sendStatus('404')
            }
    }

    async updateEntity(req,res){
        try{
            switch (req.params.entityName){
                case 'user':

                    break
                case 'animal':

                    break
                case 'animalCard':

                    break
                default:
                    res.sendStatus('404')
            }
        }catch(err){
            console.log(err)
            res.send('error')
        }
    }
    async deleteEntity(req,res){
        try{
            switch (req.params.entityName){
                case 'user':
                    userController.deleteUser(req.params.id)
                    res.sendStatus(200)
                    break
                case 'animal':
                    animalController.deleteAnimal(req.params.id)
                    res.sendStatus(200)
                    break
                case 'animalCard':
                    animalCardController.deleteAnimalCard(req.params.id)
                    res.sendStatus(200)
                    break
                default:
                    res.sendStatus('404')
            }
        }catch(err){
            console.log(err)
            res.send('error')
        }
    }
}

module.exports = new MainController()