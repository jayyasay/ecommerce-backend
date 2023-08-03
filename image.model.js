const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    itemName: {
        type: String,
        required: true,
    },
    itemDesc: {
        type: String,
        required: true,
    },
    itemQuantity: {
        type: Number,
        required: true,
    },
    itemPrice: {
        type: Number,
    },
    itemWidth: {
        type: Number,
    },
    itemHeight: {
        type: Number,
    },
    itemLength: {
        type: Number,
    },
    itemMaterial: {
        type: String,
    },
    itemFinish: {
        type: String,
    },
    itemProductionDays: {
        type: Number,
    },
    itemImage: {
        data: Buffer,
        contentType: String
    }
});

module.exports = mongoose.model("Products", ProductSchema)