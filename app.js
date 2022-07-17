const express = require('express');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const keys=require('./config/keys');
const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true });
const db=mongoose.connection;
db.on('error', console.log.bind("Not connection "));
db.once("open", function () {
    console.log("connection successed");
})

app.get('/', (req, res) => {
    res.send({
        "Hi": "Welcome"
    });
});

require('./routes/productRoutes')(app);


app.listen(8000, () => {
    console.log("Server Listen port is 8000");
});