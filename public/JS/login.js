async function login() {
  const login = document.querySelector("#user_login");
  const password = document.querySelector("#user_password");
  localStorage.setItem("user_login", login.value);
  // localStorage.setItem("user_password", password.value);

  // this try block sends the email of the user to see if it exists in the DB
  try {
    const response = await fetch('api/check_player', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify([login.value]),
    });
    const result = await response.json();

    // if the email does exist, the password will be checked against the recorded one.
    if (result) {
      try {
        const response = await fetch('/api/add_player', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify([login.value, password.value]),
        });

        const test = await response.json();

        // if the password matches, they will be logged in.
        if (test) {
          window.location.href = "/HTML/gamepad.html";
        } else {
          // password incorrect
          alert('error 1');
        }

      } catch {
        // failed to connect to DB
        alert('error 3');
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

function authenticated_check() {

}

if (authenticated_check()) {
  window.location.href = "/HTML/gamepad.html";
}