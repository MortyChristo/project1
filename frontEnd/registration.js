let employeeIdInput = document.getElementById('employee-id-input');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let firstNameInput = document.getElementById('firstname-input');
let lastNameInput = document.getElementById('lastname-input');
let emailInput = document.getElementById('email-input');
let registrationSubmitButton = document.getElementById('register-submit-btn');


registrationSubmitButton.addEventListener('click', async () => {
    console.log(emailInput.value)




    let res = await fetch('http://127.0.0.1:8080/login/register', {
          
            'method': 'POST',
            'credentials':'include',
            'headers': {
                'Content-Type': 'application/json'
                
            },
            'body': JSON.stringify({
                "employee_id":employeeIdInput.value,
                "username": usernameInput.value,
                "password": passwordInput.value,
                "first_name": firstNameInput.value,
                "last_name": lastNameInput.value,
                "email_address": emailInput.value
            })
        })
    let data = await res.json();
    console.log(data.res)
    if (res.status == 200) {

        window.alert("Account Successfully Created")
        window.location.href="/frontEnd/login.html"
    
    } 
    else if (res.status == 400) {
        
        let registrationErrorMessagesDiv = document.getElementById('registration-error-messages')
        let errorMessages = data.messages;
        let errorString = ""
        for (i=0; i < errorMessages.length; i++) {
            errorString = errorString + errorMessages[i] +"\n"  
        }
        window.alert(errorString)

    }
});