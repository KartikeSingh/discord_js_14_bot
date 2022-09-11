const { model, Schema } = require('mongoose');

module.exports = model('stats_chhanmels_youtube_v14', new Schema({
    id: String,
    type:Number,
    guild: String,
    format: String,
}))