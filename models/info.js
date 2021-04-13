const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Info extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Info.belongsTo(models.User);
        }
    }
    Info.init(
        {
            city: {
                type: DataTypes.STRING,
                allowNull: false
            },
            mobile: {
                type: DataTypes.BIGINT(10),
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Info',
            tableName: 'Info',
            timestamps: false
        }
    );
    return Info;
};
