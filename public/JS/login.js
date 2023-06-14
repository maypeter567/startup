async function login() {
  const login = document.querySelector("#user_login");
  const password = document.querySelector("#user_password");
  localStorage.setItem("user_login", login.value);
  // localStorage.setItem("user_password", password.value);
  try {
    const response = await fetch('/api/add_player', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify([login.value]),
    });

    const test = await response.json();
  } catch {
    let fry = 'fried';
  }
  window.location.href = "/HTML/gamepad.html";
}

if (localStorage.getItem('user_login')) {
  window.location.href = "/HTML/gamepad.html";
}