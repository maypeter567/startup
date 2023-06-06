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
            this.remember_choices(civ);
            this.display_history(civ, civ.selectedIndex);
            maf.remove(civ.selectedIndex);
            civ.remove(civ.selectedIndex);
            this.day = false;
            this.take_turn();
        } else {
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
            players = localStorage.getItem('players');
        }
        if (players) {
            const table_header = document.getElementById('player-table-th');
            let j = 1;
            for (const [i, player] of players.entries()) {
                let obj_td = document.createElement('td');
                obj_td.textContent = player;
                obj_td.setAttribute('id', 'player-table-td');
                table_header.appendChild(obj_td);
                if (j%2 == 0) {
                    let obj_tr = document.createElement('tr');
                    obj_tr.setAttribute('id', 'player-table-tr');
                    table_header.appendChild(obj_tr);
                }
                j++;
            }
        }
    }

    async get_history() {

    }

    async push_history() {
        
    }
}

const the_player = new Player();


the_player.update_info();
the_player.update_history();
the_player.get_players();