# startup.

[notes](https://github.com/maypeter567/startup/blob/57e7fdd282f2ac4af5b21a15f91be685a823a0bd/notes.md)

## Elevator Pitch.

With the game Mafia as my inspiration, I will create a simple platform to automatically generate a murder mystery game that will process and record all decisions and interactions every turn. I have often found that Mafia, and its variations, can get very confusing for the narrator when there are more than 5 players. This site will remove the confusion that follows creating any game, increasing the potential player capacity beyond normal means. This change will allow any number of people to play together quickly, drastically decreasing the wait time between turns and increasing the fun of the game. additional benefits include more random role results, reliable game results, and customized loss or victory messages for the players.

## Photo's of Startup.

![Screen Shot 2023-05-09 at 9 25 49 PM](https://github.com/maypeter567/startup/assets/118032658/b71bdd93-01ae-41d6-b63f-d2feb5a8dbee)
![Screen Shot 2023-05-09 at 9 27 04 PM](https://github.com/maypeter567/startup/assets/118032658/29914306-1ce3-4073-aaa7-bf73a6b98bf8)
![Screen Shot 2023-05-09 at 9 27 39 PM](https://github.com/maypeter567/startup/assets/118032658/6957f302-f61f-4b9a-810b-c71b5974349b)
![Screen Shot 2023-05-09 at 9 28 13 PM](https://github.com/maypeter567/startup/assets/118032658/66f8a59d-81b1-4fd7-b8a3-c56785c8da10)

## Key Features.

- Secure login over https
- personal number of wins and losses
- all players playing the current game
- the ability to select, change, and lock in choices
- history of previous ingame decisions
- a button to reveal or hide your role

## Technology

- HTML: I will create two HTML sites, one for the login and one for the gameplay
- Links: the login page contains a link to the game page
- Text: all players that can be selected are represented with text windows
- Images: there will be a slightly opaque image displayed over the gameplay section when you die
- Login: Input box and submit button for login
- Database: recording the history of wins and loses for a player, and a temporary record of ingame events
- Websocket: The players list represents a live number of spectators and players, including spectators joining live. a live chat may be implimented.

## HTML Deliverable
I designed the framework for my application
- HTML pages: I created four sites. A login page, gameplay page, history page, and players page.
- Links: I implimented links to navigate to all of the sections of the website.
- Text: The history tab is represented with text
- Images: there is a single image in the gameplay page, which will be used to show if a player is dead. This image will be modified through other code on the application.
- Login: The login page handles the inputs with boxes and submission.
- Database: the history of the individual player's wins and losses is recorded in the database, history of the ongoing match is recorded temporarily. This is displayed on every page of the application except at login.
- Websocket: the players page will update with every new viewer, or when someone leaves the game.
- Select boxes: these are used to show the choices for players in the game on the gameplay page such as votes or mafia decisions.


## CSS Deliverable
I organized the css for my application
- Files: index, players, history, gamepad, header, and footer css files.
- Formatting: I removed underlines and other organization tools in the html, instead using css to optimize.
- Style Choices: I used a universal footer and header method for all pages.
- Picture: I implimented my picture behind the gamepad to represent when a user dies. currently is always displayed. had to change method of implication in html.
- Colour: I went for a darker theme for the murder mystery vibes.
- Sizing: the browser can be any size and the fonts and spacing will adapt for it.


## JS Deliverable
- Login: the login stores the email and password of the user in local storage, but will be used to share to the database later.
- Database: the database remembers all choices and interactions from the game, currently it is stored in local storage.
- Websocket: the websocket will be used to update the history of choices in the game, and the current viewers/players in the game.
- application logic: the server will handle interactions with the user to see if players are eliminated. currently this logic is not possible with only one player, so the game always concludes their votes.
- the other pages will contain similar JS as the gamepage, but a history is difficult to keep without the server storing it. these will be flushed out in the future.


## Service Deliverable
- Game History: the game now sends its history to the backend so it can be recorded and called upon.
- backend service endpoints: sends players in the game, and game history.
- Quote: used quote import methods.
- got it all done!

