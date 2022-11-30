const form1 = document.getElementById("login-form");
const resetBtn = document.querySelector(".reset-password-btn");
// let userId;

form1.addEventListener("submit", async (e) => {
  e.preventDefault();
  //getting the input value of login form

  let email = document.getElementById("email").value;

  if (email) {
    try {
      let res = await axios.post("http://localhost:3000/forgotPassword", {
        email,
      });
      console.log(res);
      //   console.log(res.data.id, "userid");
      // userId = res.data.id;
      if (res.status == 200) {
        alert("User Found");
        alert("Check your mail");

        // window.location.href = "./login.html";
        // let passwordBox = document.querySelector(".reset-password");
        // passwordBox.style.display = "inline";
        // let submitBtn = document.querySelector(".submit-btn");
        // submitBtn.style.display = "none";

        // resetBtn.style.display = "inline";
      }
    } catch (error) {
      // if (error) {
      // alert("Try Again");
      // } else {
      console.log(error);
      alert("User Not Found");
      // }
      window.location.href = "./forgotPassword.html";
    }
  }
});

// resetBtn.addEventListener("click", async () => {
//   console.log("btn clicked");

//   let newPassword = document.getElementById("password").value;
//   console.log(newPassword);

//   let email = document.getElementById("email").value;
//   let res = await axios.post("http://localhost:3000/resetPassword", {
//     userId,
//     email,
//     newPassword,
//   });
//   if (res.status == 200) {
//     window.location.href = "./login.html";
//   }
// });
