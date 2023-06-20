function reveal_role() {
    if (role_revealed === false) {
        role_revealed = true;
        const obj = document.querySelector("#role_revealer");
        obj.textContent = player_role;
    } else {
        role_revealed = false;
        const obj = document.querySelector("#role_revealer");
        obj.textContent = hider;
    }
}

async function get_players() {
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
            let obj_tr = document.createElement('tr');
            obj_tr.setAttribute('id', 'player-table-tr');
            table_header.appendChild(obj_tr);
            j++;
        }
    }
}

let role_revealed = false;
let player_role = localStorage.getItem('role');
let hider = 'Click to reveal your role';

get_players();