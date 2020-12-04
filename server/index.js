// Section 1
const express = require('express');
const restaurants = require("./routes/restaurants");
const cors = require('cors');
const path = require('path');

// Section 2
const app = express();
// Section 3
app.get('/', (req, res) => { 
 res.send("<h1>Home page</h1>");
});
app.use("/rest", restaurants);

// Section 4
app.listen(4200, () => {
 console.log('server started on port 4200');
});