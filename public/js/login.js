//form async preventDefault function that gets values from login
//if statement to check for email and password then sends post request to api
const formHandlerLogin = async (e) => {
  // e.preventDefault();
  const pwd = document.getElementById("loginPwd").value.trim();
  const email = document.getElementById("loginEmailId").value.trim();
  // const personName = document.getElementById('personName').value.trim();
  console.log("is it working?");
  if (email && pwd) {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({ email, pwd }),
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
  const pwd = document.getElementById("loginPwd").value.trim();
  const email = document.getElementById("loginEmailId").value.trim();
  const userName = document.getElementById("user_Name").value.trim();
  if (email && pwd && personName) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ email, pwd, userName }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector("#signForm").addEventListener("click", formHandlerLogin);
// document.querySelector('#signUp').addEventListener('submit', this.formHandlersignup);
