'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.Menu, { foreignKey: 'MenuId'}),
      Order.belongsTo(models.User, { foreignKey: 'UserId'})
    }

  }
  Order.init({
    MenuId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please insert the quantity ^^'},
        notEmpty: {msg: 'Please insert the quantity ^^'},
        notZero() {
          if (this.amount && this.amount<=0) {
            throw new Error('Need at least 1 quantity')
          }
        }
      }
    },
    totalprice: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};