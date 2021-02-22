/**
 * Сортировка наивысшего авторитета у пользователей для чат порталаь(4 человека)
 * @param users
 */
const User = require('../mongoose/user');

function SerializeBiggestAvtoritet() {
  return  User.findUsers({
    rating: {$ne: null}
  })
}



// function byField(field) {
//   return (a, b) => a[field] > b[field] ? 1 : -1;
// }

exports.SerializeBiggestAvtoritet = SerializeBiggestAvtoritet;