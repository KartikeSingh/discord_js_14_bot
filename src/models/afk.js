const { model, Schema } = require('mongoose');

module.exports = model('afk_schema_tutorial', new Schema({
    id: String,
    afk: {
        type: Boolean,
        default: false
    },
    reason: {
        type: String,
        default: "No reason"
    },
    mentions: {
        type: Number,
        default: 0
    },
    since: Number,
}))