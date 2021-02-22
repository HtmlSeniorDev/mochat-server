const db = require('../models/user')

/**
 * Поиск Пользователей
 * @param {Object} query
 */
function findUsers(query) {
    return db.User.find(query).exec()
}
/**
 * Обновление Пользователей
 * @param {Object} query
 * @param {callback} cb
 */
function updateUsers(query, cb) {
    db.User.updateOne(name, cb);
}
/**
 * Создание Пользователей
 * @param {Object} fields
 * @param {callback} cb
 */
function createUsers(fields, cb = null) {
    db.User.create(fields, cb);
}


module.exports.findUsers = findUsers;