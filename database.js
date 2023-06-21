const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const scoreCollection = db.collection('scores');
const playerCollection = db.collection('player');

(async function testConnection() {
    await client.connect();
    await db.command({ ping: 1 });
})().catch((ex) => {
    console.log(`Unable to connect to database with ${url} because ${ex.message}`);
    process.exit(1);
});

// record a vote
async function vote(player_email) {
    let player = player_email;
    let currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    const query = { player: player, time: time };
    const cursor = scoreCollection.insertOne(query);
    return
}

// send votes
async function allHistory() {
    const options = {
        sort: { _id: -1 },
        limit: 10,
    };
    let query = { player: { $ne: '!' } };
    const votes = scoreCollection.find(query, options);
    return votes.toArray();
}

//check database for an existing player
async function get_player_name(player) {
    let query = { player: player };
    return playerCollection.findOne(query);
}

// check for user using token
async function getPlayerByToken(token) {
    return playerCollection.findOne({ token: token });
}

// create new user
async function create_player(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const player = {
        player: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await playerCollection.insertOne(player);

    return player;
}

module.exports = {
    vote,
    allHistory,
    get_player_name,
    create_player,
    getPlayerByToken,
};