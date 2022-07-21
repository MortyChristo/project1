let usernameLogin = document.getElementById('username-login-input');
let passwordLogin = document.getElementById('password-login-input');
let loginButton = document.getElementById('login');


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
    let data = await res.json();
    
    eid = data.employee_id;

    localStorage.setItem("employee", eid)

    if (res.status == 200) {
        if(data.employee_type == 0){
            window.location.href = '/frontEnd/employee.html'
           
        }
        if(data.employee_type == 1){
            window.location.href = '/frontEnd/manager.html'
        }
    } else if (res.status == 400) {
        window.location.href = '/frontEnd/fail.html'//change to login
    }
});
