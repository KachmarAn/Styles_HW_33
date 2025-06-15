const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, 'db.json');
let db = {};
try {
    const data = fs.readFileSync(dbPath, 'utf8');
    db = JSON.parse(data);
} catch (error) {
    console.error('Error reading db.json:', error);
    db = {destination: [], hotels: []};
}

app.get('/destinations', (req, res) => {
    res.json(db.destination);
});

app.get('/hotels', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    const allHotels = db.hotels;

    results.totalHotels = allHotels.length;
    results.totalPages = Math.ceil(allHotels.length / limit);
    results.currentPage = page;

    if (endIndex < allHotels.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.results = allHotels.slice(startIndex, endIndex);
    res.json(results);
});

app.get('/search', (req, res) => {
    const {city, destinationId, checkIn, checkOut, guests, rooms} = req.query;
    let filteredHotels = db.hotels;

    if (city) {
        filteredHotels = filteredHotels.filter(hotel =>
            hotel.city.toLowerCase().includes(city.toLowerCase())
        );
    } else if (destinationId) {
        const selectedDestination = db.destination.find(d => d.id === parseInt(destinationId));
        if (selectedDestination) {
            filteredHotels = filteredHotels.filter(hotel =>
                hotel.city.toLowerCase() === selectedDestination.label.toLowerCase()
            );
        }
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};
    results.totalHotels = filteredHotels.length;
    results.totalPages = Math.ceil(filteredHotels.length / limit);
    results.currentPage = page;

    if (endIndex < filteredHotels.length) {
        results.next = {
            page: page + 1,
            limit: limit
        };
    }
    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit: limit
        };
    }

    results.results = filteredHotels.slice(startIndex, endIndex);
    res.json(results);
});

app.get('/hotels/:id', (req, res) => {
    const hotelId = parseInt(req.params.id);
    const hotel = db.hotels.find(h => h.id === hotelId);

    if (hotel) {
        res.json(hotel);
    } else {
        res.status(404).json({message: 'Hotel not found'});
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});