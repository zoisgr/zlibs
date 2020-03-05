const express = require('express');


const app = express();
app.listen(5000);

app.use(express.static(`${__dirname}/public`));
app.use(express.static(`${__dirname}/../dist`));