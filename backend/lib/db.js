const mongoose = require('mongoose');

let connected = false;
async function connectDB(uri) {
    if (connected) return;
    await mongoose.connect(uri, {autoIndex: true});
    connected = true;
    console.log("[db] connected");

}

module.exports = {connectDB};