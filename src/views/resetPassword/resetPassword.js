const resetPasswordBtn = document.getElementById("resetPasswordBtn");

resetPasswordBtn.addEventListener("click", async()=>{
    try {
        const url = new URL(window.location.href);
        const id = url.searchParams.get("id");
        
        const newPassword = document.getElementById("newPassword").value;
        const res = await axios.post(
            "http://localhost:4000/user/resetPassword",
            {
                password: newPassword,
                id,
            }
        );
        alert(res.data.message);
        window.location.href = '../loginRegister/loginRegister.html';
    } catch (error) {
        console.log(error);
        alert(error.response.data.message);
        window.location.reload();
    }
});
