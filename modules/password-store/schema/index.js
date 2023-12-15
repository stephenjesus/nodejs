const mongoose = require('mongoose');

// Define the schema for the Password model
const passwordSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true,
    },
    strength: {
        type: String,
        required: true,
    },
}, { timestamps: true }); // Including timestamps for createdAt and updatedAt

// Create the Password model using the defined schema
const Password = mongoose.model('Password', passwordSchema);

module.exports = { Password };
