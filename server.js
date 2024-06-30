const express = require('express');
const axios = require('axios').default;
const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');

const app = express();
const PORT = 3002
const VEHICLES_FILE_PATH = path.join(__dirname + '/public/', 'vehicles.json');
const ROUTES_FILE_PATH = path.join(__dirname + '/public/', 'trips.json');
const TRIPS_FILE_PATH = path.join(__dirname + '/public/', 'routes.json');
const SHAPES_FILE_PATH = path.join(__dirname + '/public/', 'shapes.json');
const STOPS_FILE_PATH = path.join(__dirname + '/public/', 'stops.json');
const STOP_TIMES_FILE_PATH = path.join(__dirname + '/public/', 'stopTimes.json');

const vehiclesKeys = ['TxUpzDZrY1Snplzx5ty1nTXAr4donKGQQkYQDtBC', 'TxUpzDZrY1Snplzx5ty1nTXAr4donKGQQkYQDtBC']
let keysIndex = 0

// Function to fetch data from the API
async function fetchRecurrentData() {
    if (keysIndex === 0)
        keysIndex = 1
    else keysIndex = 0

    //vehicles
    let options = {
        method: 'GET',
        url: 'https://api.tranzy.ai/v1/opendata/vehicles',
        headers: {
            'X-Agency-Id': '2',
            Accept: 'application/json',
            'X-API-KEY': vehiclesKeys[keysIndex]
        }
    };

    try {
        const { data } = await axios.request(options);
        fs.writeFileSync(VEHICLES_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    }
}

schedule.scheduleJob('*/10 * * * * *', fetchRecurrentData);

async function fetchLateData() {
    //routes
    let options = {
        method: 'GET',
        url: 'https://api.tranzy.ai/v1/opendata/routes',
        headers: {
            'X-Agency-Id': '2',
            Accept: 'application/json',
            'X-API-KEY': 'ksRfq3mejazGhBobQYkPrgAUfnFaClVcgTa0eIlJ'
        }
    };

    try {
        const { data } = await axios.request(options);
        fs.writeFileSync(ROUTES_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    }

    //trips
    options = {
        method: 'GET',
        url: 'https://api.tranzy.ai/v1/opendata/trips',
        headers: {
            'X-Agency-Id': '2',
            Accept: 'application/json',
            'X-API-KEY': 'ksRfq3mejazGhBobQYkPrgAUfnFaClVcgTa0eIlJ'
        }
    };

    try {
        const { data } = await axios.request(options);
        fs.writeFileSync(TRIPS_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    }

    //shapes
    options = {
        method: 'GET',
        url: 'https://api.tranzy.ai/v1/opendata/shapes',
        headers: {
            'X-Agency-Id': '2',
            Accept: 'application/json',
            'X-API-KEY': 'ksRfq3mejazGhBobQYkPrgAUfnFaClVcgTa0eIlJ'
        }
    };

    try {
        const { data } = await axios.request(options);
        fs.writeFileSync(SHAPES_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    }

    //stops
    options = {
        method: 'GET',
        url: 'https://api.tranzy.ai/v1/opendata/stops',
        headers: {
            'X-Agency-Id': '2',
            Accept: 'application/json',
            'X-API-KEY': 'ksRfq3mejazGhBobQYkPrgAUfnFaClVcgTa0eIlJ'
        }
    };

    try {
        const { data } = await axios.request(options);
        fs.writeFileSync(STOPS_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    }

    //stop times
    options = {
        method: 'GET',
        url: 'https://api.tranzy.ai/v1/opendata/stop_times',
        headers: {
            'X-Agency-Id': '2',
            Accept: 'application/json',
            'X-API-KEY': 'ksRfq3mejazGhBobQYkPrgAUfnFaClVcgTa0eIlJ'
        }
    };

    try {
        const { data } = await axios.request(options);
        fs.writeFileSync(STOP_TIMES_FILE_PATH, JSON.stringify(data, null, 2), 'utf8');
    } catch (error) {
        console.error(error);
    }
}
schedule.scheduleJob('0 0 0 * * *', fetchLateData);

app.get('/vehicles', (req, res) => {
    fs.readFile(VEHICLES_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/routes', (req, res) => {
    fs.readFile(ROUTES_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/trips', (req, res) => {
    fs.readFile(TRIPS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/stops', (req, res) => {
    fs.readFile(STOPS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/stoptimes', (req, res) => {
    fs.readFile(STOP_TIMES_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/shapes', (req, res) => {
    fs.readFile(SHAPES_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    });
});

app.get('/destinatii', async (req, res) => {
    const apiKey = 'AIzaSyAW0rKcBmVtEZ12-9oUmjSHDyvdy-6fr3w'
    const options = {
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/directions/json?origin=${req.query.origin}&destination=${req.query.destination}&key=${apiKey}&mode=transit&language=RO`
    }

    try {
        const { data } = await axios.request(options);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        console.error(error);
    }

})

app.get('/address', async (req, res) => {
    const key = 'AIzaSyAW0rKcBmVtEZ12-9oUmjSHDyvdy-6fr3w'
    const options = {
        method: 'GET',
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${req.query.latlng}&sensor=true&key=${key}`
    }
    try {
        const { data } = await axios.request(options);
        res.setHeader('Content-Type', 'application/json');
        res.send(data);
    } catch (error) {
        // console.error(error);
    }
})



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    fetchRecurrentData();
    fetchLateData();
});
