
const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const data = { name, email, password };

  try {
    
    await axios.post('http://localhost:3000/user/register', data);
    registrationForm.reset();
    alert("Register Successful")
  } catch (error) {
    console.error(error);
  }
});
