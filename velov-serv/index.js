const express = require("express");
const db = require("./db");
const cors = require("cors");

const { Station } = require("./models/station");

// ------------
// Init app and login db
// ------------
const app = express();

db.connect(app);

// ------------
// Functions
// ------------

async function fetchStationList(url) {
  const stationListData = await fetch(url).then(res => res.json()).then(res => res.data).catch(err => console.error(err));
  return stationListData.stations;
}

async function fillDbWithData() {
  const stationListData = await fetchStationList('https://transport.data.gouv.fr/gbfs/lyon/station_information.json');
  stationListData.map(async (station) => {
    const stationId = station.station_id;
    const options = { new: true };
    const existingStation = await Station.findOne({station_id: stationId })

    if (existingStation) {
      return await Station.findByIdAndUpdate(
        existingStation['_id'], station, options
      );
    }
    else {
      const newStation = new Station(station);
      newStation.save();
      return newStation;
    }
  })
}

function updateDataWeekly() {
  setInterval(async () => {
    await fillDbWithData();
  }, 604800000);
}

async function formatStationWithAvailability() {
  const listWithDetails = []
  const stationList = await Station.find();
  const stationListDetails = await fetchStationList('https://transport.data.gouv.fr/gbfs/lyon/station_status.json');

  await stationList.map((station) => {
    stationListDetails.map((details) => {
      if(station.station_id === details.station_id) {
        const newStation = {
          station_id: station.station_id,
          address: station.address,
          capacity: station.capacity,
          lat: station.lat,
          lon: station.lon,
          name: station.name,
          bikes_available: details.num_bikes_available,
          docks_available: details.num_docks_available,
          is_renting: details.is_renting,
        }
        listWithDetails.push(newStation)
      }
    })
  })

  return listWithDetails;
}

// ------------
// Run Server
// ------------
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200,
    methods: "GET, PUT, PATCH, POST, DELETE",
  })
);

app.listen(3000, () => {
  console.log("Velo'v server is runing on port: 3000");
  fillDbWithData().then(() => {
    console.info("Stations infos updated");
  })
  updateDataWeekly();
});

// ------------
// Routes
// ------------
app.get("/", async (_, res) => {
  try {
    const stations = await formatStationWithAvailability();

    console.info("GET / => return all stations")
    return res.status(200).send(stations);
  }
  catch (err) {
    console.error(err);
    return res.status(err.status).send(err);
  }
});
