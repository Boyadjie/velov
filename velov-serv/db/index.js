const mongoose = require("mongoose");

exports.connect = (app) => {
    // Specific options for the connection
    const options = {
        useNewUrlParser: true,
        autoIndex: false, // Don't build indexes
        maxPoolSize: 10, // Maintain up to 10 socket connections
    };

    const connectWithRetry = () => {
        mongoose.Promise = global.Promise;
        console.log("MongoDB connection with retry");

        // Connect to the db with the given url from the configuration adn the options defined before
        mongoose
            .connect("mongodb://127.0.0.1:27017/stations", options)
            .then(() => {
                console.log("MongoDB is connected");
                app.emit("ready"); // Emit an event ready when the api is connected to the db
            })
            .catch((err) => {
                console.log("MongoDB connection unsuccessful, retry after 2 seconds.", err);
                setTimeout(connectWithRetry, 2000); // retry to connect, if it fails, after 2 seconds
            });
    };
    connectWithRetry();
};
