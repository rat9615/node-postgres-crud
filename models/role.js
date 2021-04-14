const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Role.belongsToMany(models.User, {
                through: 'UserRoles',
                foreignKey: 'role_id',
                otherKey: 'user_id',
                allowNull: false
            });
        }
    }
    Role.init(
        {
            roleId: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            roleName: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Role',
            tableName: 'Role',
            timestamps: false
        }
    );
    return Role;
};
