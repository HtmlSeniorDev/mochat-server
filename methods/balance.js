const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../mongoose/user');

/**
 * Проверка баланса длятпокупки услуги
 * @param {String} userId
 * @param {Number} priceService
 * @returns {boolean}
 */
function checkBalance(userId,priceService) {
    if (ObjectId.isValid(userId)) {
        const user = User.findUsers({
            _id: ObjectId(userId)
        },)
        const balance  = user.balace
        return balance > priceService;
    }
    return false
}

