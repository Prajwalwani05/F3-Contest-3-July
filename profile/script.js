
let loginBtn = document.getElementById("logoutBtn");
let successMsg = document.getElementById("successMsg");

loginBtn.addEventListener('click' , ()=>{
    logout();
    window.location.href = "../index.html";
})
function logout() {
    localStorage.removeItem('users');
    sessionStorage.removeItem("loginInUser")
  }

  const usersArray = JSON.parse(localStorage.getItem('users')) || [];
  
  // Assuming you want to show the most recently signed up user in the profile page
  const userObject = usersArray[usersArray.length - 1];
  
  if (userObject) {
    // Update the profile page with user information
    successMsg.style.display = "block";
    document.getElementById('name').textContent = userObject.firstName;
    document.getElementById('email').textContent = userObject.email;
    document.getElementById('password').textContent = userObject.password;
    document.getElementById('token').textContent = userObject.token;
  }
