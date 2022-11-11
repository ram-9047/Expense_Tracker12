const form = document.getElementById("form");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  //getting the input value

  let userName = document.getElementById("userName").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  // console.log(userName, email, password);

  if (userName && email && password) {
    let res = await axios.post("http://localhost:3000/signup", {
      userName,
      email,
      password,
    });

    console.log(res, "this is response from backend");
  } else if (userName == "") {
    alert("Name is not avail");
  } else if (email == "") {
    alert("Email is not avail");
  } else if (password == "") {
    alert("Kindly Fill the password");
  }

  //sending the post request to the server with user cred.

  console.log(res);
});
