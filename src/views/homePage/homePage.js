let id="";
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
      await axios.post('http://localhost:4000/expense', obj);
      await displayData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
  } else {
    try {
      await axios.put(`http://localhost:4000/expense/${id}`, obj);
      await displayData();
      form.reset();
    } catch (error) {
      console.error(error);
    }
    id = '';
  }
});

async function displayData() {
  try {
    const response = await axios.get('http://localhost:4000/expense');
    const tbody = document.getElementById('tbodyId');
    tbody.innerHTML = ''; 
    const data = response.data;

    if (data != null) {
      for (let i = 0; i < data.length; i++) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
          <td>${data[i].date}</td>
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
    console.log(error);
  }
}

async function deleteData(id) {
  try {
    await axios.delete(`http://localhost:4000/expense/${id}`);
    await displayData();
  } catch (error) {
    console.log(error);
  }
}

async function editData(editId) {
  try {
    const response = await axios.get('http://localhost:4000/expense');
    const data = response.data;
    if (data !== null) {
      const expense =await data.find((item) => item.id === Number(editId));
      if (expense) {
        document.getElementById('description').value = expense.description;
        document.getElementById('expenseAmount').value = expense.expenseAmount;
        document.getElementById('category').value = expense.category;
        id = expense.id;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

displayData();
