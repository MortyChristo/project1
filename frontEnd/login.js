let usernameLogin = document.getElementById('username-login-input');
let passwordLogin = document.getElementById('password-login-input');
let loginButton = document.getElementById('login-btn');
let registrationButton = document.getElementById('registration-btn');


registrationButton.addEventListener('click', async () =>{
    window.location.href = '/registration.html'
});



loginButton.addEventListener('click', async () => {
    
    let res = await fetch('http://127.0.0.1:8080/login', {
            Access-Control-Allow-Origin : '*',
            'credentials' : "include",
            'method': 'POST',
            'headers': {
                'Content-Type': 'application/json'
            },
            'body': JSON.stringify({
                "username": usernameLogin.value,
                "password": passwordLogin.value,
                
                //connect to back end


            })
        })
        
    console.log(res)
    
    if (res.status == 200) {

        window.location.href = '/success.html'//change to login
    
    } else if (res.status == 400) {

        window.location.href = '/fail.html'//change to login

    }
});


