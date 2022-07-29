let amountInput = document.getElementById('amount-input');
let descriptionInput = document.getElementById('description-input');
let submitButton = document.getElementById('submit-btn');
let eid = localStorage.getItem("employee")
let imgData = document.getElementById("img")
let logoutElement = document.getElementById("logout");



logoutElement.addEventListener("click", logout);

submitButton.addEventListener('click', add);

document.addEventListener('DOMContentLoaded', loginstatus)

function logout() {
    fetch("http://127.0.0.1:8080/logout", {
      'method': 'POST',
    })
      .then((res) => {
        data = res.status;
        return data;
      })
      .then((data) => {
        if (data == 200) {
          localStorage.clear();
          window.alert("Logout Successful");
          window.location.href = "/frontEnd/login.html";
        }
      });
  }

function loginstatus(){
    
     if (localStorage.length == 0){
          window.location.href = '/frontEnd/login.html'
     }

}

function add(){ 
    const formData = new FormData();

    let img = imgData.value

    
    let expense = document.getElementsByName('expense')
    for(i=0;i<expense.length;i++){
        if (expense[i].checked){
             let ex = expense[i].value;
             sessionStorage.setItem("value", ex)
             break;
            }
    }
    
    formData.append("employee_id", eid)
    
    
    formData.append("amount", amountInput.value)
    formData.append("type_of_reimbursement", sessionStorage.getItem("value"))
    formData.append("description", descriptionInput.value)
    formData.append("img", imgData.files[0])
    console.log(imgData.value, imgData.files[0])
    fetch(`http://127.0.0.1:8080//login/reimbursement/add`, {
        'method': 'POST',
        'credentials':'include',
        'body': formData,

        }).then((res) =>{
            
            data = res.status;

            console.log(data)
       
            if (data == 200){ 
                window.location.href = "/frontEnd/employee.html";
              
            }
            
            if(data == 400){
                alert("Did not add Reimbursement")
            }
        })
  
    
    };