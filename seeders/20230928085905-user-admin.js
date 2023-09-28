'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/user-admin.json', 'utf-8'))

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Users', data)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {})
  }
};
