module.exports = (sequelize,DataTypes) => {
    const AnimalCard = sequelize.define('animal_card',{
        id:{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : true
        },
        animal_id:{
            type: DataTypes.INTEGER,
            allowNull : false
        },
        moniker:{
            type: DataTypes.STRING(50),
            allowNull : true
        },
        aviary_number:{
            type: DataTypes.INTEGER,
        },
        birthday:{
            type: DataTypes.DATEONLY,
            allowNull : false
        },
        description:{
            type: DataTypes.STRING(250),
            allowNull : true
        },
        food:{
            type: DataTypes.STRING(250),
            allowNull : true
        },
        photo:{
            type: DataTypes.STRING(50),
            allowNull : false
        },
        removed:{
            type: DataTypes.BOOLEAN,
            default:false
        }

    },{
        timestamps:false,
        freezeTableName: true

    })
    return AnimalCard
}