const ObjectId = require('mongoose').Types.ObjectId;

module.exports.isObjectIdValid = function(id) {
    if (ObjectId.isValid(id)) {
        if (String(new ObjectId(id)) === id) {
            return true
        }
        else {
            return false
        }
    }
    else { return false }
}