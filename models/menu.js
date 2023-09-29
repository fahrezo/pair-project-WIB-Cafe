'use strict';
const rupiah = require('../helpers');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.hasMany(models.Order, {foreignKey: 'MenuId'})
    }

    get priceRp() {
      return rupiah(this.price)
    }
  }
  Menu.init({
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {msg: `Food's name is required`},
        notEmpty: {msg: `Food's name is required`}
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Price is required'},
        notEmpty: {msg: 'Price is required'}
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Category is required'},
        notEmpty: {msg: 'Category is required'}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Description is required'},
        notEmpty: {msg: 'Description is required'}
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Image URL is required'},
        notEmpty: {msg: 'Image URL is required'}
      }
    }
  }, {
    sequelize,
    modelName: 'Menu',
  });
  return Menu;
};