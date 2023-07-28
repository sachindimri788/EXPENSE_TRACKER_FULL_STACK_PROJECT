function downloadExpensesFile(data, filename) {
    const blob = new Blob([data], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}





const dailyDateShowBtn = document.getElementById('dailyDateShowBtn');
dailyDateShowBtn.addEventListener('click', async () => {
    try {
        const token = localStorage.getItem('token');
        const dailyDate = document.getElementById('dailyDate').value;
        const resp = await axios.post('http://localhost:4000/premium/getDailyExpense', {
            date: dailyDate
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = resp.data;
        const tbodyDailyId = document.getElementById('tbodyDailyId');
        tbodyDailyId.innerHTML = "";
        let content = "Date , category, description, expenseAmount \n";
        let totalAmount = 0;
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                totalAmount = totalAmount + Number(data[i].expenseAmount);
                const newRow = document.createElement('tr');
                const dateObject = new Date(data[i].createdAt);
                const formattedDate = dateObject.toISOString().slice(0, 10).replace(/-/g, '/');

                newRow.innerHTML = `<td>${formattedDate}</td>
            <td>${data[i].category}</td>
            <td>${data[i].description}</td>
            <td>${data[i].expenseAmount}</td> `
                tbodyDailyId.appendChild(newRow);
                content = content + `${formattedDate} , ${data[i].category}, ${data[i].description}, ${data[i].expenseAmount} \n`
            }
            const total = document.createElement('p');
            total.innerHTML = `Total Expense Amount = ${totalAmount}`
            tbodyDailyId.appendChild(total);

            const downloadDailyBtn = document.createElement('button');
            downloadDailyBtn.textContent = "Download Daily Expenses Report";
            tbodyDailyId.appendChild(downloadDailyBtn)
            downloadDailyBtn.addEventListener('click', () => {
                const dailyFilename = 'daily_expenses_report.txt';
                downloadExpensesFile(content, dailyFilename);
            });
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
})


const monthlyDateShowBtn = document.getElementById('monthlyDateShowBtn');
monthlyDateShowBtn.addEventListener('click', async () => {
    try {
        const token = localStorage.getItem('token');
        const monthlyDate = document.getElementById('monthlyDate').value;
        console.log("vb",monthlyDate);
        const resp = await axios.post('http://localhost:4000/premium/getMonthlyExpense', {
            date: monthlyDate
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        const data = resp.data;
        const tbodyMonthlyId = document.getElementById('tbodyMonthlyId');
        tbodyMonthlyId.innerHTML = "";
        let content = "Date , category, description, expenseAmount \n";
        let totalAmount = 0;
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                totalAmount = totalAmount + Number(data[i].expenseAmount);
                const newRow = document.createElement('tr');
                const dateObject = new Date(data[i].createdAt);
                const formattedDate = dateObject.toISOString().slice(0, 10).replace(/-/g, '/');

                newRow.innerHTML = `<td>${formattedDate}</td>
            <td>${data[i].category}</td>
            <td>${data[i].description}</td>
            <td>${data[i].expenseAmount}</td> `
                tbodyMonthlyId.appendChild(newRow);
                content = content + `${formattedDate} , ${data[i].category}, ${data[i].description}, ${data[i].expenseAmount} \n`
            }
            const total = document.createElement('p');
            total.innerHTML = `Total Expense Amount = ${totalAmount}`
            tbodyMonthlyId.appendChild(total);
            const downloadMonthlyBtn = document.createElement('button');
            downloadMonthlyBtn.textContent = "Download Monthly Expenses Report";
            tbodyMonthlyId.appendChild(downloadMonthlyBtn)
            downloadMonthlyBtn.addEventListener('click', () => {
                const monthlyFilename = 'monthly_expenses_report.txt';
                downloadExpensesFile(content, monthlyFilename);
            });
        }
    } catch (error) {
        if (error.response && error.response.status === 403) {
            window.location.href = '../loginRegister/loginRegister.html';
        } else {
            console.log(error);
        }
    }
})




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

//-----------------------logout--------------------//
const logoutButton = document.getElementById("logoutBtn");
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = '../loginRegister/loginRegister.html';
    window.location.reload();
});
//-----------------------logout--------------------//