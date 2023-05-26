class Player {

    role_revealed;
    alive;
    player_role;
    hider;
    first;
    email;
    password;
    day;

    constructor(conRole = "civilian") {
        this.role_revealed = false;
        this.alive = true;
        this.player_role = conRole;
        this.hider = "Click to reveal your role"
        this.first = true;
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

    take_turn() {
        const civ = document.getElementById("vote");
        const maf = document.getElementById("mafia");
        if (this.day) {
            civ.remove(civ.selectedIndex);
            maf.remove(civ.selectedIndex);
            this.day = false;
            this.take_turn();
        } else {
            maf.remove(maf.selectedIndex);
            civ.remove(maf.selectedIndex);
            this.day = true;
        }
    }

    // NOTES FOR WHAT TO DO TOMORROW. make a for loop for making the selectors remember, and begin working on the logic for the other pages. impliment a history mechanic.

    update_history() {

    }

}

const the_player = new Player();

if (the_player.first) {
    the_player.update_info();
    the_player.first = false;
}