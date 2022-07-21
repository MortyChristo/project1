let employeeIdInput = document.getElementById('employee-id-input');
let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let firstNameInput = document.getElementById('firstname-input');
let lastNameInput = document.getElementById('lastname-input');
let emailInput = document.getElementById('email-input');
let registrationSubmitButton = document.getElementById('register-submit-btn');


registrationSubmitButton.addEventListener('click', async () => {
    
    
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

    if (res.status == 200) {

        window.alert("Account Successfully Created")
    
    } 
    else if (res.status == 400) {
        
        let registrationErrorMessagesDiv = document.getElementById('registration-error-messages')
        registrationErrorMessagesDiv.innerHTML = '';
        console.log(data.messages)
        let errorMessages = data.messages;
        let errorString = ""
        for (i=0; i < errorMessages.length; i++) {
            errorString = errorString + errorMessages[i] +"\n"  
        }
        console.log(errorString)
        window.alert(errorString)

        //let errorElement = document.createElement('p');
        // errorElement.innerHTML = errorMessages;
        // errorElement.style.color = 'red';
        // errorElement.style.fontWeight = 'bold';

        // registrationErrorMessagesDiv.appendChild(errorElement);
        // }
    }
});