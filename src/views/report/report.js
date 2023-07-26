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
document.getElementById('downloadDailyBtn').addEventListener('click', () => {
    const dailyExpensesData = 'Date,Category,Description,Amount\n2023-07-01,Food,Lunch,15.50\n2023-07-02,Transportation,Bus Fare,5.25';
    const dailyFilename = 'daily_expenses_report.txt';
    downloadExpensesFile(dailyExpensesData, dailyFilename);
});

document.getElementById('downloadMonthlyBtn').addEventListener('click', () => {
    const monthlyExpensesData = 'Date,Category,Description,Amount\n2023-07-01,Food,Lunch,155.50\n2023-07-02,Transportation,Bus Fare,55.25';
    const monthlyFilename = 'monthly_expenses_report.txt';
    downloadExpensesFile(monthlyExpensesData, monthlyFilename);
});

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
});
//-----------------------logout--------------------//