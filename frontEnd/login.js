let usernameLogin = document.getElementById('username-login-input');
let passwordLogin = document.getElementById('password-login-input');
let loginButton = document.getElementById('login');
var enterButton = document.getElementById("username-login-input");
var enterButton1 = document.getElementById("password-login-input");

document.addEventListener('DOMContentLoaded', loginstatus)
sessionStorage.clear()


function loginstatus(){
    
     if (localStorage.getItem("employee_type") == 0){
          window.location.href = '/frontEnd/employee.html'
     }
     else if (localStorage.getItem("employee_type") == 1){
      window.location.href = '/frontEnd/manager.html'
     }
     else {
       sessionStorage.clear() 
      }
}


enterButton.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById('login').click();
  }
}); 
enterButton1.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById('login').click();
    }
  }); 



loginButton.addEventListener('click', async () => {
    
    let res = await fetch('http://127.0.0.1:8080/login', {
            'method': 'POST',
            'credentials': 'include',
            'headers': {
              
              'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                "username": usernameLogin.value,
                "password": passwordLogin.value,
            }),
          })

    let data = await res.json();
    eid = data.employee_id;
    
    localStorage.setItem("employee", eid)
   
        
    if (res.status == 200) {
      

      
       localStorage.setItem("username", data.username)
      localStorage.setItem("employee_type", data.employee_type)
      if(data.employee_type == 0){
          window.location.href = '/frontEnd/employee.html'
       }
      if(data.employee_type == 1){
         window.location.href = '/frontEnd/manager.html'
      }
     else if (res.status == 400) {
        window.alert("Invalid Username/Password")    
      }
     }});
