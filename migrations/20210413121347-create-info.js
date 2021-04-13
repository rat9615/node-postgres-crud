'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('Info', {
            city: {
                type: Sequelize.STRING,
                allowNull: false
            },
            mobile: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            id: {
                type: Sequelize.INTEGER,
                references: {
                    model: {
                        tableName: 'User'
                    },
                    key: 'id'
                },
                allowNull: false
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
