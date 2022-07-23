let amountInput = document.getElementById('amount-input');
let descriptionInput = document.getElementById('description-input');
let submitButton = document.getElementById('submit-btn');
let eid = localStorage.getItem("employee")
let imgData = document.getElementById("img")

submitButton.addEventListener('click', add);

function add(){ 
    let img = imgData.value

    
    // let expense = document.getElementsByName('expense')
    // for(i=0;i<expense.length;i++){
    //     if (expense[i].checked){
    //          let ex = expense[i].value;
    //          sessionStorage.setItem("value", ex)
    //          break;
    //         }
    // }

    // fetch(`http://127.0.0.1:8080//login/reimbursement/add`, {
    //     'Access-Control-Allow-Origin': '*',
    //     'method': 'POST',
    //     'credentials':'include',
    //     'headers': {
    //         'Content-Type': 'application/json'
            
    //     },
    //     'body': JSON.stringify({
    //         "employee_id": eid,
    //         "amount": amountInput.value,
    //         "type_of_reimbursement": sessionStorage.getItem("value"),
    //         "description": descriptionInput.value
    //         }//,
    //     //'body'
    //     )
      
    //     }).then((res) =>{

    //         data = res.status;
    //         return data;
    //     }).then((data) => {
    //         if (data == 200){
    //             window.alert("Reimbursement Added")
    //         }
    //     })
  
    
    };