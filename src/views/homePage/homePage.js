let id = "";

const token = localStorage.getItem('token');
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
      await axios.post('http://localhost:4000/expense', obj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      console.log('User verified');
      await displayData();
      form.reset();

    } catch (error) {
      window.location.href = '../loginRegister/loginRegister.html';

    }
  } else {
    try {
      await axios.put(`http://localhost:4000/expense/${id}`, obj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });
      await displayData();
      form.reset();
    } catch (error) {
      window.location.href = '../loginRegister/loginRegister.html';
    }
    id = '';
  }
});

async function displayData() {
  try {
    const response = await axios.get('http://localhost:4000/expense', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
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
    console.log(error)
    window.location.href = '../loginRegister/loginRegister.html';

  }
}

async function deleteData(id) {
  try {
    await axios.delete(`http://localhost:4000/expense/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    });
    await displayData();
  } catch (error) {
    window.location.href = '../loginRegister/loginRegister.html';

  }
}

async function editData(editId) {
  try {
    const response = await axios.get('http://localhost:4000/expense', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
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
    window.location.href = '../loginRegister/loginRegister.html';
  }
}

displayData();
