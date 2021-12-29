require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@chatio.58yn2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => {
        console.log("Connection to MongoDB ok")
    })
    .catch(err => console.log(err));

module.exports = mongoose;