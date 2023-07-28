let id = "";
let page = 1;

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
      await paginationBtn(page);
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
      await paginationBtn(page);
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
    const res = await axios.get('http://localhost:4000/expense', {
      params: { page: 1 },
      headers: { Authorization: `Bearer ${token}` }
    });
    const tbody = document.getElementById('tbodyId');
    tbody.innerHTML = '';
    const data = res.data.expenses;

    if (data != null) {
      for (let i = 0; i < data.length; i++) {
        const newRow = document.createElement('tr');
        //////// DATE //////////
        const dateObject = new Date(data[i].createdAt);
        const formattedDate = dateObject.toISOString().slice(0, 10).replace(/-/g, '/');
        //////// DATE //////////
        newRow.innerHTML = `
        <td>${formattedDate}</td>
        <td>${data[i].category}</td>
        <td>${data[i].description}</td>
        <td>${data[i].expenseAmount}</td>
        <td>
          <button class="editDelete btn btn-danger" onclick="deleteData('${data[i].id}',1)">Delete</button>
          <button class="editDelete btn btn-secondary" onclick="editData(${data[i].id}, '${data[i].category}', '${data[i].description}', ${data[i].expenseAmount}, 1)">Edit</button>
        </td>
      `;
        tbody.appendChild(newRow);
      }
    }
    const ul = document.getElementById("paginationUL");
    for (let i = 1; i <= res.data.totalPages; i++) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      li.setAttribute("class", "page-item");
      a.setAttribute("class", "page-link");
      a.setAttribute("href", "#");
      a.appendChild(document.createTextNode(i)); ////
      li.appendChild(a);
      ul.appendChild(li);
      a.addEventListener("click", (event) => paginationBtn(i));
    }
  } catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '../loginRegister/loginRegister.html';
    } else {
      console.log(error);
    }
  }
}
async function paginationBtn(pageNumer) {
  try {
    const pageNo = pageNumer;
    const token = localStorage.getItem("token");
    const res = await axios.get('http://localhost:4000/expense', {
      params: { page: pageNo },
      headers: { Authorization: `Bearer ${token}` }
    });
    const tbody = document.getElementById('tbodyId');
    tbody.innerHTML = '';
    const data = res.data.expenses;
    if (data != null) {
      for (let i = 0; i < data.length; i++) {
        const newRow = document.createElement('tr');
        //////// DATE //////////
        const dateObject = new Date(data[i].createdAt);
        const formattedDate = dateObject.toISOString().slice(0, 10).replace(/-/g, '/');
        //////// DATE //////////
        newRow.innerHTML = `
          <td>${formattedDate}</td>
          <td>${data[i].category}</td>
          <td>${data[i].description}</td>
          <td>${data[i].expenseAmount}</td>
          <td>
            <button class="editDelete btn btn-danger" onclick="deleteData('${data[i].id}',${pageNo})">Delete</button>
            <button class="editDelete btn btn-secondary" onclick="editData(${data[i].id}, '${data[i].category}', '${data[i].description}', '${data[i].expenseAmount}',${pageNo} )">Edit</button>
          </td>
        `;
        tbody.appendChild(newRow);
      }
    }
  }catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '../loginRegister/loginRegister.html';
    } else {
      console.log(error);
    }
  }
}


async function deleteData(id, pageNo) {
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:4000/expense/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    await paginationBtn(pageNo);
  } catch (error) {
    if (error.response && error.response.status === 403) {
      window.location.href = '../loginRegister/loginRegister.html';
    } else {
      console.log(error);
    }
  }
}

async function editData(editId, category, description, expenseAmount, pageNo) {
    console.log(editId, category, description, expenseAmount, pageNo)
    document.getElementById('description').value = description;
    document.getElementById('expenseAmount').value = expenseAmount;
    document.getElementById('category').value = category;
    id = editId;
    page = pageNo;
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
    reportsLink.setAttribute("href", "../report/report.html");
  } else {
    buyPremiumBtn.addEventListener('click', handlePremiumPurchase);
  }
}

//------------------------End--isPremiumUser------------------------//


//-----------------------logout--------------------//
const logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = '../loginRegister/loginRegister.html';
});
//-----------------------logout--------------------//

isPremiumUser();
displayData();