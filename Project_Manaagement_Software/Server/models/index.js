'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize,DataTypes} = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;

  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.tasks = require('./tasks')(sequelize,DataTypes);
db.users = require('./users')(sequelize,DataTypes);
db.projects = require('./projects')(sequelize,DataTypes);
db.logs = require('./log')(sequelize,DataTypes);
db.teams = require('./teams')(sequelize,DataTypes);



 //- 4 types of associations
// db.users.hasMany(db.projects);
// db.projects.belongsTo(db.users);
// db.projects.hasMany(db.tasks);

// db.log.hasOne(db.users);



// users - logs
db.users.hasMany(db.logs,{
  foreignKey : 'created_by'
})

db.logs.belongsTo(db.users,{
  foreignKey : 'user_id'
})

// users - projects
db.users.hasMany(db.projects,{
  foreignKey : 'manager_id'
})
db.projects.belongsTo(db.users,{
  foreignKey:'manager_id'
})

// users - teams
db.users.hasMany(db.teams,{
  foreignKey:'user_id'
})
db.teams.belongsTo(db.users,{
  foreignKey : 'user_id'
})

// users - tasks
db.users.hasMany(db.tasks,{
  foreignKey:'created_by'
})
db.tasks.belongsTo(db.users,{
  foreignKey:'created_by'
})


// task - logs
db.tasks.hasMany(db.logs,{
  foreignKey:'task_id'
})
db.logs.belongsTo(db.tasks,{
  foreignKey:'task_id'
})

// project - teams
db.projects.hasMany(db.teams,{
  foreignKey:'project_id'
})

db.teams.belongsTo(db.projects,{
  foreignKey:'project_id'
})

db.projects.hasMany(db.tasks,{
  foreignKey : 'project_id'
})

db.tasks.belongsTo(db.projects,{
  foreignKey:'project_id'
})

// // task - logs
// db.tasks.hasMany(db.logs,{
//   foreignKey:'task_id'
// })
// db.logs.belongsTo(db.tasks,{
//   foreignKey : 'task_id'
// })

module.exports = db;