let usernameInput = document.getElementById('username-input');
let passwordInput = document.getElementById('password-input');
let firstNameInput = document.getElementById('firstname-input');
let lastNameInput = document.getElementById('lastname-input');
let emailInput = document.getElementById('email-input');
let registrationSubmitButton = document.getElementById('register-submit-btn');


registrationSubmitButton.addEventListener('click', async () => {
    
    
    let res = await fetch('http://127.0.0.1:8080/register', {
          
            'Access-Control-Allow-Origin': '*',
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
                
            },
            'body': JSON.stringify({
                "username": usernameInput.value,
                "password": passwordInput.value,
                "first_name": firstNameInput.value,
                "last_name": lastNameInput.value,
                "email_address": emailInput.value
            })
        })
    console.log(res);
    
    if (res.status == 201) {

        window.location.href = '/success.html'
    
    } else if (res.status == 400) {
        let data = await res.json();
        
        let registrationErrorMessagesDiv = document.getElementById('registration-error-messages')
        registrationErrorMessagesDiv.innerHTML = '';

        let errorMessages = data.messages;
        for (let errorMessage of errorMessages) {
            let errorElement = document.createElement('p');
            errorElement.innerHTML = errorMessage;
            errorElement.style.color = 'red';
            errorElement.style.fontWeight = 'bold';

            registrationErrorMessagesDiv.appendChild(errorElement);
        }
    }
});