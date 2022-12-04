const form = document.querySelector(".expense-card-form");
// console.log(form)
const logOutBtn = document.querySelector(".footer").childNodes[1];
// console.log(logOutBtn);

let dailyReportBtn = document.querySelector(".expense-header-report");
dailyReportBtn.addEventListener("click", async () => {
  let token = localStorage.getItem("token");
  let res = await axios.get("http://localhost:3000/downloadExpense", {
    headers: {
      Authorization: token,
    },
  });
  // console.log(res, "response of daily report");
  if (res.status == 200) {
    window.location.href = res.data.fileURL;
  }
});

// Add Expenses
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = document.querySelector(".amount").value;
  const description = document.querySelector(".description").value;
  const category = document.getElementById("category").value;
  if (amount == "") {
    alert("Enter the amount");
  } else if (description == "") {
    alert("Enter the description");
  } else if (category == "") {
    alert("Select the category");
  } else {
    let resultObject = {
      amount,
      description,
      category,
    };
    amount.value = "";
    description.value = "";
    category.value = "";
    let token = localStorage.getItem("token");
    console.log(token);
    let res = await axios.post(
      "http://localhost:3000/addExpense",
      resultObject,
      { headers: { Authorization: token } }
    );
    console.log(res);
  }
});

// window.addEventListener("DOMContentLoaded", onLoadFunction);
// // Get All Expenses

const onLoadFunction = async () => {
  let token = localStorage.getItem("token");
  // console.log(token);
  let isPremium = await axios.get("http://localhost:3000/checkStatus", {
    headers: { Authorization: token },
  });

  if (isPremium.data.status) {
    changeTheme();
    premiumFeature();
    dailyReportBtn.style.display = "inline";
  }
  let allExpense = await axios.get("http://localhost:3000/getAllExpense", {
    headers: { Authorization: token },
  });
  let htmlDiv = document.querySelector(".expense-items-card");
  // htmlDiv.innerHTML = "";
  if (allExpense.status == 200) {
    // console.log(allExpense.data.result, "all expense");
    let expenseArr = allExpense.data.result;
    expenseArr.forEach((item) => {
      // console.log(item);
      let id = item.id;
      let amount = item.amount;
      let description = item.description;
      let category = item.category;

      let idSpan = document.createElement("span");
      idSpan.innerText = id;

      let h2Amount = document.createElement("h2");
      let spanAmount = document.createElement("span");
      h2Amount.innerText = "Amount - ";
      spanAmount.innerText = amount;
      h2Amount.appendChild(spanAmount);

      let divCategory = document.createElement("div");
      let spanCategory = document.createElement("span");
      divCategory.innerText = "Category  - ";
      spanCategory.innerText = category;
      divCategory.appendChild(spanCategory);

      let divDescription = document.createElement("div");
      let spanDescription = document.createElement("span");
      divDescription.innerText = "Description - ";
      spanDescription.innerText = description;
      divDescription.appendChild(spanDescription);

      let parentDiv = document.createElement("div");
      parentDiv.classList = "expense-items-card-items";
      parentDiv.appendChild(h2Amount);
      parentDiv.appendChild(divCategory);
      parentDiv.appendChild(divDescription);

      htmlDiv.appendChild(parentDiv);
    });
  } else {
    alert("Error in Loading");
  }
};

window.addEventListener("DOMContentLoaded", onLoadFunction);

// Delete an Expense
function deleteExpense(id) {
  console.log(id);
}

