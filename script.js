let fName = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirmPassword = document.getElementById("confirmPassword");
let signupBtn = document.getElementById("signupBtn");
let errorMsg = document.getElementById("errorMsg");


function checkIfUserExist(email){
    let users = JSON.parse(localStorage.getItem("users"));
    const obj = users.find(userObj=>{
        return userObj.email === email;
    })
    if(obj) return true;
    else return false;
}

function saveUser(fName , emailInput , passwordInput){
    let userObj = {
        firstName : fName,
        email : emailInput,
        token : generateAccessToken(16),
        password : passwordInput,
    }
    let users = JSON.parse(localStorage.getItem('users'));
    if(users === null){
        users = [];
    }
    users.push(userObj);
    localStorage.setItem("users" , JSON.stringify(users));
    sessionStorage.setItem("loginInUser" , JSON.stringify(userObj));
    fName.value = "";
    email.value = "";
    password.value = "";
    confirmPassword.value = "";
    alert("Signup succesfully");
    window.location.href = "./profile";
}


function generateAccessToken(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < length; i++) {
        token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
}

signupBtn.addEventListener('click' , (e)=>{
    e.preventDefault();
    if(fName.value.trim()==="" || email.value.trim()==="" ||
    password.value.trim()==="" || confirmPassword.value.trim()===""){
            errorMsg.textContent = "Error: All fields are mandatory!";
            errorMsg.style.display = "block";
            setTimeout(() => {
                errorMsg.style.display = "none";
            }, 3000);
        // errorMsg.textContent = "";
    }
    else{
        if(password.value.trim() !== confirmPassword.value.trim()){
            errorMsg.textContent = "Passwords are not matching!";
            errorMsg.style.color = "red";
            errorMsg.style.display = "block";
            password.value = "";
            confirmPassword.value = "";
            setTimeout(() => {
                errorMsg.style.display = "none";
            }, 3000);
        }
        else{
            if(localStorage.getItem("users")){
                if(checkIfUserExist(email.value)){
                   alert ("Already signup")
                   

                    window.location.href = "./profile";
                    
                }
                else{
                    saveUser(fName.value , email.value , password.value);
                }
            }
            else{
                saveUser(fName.value , email.value , password.value);
            }
        }
    }
})
