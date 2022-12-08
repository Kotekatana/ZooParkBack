const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./routes/api')
const app = express();
app.use(bodyParser.json({limit: '50mb', extended: true}));
app.use(cors());

app.use('/api',api)
app.use('/uploads',express.static('uploads'))
const port = 5000;

app.listen(port,()=>{
    console.log(`Server started on port ${port}`)
})