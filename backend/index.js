const express = require('express')
const cors = require('cors');
const { router } = require('./router');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1',router);

app.listen(3000, ()=> {
    console.log('server is listening');
})
