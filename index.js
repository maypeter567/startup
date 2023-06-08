const express = require('express');
const app = express();

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Serve up the frontend static content hosting
app.use(express.static('public'));

// Router for service endpoints
const apiRouter = express.Router();
app.use(`/api`, apiRouter);

// // GetScores
// apiRouter.get('/scores', (_req, res) => {
//   res.send(scores);
// });

// // SubmitScore
// apiRouter.post('/score', (req, res) => {
//   scores = updateScores(req.body, scores);
//   res.send(scores);
// });

//get players
apiRouter.get('/get_players', (_req, res) => {
  res.send(players);
});

//get history
apiRouter.get('/get_history', (_req, res) => {
  res.send(history)
});

//reset trigger
apiRouter.get('/reset', (_req, res) => {
  reset();
  res.send(true);
});

// record history
apiRouter.post('/update_history', (req, res) => {
  history.push(req.body[0]);
  res.send(history);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


const debug = true;
let history = [];
let players = [];

if (debug) {
  players = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7', 'player8', 'player9', 'player10'];
} else {
  players = [];
}

function remove_player(playerIndex) {

}

function new_player(player_name) {

}

function end_game(player_name, result) {

}

function update_history_internal() {

}

// this removes any data saved in the server so that the game does not get stuck.
function reset() {
  history = [];
}

const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('rental');

(async function testConnection() {
  await client.connect();
  await db.command({ ping: 1 });
})().catch((ex) => {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
});