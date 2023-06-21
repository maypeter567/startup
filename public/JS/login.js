async function login() {
  const player_login = document.querySelector("#user_login");
  const password = document.querySelector("#user_password");
  localStorage.setItem("user_login", player_login.value);
  // localStorage.setItem("user_password", password.value);

  // this try block sends the email of the user to see if it exists in the DB
  try {
    const response = await fetch('api/check_player', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify([player_login.value]),
    });
    const result = await response.json();

    // if the email does exist, the password will be checked against the recorded one.
    if (result) {
      try {
        const response = await fetch('/api/add_player', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ email: player_login.value, password: password.value }),
        });

        if (response.ok) {
          //record players role
          let role = await response.json();
          localStorage.setItem('role', role.role);
          // if the password matches, they will be logged in.
          window.location.href = "/HTML/gamepad.html";
        } else {
          // password incorrect
          alert(` password incorrect error 1, ${response.msg}`);
        }

      } catch {
        // failed to connect to DB
        alert('login error. code 3');
      }
    } else {
      alert('incorrect username or password error 2');
    }
  } catch {
    alert('could not connect to server');
  }
}

// create a new account
async function createLogin() {
  const player_login = document.querySelector("#user_login");
  const password = document.querySelector('#user_password');
  // send account creation request to the server.
  const response = await fetch('api/create_player', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email: player_login.value, password: password.value }),
  });
  const result = await response.json();
  if (result) {
    login();
  } else {
    alert(`there was an error logging in, ${result.body.msg}`);
  }
}

async function auth_check() {
  const result = await fetch('/api/auth_check');
  if (result.status == 401) {

  } else {
    window.location.href = "/HTML/gamepad.html";
  }
}

auth_check();