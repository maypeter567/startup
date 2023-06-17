const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');

// The service port. In production the frontend code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

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

// not secure router stuff


// secure router stuff

//get players
apiRouter.get('/get_players', (_req, res) => {
  res.send(players);
});

//add player
apiRouter.post('/add_player', (req, res) => {
  players.push(req.body[0]);
  res.send(players);
});

// check if player account exists
apiRouter.post('/check_player', async (req, res) => {
  const result = await DB.get_player_name(req.body[0]);
  if (result) {
    res.send(true);
  } else {
    res.send(false);
  }
});

// higher security router
var secureApiRounter = express.Router();
apiRouter.use(secureApiRounter);

//get history
secureApiRouter.get('/get_history', (_req, res) => {
  res.send(Desktop_history)
});

// vote
secureApiRouter.post('/vote', (req, res) => {
  DB.vote(req.body);
  res.send(true);
})

// return vote history
secureApiRouter.get('/get_votes', (_req, res) => {
  res.send(DB.get_votes());
})

//reset trigger
apiRouter.get('/reset', (_req, res) => {
  reset();
  res.send(true);
});

// record history
secureApiRouter.post('/update_history', (req, res) => {
  Desktop_history.push(req.body[0]);
  res.send(Desktop_history);
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
  res.sendFile('index.html', { root: 'public' });
});

// Return player match history from DB
secureApiRouter.get('/playerRecords', async (req, res) => {
  const player_records = await DB.playerRecords();
  res.send(player_records);
})

// Return all history
secureApiRouter.get('/get_all_History', async (req, res) => {
  const history = await DB.allHistory();
  res.send(history);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


const debug = true;
let Desktop_history = [];
let mongo_history = [];
let players = [];

if (debug) {
  players = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7', 'player8', 'player9', 'player10'];
} else {
  players = [];
}

// function remove_player(playerIndex) {

// }

function new_player(player_name) {
  players.push(player_name);
}

// function end_game(player_name, result) {

// }

// function update_history_internal() {

// }

// this removes any data saved in the server so that the game does not get stuck.
function reset() {
  Desktop_history = [];
}

