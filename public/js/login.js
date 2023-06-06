// form async preventDefault function that gets values from login
// if statement to check for email and password then sends post request to api
const formHandlerLogin = async (e) => {
  // e.preventDefault();
  const password = document.getElementById("loginPwd").value.trim();
  const email = document.getElementById("loginEmailId").value.trim();
  if (email && password) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password}),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};


const formHandlersignup = async (e) => {
  e.preventDefault();
  const password = document.getElementById("signupPwd").value.trim();
  const email = document.getElementById("signupEmailId").value.trim();
  const userName = document.getElementById("user_Name").value.trim();
  if (email && password && userName) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email: email, password: password, name: userName }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      response.json().then(function(errors){
          let errorMessages = [];
          errors.errors.forEach(error => errorMessages.push(error.message));

          document.getElementById('signup-errors').innerHTML = errorMessages.join('<br>')
      });
    }
  }
};

document.querySelector("#signForm").addEventListener("click", formHandlerLogin);
document.querySelector('#signUp').addEventListener('submit', formHandlersignup);
