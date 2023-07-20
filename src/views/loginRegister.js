const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = { name, email, password };

  try {
    const userInfo = await axios.post('http://localhost:4000/user/register', data);
    alert(userInfo.data.message)
    registrationForm.reset(); 
  } catch (error) {
    console.error(error);
  }
});