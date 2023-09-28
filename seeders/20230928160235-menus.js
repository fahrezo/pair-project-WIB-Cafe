'use strict';
const fs = require('fs')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    const data = JSON.parse(fs.readFileSync('./data/menus.json', 'utf-8'))

    data.forEach((el) => {
      el.createdAt = el.updatedAt = new Date()
    })

    return queryInterface.bulkInsert('Menus', data)
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Menus', null, {})
  }
};
