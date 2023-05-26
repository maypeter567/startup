function login() {
    const user_login = document.querySelector("#user_login");
    const user_password = document.querySelector("#user_password");
    localStorage.setItem("user_login", user_login.value);
    localStorage.setItem("user_password", user_password.value);
    window.location.href = "play.html";
  }
 