const form = document.getElementById("login-form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  //getting the input value of login form

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // console.log(email, password);
  if (email && password) {
    try {
      let res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      // console.log(res, "response form backend");
      if (res.status == 200) {
        console.log("200");
        window.location.href = "./expense.html";
      }
    } catch (error) {
      if (error.response.status == 401) {
        alert("Wrong Password");
      } else {
        alert("User Not Found");
      }
      window.location.href = "./login.html";
    }
  }
});
