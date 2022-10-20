const  mongoose  = require('mongoose')
const express = require('express')
const bodyParser = require("body-parser")
const routes = require('./routes/api')
const cors = require('cors')

const port = 3001
const app = express()
require('dotenv').config()
app.use(cors())

mongoose.Promise = global.Promise
mongoose.connect( process.env.DB, {useNewUrlParser: true})
    .then(() => console.log('connected to DB'))
    .catch((err) => console.log(err))

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization');
//     next();
// });

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use('/api', routes)


app.listen( port, () => {
    console.log(`server listening on ${port} `);
})

module.exports = app;