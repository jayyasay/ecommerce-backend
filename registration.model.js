const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const RegistrationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});



RegistrationSchema.pre("save", async function(next) {
    const user = this;
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
        });
    });
    // if (!user.isModified("password")) return next();
    // const salt = await bcrypt.genSalt(10);
    // const hash = await bcrypt.hash(user.password, salt);
    // user.password = hash;
    next();
});

module.exports = mongoose.model("Registration", RegistrationSchema)