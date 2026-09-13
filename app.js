const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.set('view engine', 'ejs');
app.use(express.static('public'));
mongoose.connect('mongodb://localhost:27017/moviehunter')
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
        console.log('MongoDB connection error:', error);
    });
const movieSchema = new mongoose.Schema({
    title: String,
    poster: String,
    rating: String,
    commentsCount: Number,
    inTheaters: Boolean
});
const Movie = mongoose.model('Movie', movieSchema);
app.get('/moviepage', async (req, res) => {
    try {
        const showInTheaters = req.query.filter === 'theaters';
        const search = req.query.search ? req.query.search.trim() : '';
        const query = {};
        if (showInTheaters) {
            query.inTheaters = true;
        }
        if (search) {
            query.title = {
                $regex: search,
                $options: 'i'
            };
        }
        const displayedMovies = await Movie.find(query);
        res.render('index', {
            movies: displayedMovies,
            currentFilter: showInTheaters ? 'In Theaters' : 'All Movies',
            search: search,
            showInTheaters: showInTheaters
        });
    } catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(5050, () => {
    console.log('Server running at http://localhost:5050/moviepage');
});