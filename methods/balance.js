const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../mongoose/user');
const Magic = require('../const')

/**
 * Проверка баланса для покупки услуги
 * @param {String} userId
 * @param {Number} priceService
 * @returns {Promise<{allowed: boolean}>}
 */
function checkBalance(userId, priceService) {
  if (ObjectId.isValid(userId)) {
    return User.findSingleUser({
      _id: ObjectId(userId)
    }).then(usr => {
      return {
        allowed: priceService <= usr.balace / Magic.deltaBalance
      }
    })
      .catch(e => e)
  }
}

module.exports = {
  checkBalance
}