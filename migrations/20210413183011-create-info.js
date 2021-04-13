module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('Info', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mobile: {
                type: Sequelize.BIGINT(10),
                allowNull: false
            },
            UserId: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'User'
                    },
                    key: 'id'
                },
                allowNull: false,
                onDelete: 'CASCADE'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('Info');
    }
};
