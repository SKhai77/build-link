const User = require('./User');
const Post = require('./Post'); 
const Job = require('./Job');
const JobListing = require('./JobListing');
const Message = require('./Message');
const Contractor = require('./Contractor');
const Subcontractor = require('./Subcontractor');
const Application = require('./Application');

// Associations
User.hasMany(JobListing, {
  foreignKey: 'contractor_id',
  onDelete: 'CASCADE',
});

User.hasMany(Post, {
  foreignKey: 'contractor_id',
  onDelete: 'CASCADE',
});

JobListing.belongsTo(User, {
  foreignKey: 'contractor_id',
});

User.hasMany(Contractor, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Contractor.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Subcontractor, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});

Subcontractor.belongsTo(User, {
  foreignKey: 'user_id',
});

User.hasMany(Application, {
  foreignKey: 'subcontractor_id',
  onDelete: 'CASCADE',
});

Application.belongsTo(User, {
  foreignKey: 'subcontractor_id',
});

JobListing.hasMany(Application, {
  foreignKey: 'job_id',
  onDelete: 'CASCADE',
});

Application.belongsTo(JobListing, {
  foreignKey: 'job_id',
});

User.hasMany(Message, {
  foreignKey: 'sender_id',
  onDelete: 'CASCADE',
});

Message.belongsTo(User, {
  foreignKey: 'sender_id',
  as: 'sender',
});

User.hasMany(Message, {
  foreignKey: 'receiver_id',
  onDelete: 'CASCADE',
});

Message.belongsTo(User, {
  foreignKey: 'receiver_id',
  as: 'receiver',
});

module.exports = { User, Job, JobListing, Message, Contractor, Subcontractor, Application };

// const User = require('./User');
// const Post = require('./Post');
// const Comment = require('./Comment');

// // Define associations between User, Post, and Comment models
// User.hasMany(Post, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Post.belongsTo(User, {
//   foreignKey: 'user_id',
//   onDelete: 'CASCADE'
// });

// Comment.belongsTo(Post, {
//   foreignKey: 'post_id',
//   onDelete: 'CASCADE'
// });

// Post.hasMany(Comment, {
//   foreignKey: 'post_id',
//   onDelete: 'CASCADE'
// });

// // Export the User, Post, and Comment models
// module.exports = { User, Post, Comment };
