// Import the User, Post, and Comment models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// Define associations between User, Post, and Comment models
User.hasMany(Post, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

// Export the User, Post, and Comment models
module.exports = { User, Post, Comment };
