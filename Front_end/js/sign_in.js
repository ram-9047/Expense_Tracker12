const form1 = document.getElementById("login-form");

form1.addEventListener("submit", async (e) => {
  e.preventDefault();
  //getting the input value of login form

  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  if (email && password) {
    try {
      let res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      // console.log(res.data.user[0].isPremium, "response form backend");
      if (res.status == 200) {
        // console.log("200");
        let token = res.data.token;
        console.log(token);
        localStorage.setItem("token", `${token}`);
        // if (res.data.user[0].isPremium == true) {
        //   alert("User is premium");
        // }
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
