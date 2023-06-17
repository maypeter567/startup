const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const scoreCollection = db.collection('scores');

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
    const query = { player: player, time: time};
    const cursor = scoreCollection.insertOne(query);
    return 
}

// send votes
async function allHistory() {
    const options = {
        sort: { score: -1 },
        limit : 10,
      };
    let query = { player : { $ne : '!' } };
    const votes = scoreCollection.find(query, options);
    return votes.toArray();
}

module.exports = { vote, allHistory }