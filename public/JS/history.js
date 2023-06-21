// recording history
async function show_history() {
    let history;
    try {
        let response = await fetch('/api/get_all_history');
        history = await response.json();
        localStorage.setItem('allHistory', JSON.stringify(history));
    } catch {
        history = localStorage.getItem('allHistory');
    }
    if (history) {
        const table_head = document.getElementById('allHistory');
        let new_obj;
        for (const [i, test] of history.entries()) {
            new_obj = document.createElement('li');
            new_obj.textContent = test.player;
            table_head.append(new_obj);
        }
    }
}

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

async function authorized() {
    const result = await fetch('/api/auth_check');
    if (result.status == 401) {
        return false;
    } else {
        return true;
    }
}

let role_revealed = false;
let player_role = localStorage.getItem('role');
let hider = 'Click to reveal your role'

if (authorized()) {
    const first = document.querySelector("#player_email");
    first.textContent = localStorage.getItem('user_login');
    show_history();
}