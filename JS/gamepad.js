class Player {

    role_revealed;
    alive;
    player_role;
    hider;

    constructor(conRole="civilian") {
        this.role_revealed = false;
        this.alive = true;
        this.player_role = conRole;
        this.hider = "Click to reveal your role"
        if(localStorage.getItem("role") == null) {
            localStorage.setItem("role", this.player_role);
        } else {
            this.player_role = localStorage.role;
        }
    }


    reveal_role() {
        if(this.role_revealed === false) {
            this.role_revealed = true;
            const obj = document.querySelector("#role_revealer");
            obj.textContent = this.role;
        } else {
            this.role_revealed = false;
            const obj = document.querySelector("#role_revealer");
            obj.textContent = this.hider;
        }
    }

}

const the_player = new Player();