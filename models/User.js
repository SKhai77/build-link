// Import necessary modules
const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

// Define the User model class that extends Sequelize's Model class
class User extends Model {
  // Method to check if a provided password matches the stored password
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

// Initialize the User model with its fields and configurations
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure that usernames are unique
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure that email addresses are unique
      validate: {
        isEmail: true, // Validate that the email field follows the email format
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8], // Validate that passwords are at least 8 characters long
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        // Hash the password before creating a new user
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      beforeUpdate: async (updatedUserData) => {
        // Hash the password before updating the user's password
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

// Export the User model
module.exports = User;
