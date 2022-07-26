let usernameLogin = document.getElementById("username-login-input");
let passwordLogin = document.getElementById("password-login-input");
let loginButton = document.getElementById("login");
var enterButton = document.getElementById("username-login-input");
var enterButton1 = document.getElementById("password-login-input");

document.addEventListener("DOMContentLoaded", loginstatus);
loginButton.addEventListener('click', loginNow)
function loginstatus() {
  if (localStorage.getItem("employee_type") == 0) {
    window.location.href = "/frontEnd/employee.html";
  } else if (localStorage.getItem("employee_type") == 1) {
    window.location.href = "/frontEnd/manager.html";
  } else {
    sessionStorage.clear();
  }
}

enterButton.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("login").click();
  }
});
enterButton1.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("login").click();
  }
});


async function loginNow(){

  

  if(usernameLogin.value != "" && passwordLogin != ""){
  
    try{
      let res = await fetch(`http://127.0.0.1:8080/login/${usernameLogin.value}/${passwordLogin.value}`);
      let data = await res.json();
      console.log(data)

      if(res.status == 200){
        
        eid = data.employee_id;
        localStorage.setItem("employee", eid);
        localStorage.setItem("username", data.username);
        localStorage.setItem("employee_type", data.employee_type);
        if (data.employee_type == 0) {
              
           fetch(`http://127.0.0.1:8080/login/reimbursement/employee/${eid}`) //need to sort by date automatically
            .then((res) => {
                return res.json();
            }).then((data) => {
               localStorage.setItem("length", data.reimbursement.length);
              localStorage.setItem("reimbursement", JSON.stringify(data.reimbursement));
              window.location.href = "/frontEnd/employee.html";
            })
            
           
          
        }
        if (data.employee_type == 1) {
          
            fetch("http://127.0.0.1:8080/login/reimbursement/manager/status") //need to sort by date automatically
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                localStorage.setItem("reimbursement", JSON.stringify(data.reimbursement));
                localStorage.setItem("length", data.reimbursement.length);
                window.location.href = "/frontEnd/manager.html";

              })
              .catch((err) => {
                console.log(err);
              });
          
        }
        else if (res.status == 400) {
          window.alert("Invalid Username/Password");
        }
       

      }

    } 
    catch(err) {
      console.log(err);
    }
  }
  else{
    alert("Please enter Username/Password")
  

  }
};



      
  

//   }})
// } 
