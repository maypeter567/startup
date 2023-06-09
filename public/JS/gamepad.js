class Player {

    role_revealed;
    alive;
    player_role;
    hider;
    email;
    password;
    day;

    constructor(conRole = "civilian") {
        this.role_revealed = false;
        this.alive = true;
        this.player_role = conRole;
        this.hider = "Click to reveal your role"
        this.email = localStorage.getItem("user_login");
        this.password = localStorage.getItem("user_password");
        this.day = true;
        if (localStorage.getItem("role") == null) {
            localStorage.setItem("role", this.player_role);
            this.first = false;
        } else {
            this.player_role = localStorage.role;
        }
    }

    // simple interactable button to remind you what your role is.
    reveal_role() {
        if (this.role_revealed === false) {
            this.role_revealed = true;
            const obj = document.querySelector("#role_revealer");
            obj.textContent = this.player_role;
        } else {
            this.role_revealed = false;
            const obj = document.querySelector("#role_revealer");
            obj.textContent = this.hider;
        }
    }

    // makes sure the current class and email are displayed.
    update_info() {
        const first = document.querySelector("#player_email");
        first.textContent = this.email;
        if (this.player_role == "civilian") {
            const maf = document.getElementById("mafia");
            maf.disabled = true;
        } else {
            const civ = document.getElementById("vote");
            civ.disabled = true;
        }
    }

    // simulates a voting period.
    take_turn() {
        const civ = document.getElementById("vote");
        const maf = document.getElementById("mafia");
        if (this.day) {
            this.push_history(civ.selectedIndex);
            this.remember_choices(civ);
            this.display_history(civ, civ.selectedIndex);
            maf.remove(civ.selectedIndex);
            civ.remove(civ.selectedIndex);
            this.day = false;
            this.take_turn();
        } else {
            this.push_history(maf.selectedIndex);
            this.remember_choices(maf);
            this.display_history(maf, maf.selectedIndex);
            civ.remove(maf.selectedIndex);
            maf.remove(maf.selectedIndex);
            this.day = true;
        }
    }

    // NOTES FOR WHAT TO DO TOMORROW. make a for loop for making the selectors remember, and begin working on the logic for the other pages. impliment a history mechanic.

    // updates the dropdowns for the players so that dead players do not show up.
    update_history() {
        const civ = document.getElementById("vote");
        const maf = document.getElementById("mafia");
        if (localStorage.getItem("historyIndex") != null) {
            for (let i = 1; i <= localStorage.getItem("historyIndex"); i++) {
                this.display_history(civ, localStorage.getItem(`history${i}`));
                civ.remove(localStorage.getItem(`history${i}`));
                maf.remove(localStorage.getItem(`history${i}`));
            }
        }
    }

    // makes breadcrumbs of game history.
    remember_choices(choice) {
        if (localStorage.getItem("historyIndex") == null) {
            localStorage.setItem("history1", choice.selectedIndex);
            localStorage.setItem("historyIndex", 1);
        } else {
            let i = parseInt(localStorage.getItem("historyIndex")) + 1;
            localStorage.setItem(`history${i}`, choice.selectedIndex);
            localStorage.setItem("historyIndex", i);
        }
    }

    // similar to remember_choices, but for pulling from endpoints. it's designed to be used in a for loop when the local storage for historyIndex is deleted.
    update_choices(index) {
        if (localStorage.getItem("historyIndex") == null) {
            localStorage.setItem("history1", index);
            localStorage.setItem("historyIndex", 1);
        } else {
            let i = parseInt(localStorage.getItem("historyIndex")) + 1;
            localStorage.setItem(`history${i}`, index);
            localStorage.setItem("historyIndex", i);
        }
    }

    // puts any history into its relevant tab.
    display_history(selection, i) {
        const unordered = document.getElementById("unordered-list");

        const new_data = document.createElement("li");
        new_data.textContent = selection.options[i].value;
        new_data.setAttribute("class", "history-entry")

        unordered.prepend(new_data);

        if (localStorage.getItem("historyIndex") > 4) {
            let elements = document.querySelectorAll(".history-entry");
            elements[4].parentNode.removeChild(elements[4]);
        }
    }

    // calls to the server and retrieves player names.
    async get_players() {
        let players;
        try {
            let response = await fetch('/api/get_players');
            players = await response.json();
            localStorage.setItem('players', JSON.stringify(players));
        } catch {
            players = JSON.parse(localStorage.getItem('players'));
        }
        if (players) {
            const table_header = document.getElementById('player-table-th');
            let j = 1;
            for (const [i, player] of players.entries()) {
                let obj_td = document.createElement('td');
                obj_td.textContent = player;
                obj_td.setAttribute('id', 'player-table-td');
                table_header.appendChild(obj_td);
                if (j % 2 == 0) {
                    let obj_tr = document.createElement('tr');
                    obj_tr.setAttribute('id', 'player-table-tr');
                    table_header.appendChild(obj_tr);
                }
                j++;
            }
        }
    }

    // update the local choices history to match the server.
    async get_history() {
        let history;
        try {
            let response = await fetch('/api/get_history');
            history = await response.json();
            localStorage.setItem('historyArchive', JSON.stringify(history));
        } catch {
            history = localStorage.getItem('historyArchive');
        }
        if (history) {
            localStorage.removeItem('historyIndex');
            for (const [i, hist] of history.entries()) {
                this.update_choices(hist);
            }
            this.reset_players();
            this.update_history();
        }
    }

    // pushes history to the server.
    async push_history(selectedIndex) {
        // let content = JSON.parse(localStorage.getItem('historyArchive')).append(selectedIndex);
        try {
            const response = await fetch('/api/update_history', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify([selectedIndex]),
            });

            const test = await response.json();
            localStorage.setItem('historyArchive', JSON.stringify(test));
        } catch {
            let test = JSON.parse(localStorage.getItem('historyArchive')) + selectedIndex[0];
            localStorage.setItem('historyArchive', JSON.stringify(test));
        }
    }

    // async saveScore(score) {
    //     const userName = this.getPlayerName();
    //     const date = new Date().toLocaleDateString();
    //     const newScore = { name: userName, score: score, date: date };

    //     try {
    //         const response = await fetch('/api/score', {
    //             method: 'POST',
    //             headers: { 'content-type': 'application/json' },
    //             body: JSON.stringify(newScore),
    //         });

    //         // Store what the service gave us as the high scores
    //         const scores = await response.json();
    //         localStorage.setItem('scores', JSON.stringify(scores));
    //     } catch {
    //         // If there was an error then just track scores locally
    //         this.updateScoresLocal(newScore);
    //     }
    // }

    reset_players() {
        const list_of_players = JSON.parse(localStorage.getItem('players'));
        if (list_of_players) {
            const select1 = document.getElementById('vote');
            const select2 = document.getElementById('mafia');
            select1.innerHTML = '';
            select2.innerHTML = '';
            for (const [i, current_player] of list_of_players.entries()) {
                let obj_opt1 = document.createElement('option');
                let obj_opt2 = document.createElement('option');
                obj_opt1.textContent = current_player;
                obj_opt2.textContent = current_player;
                select1.appendChild(obj_opt1);
                select2.appendChild(obj_opt2);
            }
        }
    }

    random_quote() {
        fetch('https://api.quotable.io/random')
            .then((response) => response.json())
            .then((data) => {
                const table = document.querySelector('.header-table');
                const table_data = document.createElement('td');
                table_data.textContent = data.content;
                table.appendChild(table_data);
            })
    }

    // this funciton "resets" the game.
    async reset() {
        const temp = localStorage.getItem('user_login');
        localStorage.clear();
        localStorage.setItem('user_login', temp);
        let result;
        try {
            let response = await fetch('/api/reset');
            result = await response.json();
            result = JSON.stringify(result);
        } catch {
            result = true;
        }
        if (result) {
            location.reload();
        }
    }

    // this function retrieves the player history.
    async player_records() {
        const player_name = localStorage.getItem('user_login');
        let result;
        try {
            let response = await fetch('/api/playerRecords');
            result = await response.json();
        } catch {
            result = false;
        }
        if (result) {
            const player_wins = result.wins;
            const player_loses = result.loses;
            localStorage.setItem('player_wins', player_wins);
            localStorage.setItem('player_loses', player_loses);
            let obj = document.getElementById('player_history');
            obj.textContent = `Total Wins: ${player_wins}, Total Loses: ${player_loses}`;
        }
    }
}

const the_player = new Player();


the_player.update_info();
the_player.get_players();
the_player.get_history();
the_player.random_quote();