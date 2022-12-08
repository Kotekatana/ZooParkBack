module.exports = (sequelize,DataTypes) => {
    const Animal = sequelize.define('animal',{
        id:{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : true
        },
        kind_of_animal:{
            type: DataTypes.STRING(30),
            allowNull : false
        },
        description:{
            type: DataTypes.STRING(250),
            allowNull : true
        },
        removed:{
            type: DataTypes.BOOLEAN,
            default:false
        }

    },{
        timestamps:false,
        freezeTableName: true

    })
    return Animal
}