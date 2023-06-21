const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const express = require('express');
const app = express();
const DB = require('./database.js');
const { socketSetup } = require('./socketSetup.js');

const authCookieName = 'token';

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

//add player, and log in player
apiRouter.post('/add_player', async (req, res) => {
  const player = await DB.get_player_name(req.body.email);
  if (player) {
    if (await bcrypt.compare(req.body.password, player.password)) {
      createCookie(res, player.token);
    }
    players.push(req.body.email);
    let role = { role: determineRole(req.body.email) };
    res.send(role);
  } else {
    res.status(401).send({ msg: 'unauthorized' });
  }
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

// create an account
apiRouter.post('/create_player', async (req, res) => {
  if (await DB.get_player_name(req.body.email)) {
    res.status(409).send({ msg: 'existing user' });
  } else {
    const player = await DB.create_player(req.body.email, req.body.password);

    // set cookie
    createCookie(res, player.token);

    res.send({
      id: player._id,
    })
  }
});

// Delete cookie, logout, and remove player name from list.
apiRouter.delete('/logout', async (req, res) => {
  player_token = req.cookies[authCookieName];
  res.clearCookie(authCookieName);
  res.status(204).end();
  player_profile = await DB.getPlayerByToken(player_token);
  player_name = player_profile.player
  let temp = [];
  if (mafPlayers.includes(player_name)) {
    needMaf++;
    for (let i = 0; i < mafPlayers.length; i++) {
      if (mafPlayers[i] == player_name) {
        1 + 1;
      } else {
        temp.push(mafPlayers[i]);
      }
    }
    mafPlayers = temp;
    temp = [];
  } else {
    for (let i = 0; i < civPlayers.length; i++) {
      if (civPlayers[i] == player_name) {
        1 + 1;
      } else {
        temp.push(civPlayers[i]);
      }
    }
    civPlayers = temp;
    temp = [];
  }
  for (let i = 0; i < players.length; i++) {
    if (players[i] == player_name) {
      1 + 1;
    } else {
      temp.push(players[i]);
    }
  }
  players = temp;
})

// higher security router
var secureApiRouter = express.Router();
apiRouter.use(secureApiRouter);

secureApiRouter.use(async (req, res, next) => {
  authToken = req.cookies[authCookieName];
  const player = await DB.getPlayerByToken(authToken);
  if (player) {
    next();
  } else {
    res.status(401).send({ msg: 'unauthorized' });
  }
});

//get history
secureApiRouter.get('/get_history', (_req, res) => {
  res.send(Desktop_history)
});

// send authorized
secureApiRouter.get('/auth_check', (_req, res) => {
  res.status(200).send(true);
})

// vote for single player testing
// secureApiRouter.post('/vote', (req, res) => {
//   DB.vote(req.body);
//   res.send(true);
// })

//civ votes
secureApiRouter.post('/vote', (req, res) => {
  votes.push(req.body[0]);
  if (canVote()) {
    res.status(202).send(processVotes());
  } else {
    res.status(200).send(true);
  }
})

//mafia votes
secureApiRouter.post('/mafVote', (req, res) => {
  mafVotes.push(req.body[0]);
  if (canVote()) {
    res.status(202).send(processVotes());
  } else {
    res.status(200).send(true);
  }
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

const httpService = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


const debug = false;
let Desktop_history = [];
// let mongo_history = [];
let players = [];
let civPlayers = [];
let mafPlayers = [];

if (debug) {
  players = ['player1', 'player2', 'player3', 'player4', 'player5', 'player6', 'player7', 'player8', 'player9', 'player10'];
} else {
  players = [];
}

function createCookie(res, token) {
  res.cookie(authCookieName, token, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
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
  players = [];
}



let votes = [];
let mafVotes = [];
let needMaf = 0;

function determineRole(player) {
  let role;
  if (needMaf > 0) {
    mafPlayers.push(player);
    role = 'mafia';
  } else if (players % 4 == 0) {
    mafPlayers.push(player);
    role = 'mafia';
  } else {
    civPlayers.push(player);
    role = 'civilian';
  }
  return role;
}

function civDecisionMaker() {
  if (votes.length === players.length) {
    let player;
    let count;
    for (player in players) {
      for (let i = 0; i < players.length; i++) {
        if (votes[i] === player) {
          count += 1;
        }
      }
      if (count > player.length / 2) {
        return voteOut(player);
      }
    }
    return -1;
  }
}

function mafDecisionMaker() {
  if (mafVotes === mafPlayers.length) {
    let maf = false;
    count = 0;
    for (player in players) {
      for (let i = 0; i < players.length; i++) {
        if (mafVotes[i] === player) {
          count += 1;
        }
      }
      if (count > mafPlayers.length / 2) {
        return mafOut(player);
        maf = true;
      }
    }
    count = 0;
    if (!maf) {
      for (player in players) {
        for (let i = 0; i < players.length; i++) {
          if (mafVotes[i] === player) {
            count += 1;
          }
        }
        if (count > 0) {
          return mafOut(player);
        }
      }
    }
  }
}

function canVote() {
  if (votes.length === players.length && mafVotes.length === mafPlayers.length) {
    return true;
  } else {
    return false;
  }
}

function processVotes() {
  return [civDecisionMaker(), mafDecisionMaker()];
}

function mafOut(player) {
  for (let i = 0; i < players.length; i++) {
    if (players[i] === player) {
      return i;
    }
  }
  return -1;
}

function voteOut(player) {
  for (let i = 0; i < players.length; i++) {
    if (players[i] === player) {
      return i;
    }
  }
  return -1;
}


socketSetup(httpService);