const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const userSchema = schema({
    local: {
        email: {type: String, required: true, unique: true},
        password: {type: String}
    },
    username: String,
});

userSchema.statics.hashPassword = async (pwd) => {
    try {
        return bcrypt.hash(pwd, 12);
    } catch (e) {
        throw e;
    }
};

userSchema.methods.comparePassword = function (pwd) {
    return bcrypt.compare(pwd, this.local.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;