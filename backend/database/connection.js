const mongoose = require('mongoose')
const uri = 'mongodb+srv://dev:iLOVEonecoolearth@cluster0.2afzw.mongodb.net/oceUsers?retryWrites=true&w=majority'

module.exports = () => {
    mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch(err => {
        console.log(`mongoose error while connecting: ${err}`);
    });

    mongoose.connection.on('connected', () => {
        console.log(`mongoose connection open to ${uri}`);
    });

    mongoose.connection.on('error', (err) => {
        console.log(`mongoose connection error: ${err}`);
    });

    mongoose.connection.on('disconnected', () => {
        console.log("disconnected from mongoose");
    });
}