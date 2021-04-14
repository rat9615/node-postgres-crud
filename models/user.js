const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            User.hasOne(models.Info, {
                foreignKey: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    unique: true
                },
                onDelete: 'CASCADE'
            });

            User.hasMany(models.Product, {
                foreignKey: {
                    type: DataTypes.INTEGER,
                    allowNull: false
                },
                onDelete: 'CASCADE'
            });

            User.belongsToMany(models.Role, {
                through: 'UserRoles',
                foreignKey: 'user_id',
                otherKey: 'role_id',
                allowNull: false
            });
        }
    }
    User.init(
        {
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            age: {
                type: DataTypes.INTEGER,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'User',
            timestamps: false
        }
    );
    return User;
};
