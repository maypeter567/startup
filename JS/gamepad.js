class Player {

    role_revealed;
    alive;
    player_role;
    hider;
    first;
    email;
    password;

    constructor(conRole = "civilian") {
        this.role_revealed = false;
        this.alive = true;
        this.player_role = conRole;
        this.hider = "Click to reveal your role"
        this.first = true;
        this.email = localStorage.getItem("user_login");
        this.password = localStorage.getItem("user_password");
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
    }

}

const the_player = new Player();

if (the_player.first) {
    the_player.update_info();
    the_player.first = false;
}