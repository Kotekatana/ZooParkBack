const {Sequelize,DataTypes} = require ('sequelize')

const sequelize = new Sequelize('ZooPark','postgres','admin',{
    host:'localhost',
    dialect:'postgres'
})

const db={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.animals = require('./animal.model')(sequelize,DataTypes);
db.users = require('./user.model')(sequelize,DataTypes);
db.animalCards = require('./animal.card.model')(sequelize,DataTypes);
db.animals.hasMany(db.animalCards,{
    foreignKey: 'animal_id',
    as:'animal_card'
});
db.animalCards.belongsTo(db.animals,{
    foreignKey: 'animal_id',
    as:'animal'
});
module.exports = db;