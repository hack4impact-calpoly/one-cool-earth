const mongoose = require('mongoose')
const URL = process.env.MONGO_URL

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.catch(err => {
    console.log(`mongoose error while connecting: ${err}`);
});

mongoose.connection.on('connected', () => {
    console.log(`mongoose connection open to ${URL}`);
});

mongoose.connection.on('error', (err) => {
    console.log(`mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log("disconnected from mongoose");
});
