const form = document.getElementById("signup_form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //getting the input value

  let userName = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  console.log(userName, email, password);

  if (userName && email && password) {
    // console.log("response");
    let res = await axios.post("http://localhost:3000/signup", {
      userName,
      email,
      password,
    });

    console.log(res, "this is response from backend");
    if (res.status == 200) {
      window.location.href = "./login.html";
    } else if (res.status == 201) {
      alert("Email already exist, try forget password");
      window.location.href = "./signup.html";
    } else {
      alert("incorect credentials");
      window.location.href = "./signup.html";
    }
  } else if (userName == "") {
    alert("Name is not avail");
  } else if (email == "") {
    alert("Email is not avail");
  } else if (password == "") {
    alert("Kindly Fill the password");
  }
});
