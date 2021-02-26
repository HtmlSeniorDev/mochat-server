const Magic = require('../const');
const User = require('../mongoose/user');
const Helpers = require('../helpers')
const ObjectId = require('mongoose').Types.ObjectId;

/**
 * Получить список авторитетов чата
 * @returns {Promise<T | *[]>}
 */
function getBiggestAvtoritet() {
  return User.findUsers({
    rating: {$ne: null}
  }).then(users => users.sort(Helpers.byField('rating')))
    .catch(e => {
      console.log(e)
      return []
    })
}

function buyAvtoritet(userId, counts) {
  User.findSingleUser({
    _id: userId
  })
    .then(r => {
      User.updateUsers(
        {_id: ObjectId(userId)},
        {rating: r.rating + counts,
          /**
           * Умножаем стоимость услуги на 1000 тк как баланс в бд * 1000
           */
          balace:r.balace - counts * Magic.deltaBalance},
        () => {
        }).then(r => console.log(r))
    })

}

module.exports = {
  getBiggestAvtoritet,
  buyAvtoritet
};