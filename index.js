const api = require("@what3words/api");

require('dotenv').config()

api.setOptions({ key: process.env.WHATTHREEWORDS});

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

// defining the Express app
const app = express();

app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

// defining an endpoint to return all ads
app.get('/', (req, res) => {
  res.send(ads);
});

app.get('/convertLatLong/:lat/:long', (req, res) => {
    let latitude = req.params.lat;
    let longitude = req.params.long;
    api.convertTo3wa({lat:latitude, lng:longitude })
    .then(data => 
        {
            res.send(ads); 
            console.log(data)
        }
        
        
    );

    
  });

api.convertTo3wa({lat:51.520847, lng:-0.195521})
  .then(data => console.log(data));

// starting the server
app.listen(3001, () => {
  console.log('listening on port 3001');
});
