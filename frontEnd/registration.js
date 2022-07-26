let employeeIdInput = document.getElementById('employee-id-input');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let firstNameInput = document.getElementById('firstname-input');
let lastNameInput = document.getElementById('lastname-input');
let emailInput = document.getElementById('email-input');
let registrationSubmitButton = document.getElementById('register-submit-btn');

document.addEventListener('DOMContentLoaded', loginstatus)


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



registrationSubmitButton.addEventListener('click', async () => {
   
    let res = await fetch(`http://127.0.0.1:8080/login/register`, {
            
            'method': 'POST',
            'credentials':'include',
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'*'
                
            },
            'body': JSON.stringify({
                "employee_id":employeeIdInput.value,
                "username": usernameInput.value,
                "employee_password": passwordInput.value,
                "first_name": firstNameInput.value,
                "last_name": lastNameInput.value,
                "email_address": emailInput.value
            }),
        })
    
    
    let data = await res.json();


    if (res.status == 200) {
        window.alert("Account Successfully Created")
    } 

    else if(res.status == 400) {
        
        let registrationErrorMessagesDiv = document.getElementById('registration-error-messages')
        let errorMessages = data.messages;
        let errorString = ""
        for (i=0; i < errorMessages.length; i++) {
            errorString = errorString + errorMessages[i] +"\n"  
        }
        window.alert(errorString)
    }
    
});
