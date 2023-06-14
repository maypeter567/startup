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

async function vote(player_email) {
    let player = player_email;
    let currentDate = new Date();
    let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
    const query = { player: player, time: time};
    const cursor = scoreCollection.insertOne(query);
    return 
}

async function return_votes() {
    const options = {
        sort: { score: -1 },
        limit: 10,
      };
    let query;
    const votes = scoreCollection.find(query, options);
}

module.exports = { vote, return_votes }