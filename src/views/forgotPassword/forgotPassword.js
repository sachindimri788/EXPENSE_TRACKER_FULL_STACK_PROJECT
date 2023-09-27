const resetPasswordLinkBtn = document.getElementById("resetPasswordLinkBtn");

resetPasswordLinkBtn.addEventListener("click", async () => {
  {
    try {
      const email = document.getElementById("email").value;
      const res = await axios.post(
        "http://localhost:4000/user/forgotPassword",
        {
          email: email,
        }
      );
      alert(res.data.message);
      window.location.href = "../loginRegister/loginRegister.html";
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      window.location.reload();
    }
  }
});
