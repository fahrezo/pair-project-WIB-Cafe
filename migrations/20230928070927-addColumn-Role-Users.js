'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Users', 'role', {
      type: Sequelize.STRING
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Users', 'role')
  }
};
