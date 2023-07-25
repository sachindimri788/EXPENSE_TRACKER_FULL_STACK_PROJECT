let id = "";
const form = document.getElementById('myForm');
form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const expenseAmount = document.getElementById('expenseAmount').value;
  const description = document.getElementById('description').value;
  const category = document.getElementById('category').value;
  const obj = {
    expenseAmount,
    description,
    category
  };
  if (id === '') {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/expense', obj, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('User verified');
      await displayData();
      form.reset();

    } catch (error) {
      if (error.response && error.response.status === 403) {
        window.location.href = '../loginRegister/loginRegister.html';
      } else {
        console.log(error);
      }
    }
  } else {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:4000/expense/${id}`, obj, {
        headers: { Authorization: `Bearer ${token}` }
      });
      await displayData();
      form.reset();
    } catch (error) {
      if (error.response && error.response.status === 403) {
        window.location.href = '../loginRegister/loginRegister.html';
      } else {
        console.log(error);
      }
    }
    id = '';
  }
});

async function displayData() {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:4000/expense', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const tbody = document.getElementById('tbodyId');
    tbody.innerHTML = '';
    const data = response.data;

    if (data != null) {
      for (let i = 0; i < data.length; i++) {
        const newRow = document.createElement('tr');
        //////// DATE //////////
        const dateObject = new Date(data[i].createdAt);
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month.
        const day = dateObject.getDate();
        const formattedDate = `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
        //////// DATE //////////
        newRow.innerHTML = `
          <td>${formattedDate}</td>
          <td>${data[i].category}</td>
          <td>${data[i].description}</td>
          <td>${data[i].expenseAmount}</td>
          <td>
            <button class="editDelete btn btn-danger" onclick="deleteData('${data[i].id}')">Delete</button>
            <button class="editDelete btn btn-secondary" onclick="editData('${data[i].id}')">Edit</button>
          </td>
        `;
        tbody.appendChild(newRow);
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '../loginRegister/loginRegister.html';
    } else {
      console.log(error);
    }

  }
}

async function deleteData(id) {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:4000/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    await displayData();
  } catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '../loginRegister/loginRegister.html';
    } else {
      console.log(error);
    }
  }
}

async function editData(editId) {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:4000/expense', {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = response.data;
    if (data !== null) {
      const expense = await data.find((item) => item.id === Number(editId));
      if (expense) {
        document.getElementById('description').value = expense.description;
        document.getElementById('expenseAmount').value = expense.expenseAmount;
        document.getElementById('category').value = expense.category;
        id = expense.id;
      }
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '../loginRegister/loginRegister.html';
    } else {
      console.log(error);
    }
  }
}





//-----------------------buyPremiumBtn--------------------//

const buyPremiumBtn = document.getElementById('buyPremiumBtn');

async function handlePremiumPurchase() {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:4000/user/purchasePremium', {
      headers: { Authorization: `Bearer ${token}` }
    });
    var options = {
      key: res.data.key_id, // Enter the Key ID generated from the Dashboard
      order_id: res.data.orderid, // For one-time payment
      handler: async function (response) { // This handler function will handle the success payment
        try {
          const resp = await axios.post("http://localhost:4000/user/updateTransactionStatus",
            {
              order_id: options.order_id,
              payment_id: response.razorpay_payment_id,
            },
            { headers: { Authorization: `Bearer ${token}` } }
          );
          if (resp.data.success) {
            alert("Welcome to our Premium Membership");
            isPremiumUser();
          } else {
            alert("Payment failed. Please try again.");
          }
        } catch (error) {
          alert("Payment failed. Please try again.");
        }
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.open();
  } catch (error) {
    console.log(error);
    alert("Try Again");
  }
}

buyPremiumBtn.addEventListener('click', handlePremiumPurchase);
//-----------------------End---buyPremiumBtn--------------------//

//------------------------isPremiumUser------------------------//
async function isPremiumUser() {
  const token = localStorage.getItem("token");
  const res = await axios.get("http://localhost:4000/user/isPremiumUser", {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (res.data.isPremiumUser) {
    buyPremiumBtn.removeEventListener('click', handlePremiumPurchase);
    buyPremiumBtn.innerHTML = "Premium Member &#128081";
    reportsLink.removeAttribute("onclick");
    leaderboardLink.removeAttribute("onclick");
    leaderboardLink.setAttribute("href", "../leaderboard/leaderboard.html");
    reportsLink.setAttribute("href", "../leaderboard/leaderboard.html");
  } else {
    buyPremiumBtn.addEventListener('click', handlePremiumPurchase);
  }
}

//------------------------End--isPremiumUser------------------------//


//-----------------------logout--------------------//
const logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  logout();
});
function logout() {
  window.location.href = '../loginRegister/loginRegister.html';
}
//-----------------------logout--------------------//

isPremiumUser();
displayData();
