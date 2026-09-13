const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    title: String,
    poster: String,
    rating: String,
    commentsCount: Number,
    inTheaters: Boolean
});
module.exports = mongoose.model('Movie', movieSchema);