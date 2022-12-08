module.exports = (sequelize,DataTypes) => {
    const User = sequelize.define('users',{
        id :{
            type : DataTypes.INTEGER,
            autoIncrement : true,
            primaryKey : true,
            allowNull : true
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false
        },
        phone:{
            type: DataTypes.STRING,
            allowNull:false
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false
        },
        removed:{
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },

    },{
        timestamps:false,
        freezeTableName: true
    });
    return User
}