const db = require('../models/user')

/**
 * Поиск Пользователей
 * @param {Object} query
 */
function findUsers(query) {
    return db.User.find(query).exec()
}
/**
 * Поиск Пользователя
 * @param {Object} query
 */
function findSingleUser(query) {
  return db.User.findOne(query).exec()
}
/**
 * Обновление Пользователей
 * @param filter
 * @param {Object} query
 * @param {{price: *}} cb
 */
function updateUsers(filter, query, cb) {
  console.log(filter,query)
    return  db.User.updateOne(filter,
      { $set: query}, function (err, docs) {
          if (err){
              console.log(err)
          }
          else{
              console.log("Updated Docs : ", docs);
          }
      }).exec();
}
/**
 * Создание Пользователей
 * @param {Object} fields
 * @param {callback} cb
 */
function createUsers(fields, cb = null) {
    db.User.create(fields, cb);
}


module.exports = {
    findUsers,
    updateUsers,
    findSingleUser
}