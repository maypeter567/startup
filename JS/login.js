function login() {
    const login = document.querySelector("#user_login");
    const password = document.querySelector("#user_password");
    localStorage.setItem("user_login", login.value);
    localStorage.setItem("user_password", password.value);
    window.location.href = "gamepad.html";
  }
 