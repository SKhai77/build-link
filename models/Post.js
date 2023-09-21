// Import necessary modules and initialize the Sequelize model and connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Post model class that extends Sequelize's Model class
class Post extends Model {}

// Initialize the Post model with its fields and configurations
Post.init(
  {
    // 'id' is the primary key for Post, auto-incremented integer
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // 'title' stores the title of the post as a string
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // 'content' stores the content of the post as a string
    content: {
      type: DataTypes.STRING,
    },
    // 'date_created' stores the creation date of the post as a date
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    // 'user_id' is a foreign key referencing the 'user' model's 'id' field
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post',
  }
);

// Export the Post model
module.exports = Post;