// Buy premium member
let premiumBtn = document.querySelector(".expense-header").children[0];
// console.log(dailyReportBtn);
premiumBtn.addEventListener("click", async (e) => {
  alert("premium member");
  let token = localStorage.getItem("token");
  const response = await axios.get("http://localhost:3000/premium", {
    headers: { Authorization: token },
  });
  console.log(response);
  var options = {
    key: response.data.key_id, // Enter the Key ID generated from the Dashboard
    name: "Test Company",
    order_id: response.data.order.id, // For one time payment
    prefill: {
      name: "Test User",
      email: "test.user@example.com",
      contact: "7003442036",
    },
    theme: {
      color: "#3399cc",
    },
    // This handler function will handle the success payment
    handler: function (response) {
      console.log(response);
      axios
        .post(
          "http://localhost:3000/updateStatus",
          {
            order_id: options.order_id,
            payment_id: response.razorpay_payment_id,
          },
          { headers: { Authorization: token } }
        )
        .then(() => {
          alert("You are a Premium User Now");
          changeTheme();
          onLoadFunction();
        })
        .catch(() => {
          alert("Something went wrong. Try Again!!!");
        });
    },
  };
  const rzp1 = new Razorpay(options);
  rzp1.open();
  e.preventDefault();

  rzp1.on("payment.failed", function (response) {
    console.log(response.error);
    alert(response.error.code);
    alert(response.error.description);
    alert(response.error.source);
    alert(response.error.step);
    alert(response.error.reason);
    alert(response.error.metadata.order_id);
    alert(response.error.metadata.payment_id);
  });
});

function changeTheme() {
  let expBody = document.querySelector(".expense-body");
  expBody.classList.add("premiumTheme");
  premiumBtn.classList.add("hidden");
  console.log("change theme");
}

logOutBtn.addEventListener("click", () => {
  console.log("log out");
  localStorage.clear();
  window.location.href = "./login.html";
});

async function premiumFeature() {
  let token = localStorage.getItem("token");
  let allUser = await axios.get("http://localhost:3000/allUser", {
    headers: { Authorization: token },
  });

  const ul = document.querySelector(".user-list-ul");
  ul.innerHTML = "";
  allUser.data.responseArray.forEach((item) => {
    // console.log(item.id);
    let li = document.createElement("li");
    li.innerText = item.name;
    let spanID = document.createElement("span");
    spanID.innerText = item.id;

    spanID.setAttribute("id", `${item.id}`);

    li.appendChild(spanID);
    ul.append(li);

    li.addEventListener("click", () => {
      let id = document.getElementById(`${item.id}`);
      // console.log(id, "this is the id of user");

      //function to call another user expenses using their userID stored in attribute "id"
      premiumUserExpense(id);
    });
  });
}

async function premiumUserExpense(id) {
  console.log(id.innerText);
  let userID = id.innerText;
  const url = `http://localhost:3000/user/${userID}`;
  let token = localStorage.getItem("token");
  let response = await axios.get(url, { headers: { Authorization: token } });
  console.log(response);
  let userCard = document.getElementById("expense-anotherUser-card");
  userCard.style.visibility = "visible";

  let body = document.querySelector(".main-body");
  body.style.opacity = "0.4";

  let closeBtn = document.querySelector(".close-card-btn");
  closeBtn.addEventListener("click", () => {
    userCard.style.visibility = "hidden";
    body.style.opacity = "1";
  });

  let htmlDiv = document.querySelector(".list");
  response.data.result.forEach((item) => {
    // console.log(item);
    // let id = item.id;
    let amount = item.amount;
    let description = item.description;
    let category = item.category;

    let h2Amount = document.createElement("h2");
    let spanAmount = document.createElement("span");
    h2Amount.innerText = "Amount - ";
    spanAmount.innerText = amount;
    h2Amount.appendChild(spanAmount);

    let divCategory = document.createElement("div");
    let spanCategory = document.createElement("span");
    divCategory.innerText = "Category  - ";
    spanCategory.innerText = category;
    divCategory.appendChild(spanCategory);

    let divDescription = document.createElement("div");
    let spanDescription = document.createElement("span");
    divDescription.innerText = "Description - ";
    spanDescription.innerText = description;
    divDescription.appendChild(spanDescription);

    let parentDiv = document.createElement("div");
    parentDiv.classList = "expense-items-card-items-premium";
    parentDiv.appendChild(h2Amount);
    parentDiv.appendChild(divCategory);
    parentDiv.appendChild(divDescription);

    htmlDiv.appendChild(parentDiv);
  });
}
