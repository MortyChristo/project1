let usernameLogin = document.getElementById('username-login-input');
let passwordLogin = document.getElementById('password-login-input');
let loginButton = document.getElementById('login-btn');
let registrationButton = document.getElementById('registration-btn');



loginButton.addEventListener('click', async () => {
    
    let res = await fetch('http://127.0.0.1:8080/login', {
            'Access-Control-Allow-Origin': '*',
            'method': 'POST',
            'credentials':'include',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                "username": usernameLogin.value,
                "password": passwordLogin.value,

            })
        })
    if (res.status == 200) {

        window.location.href = '/frontEnd/filter.html'
        
    } else if (res.status == 400) {

        window.location.href = '/frontEnd/fail.html'//change to login

    }
});


