const form = document.querySelector(".expense-card-form");

// console.log(form);

// Add Expenses
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = document.querySelector(".amount").value;
  const description = document.querySelector(".description").value;
  const category = document.getElementById("category").value;
  //   console.log(amount.value, description.value, category.value);
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
      { Headers: { Authorization: token } }
    );
    console.log(res);
  }
});

// Get All Expenses
window.addEventListener("DOMContentLoaded", async () => {
  let allExpense = await axios.get("http://localhost:3000/addExpense");
  console.log(allExpense);
});

// Delete an Expense
function deleteExpense(id) {
  console.log(id);
}
