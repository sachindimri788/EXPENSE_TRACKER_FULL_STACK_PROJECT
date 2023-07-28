const tbodyId = document.getElementById("tbodyId");

async function displayData() {
    try {
        const token = localStorage.getItem("token");
        tbodyId.innerHTML = "";
        const response = await axios.get("http://localhost:4000/premium/getAllUser", {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;

        for (let i = 0; i < data.length; i++) {
            const { name, totalExpenses } = data[i];
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
          <td>${i + 1}</td>
          <td>${name}</td>
          <td>${totalExpenses}</td>
          `;
            tbodyId.appendChild(newRow);
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}


async function isPremiumUser() {
    try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:4000/user/isPremiumUser", {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.isPremiumUser) {
            buyPremiumBtn.innerHTML = "Premium Member &#128081";
        } else {
            window.location.href = '../homePage/homePage.html';
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
}
isPremiumUser();
displayData();

//-----------------------logout--------------------//
const logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = '../loginRegister/loginRegister.html';
    window.location.reload();
});
//-----------------------logout--------------------//