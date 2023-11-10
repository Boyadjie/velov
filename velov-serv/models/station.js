const mongoose = require('mongoose');

const Station = mongoose.model('Station', {
    station_id: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    capacity: {
        type: Number,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lon: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = {Station};
