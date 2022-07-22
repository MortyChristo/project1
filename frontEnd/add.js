let amountInput = document.getElementById('amount-input');
let descriptionInput = document.getElementById('description-input');
let submitButton = document.getElementById('submit-btn');
let eid = localStorage.getItem("employee")

submitButton.addEventListener('click', add);

function add(){ 
    let expense = document.getElementsByName('expense')
    for(i=0;i<expense.length;i++){
        if (expense[i].checked){
             let ex = expense[i].value;
             sessionStorage.setItem("value", ex)
             break;
            }

        // else if (expense[1].checked){
        //     let ex = expense[1].value;
        //     sessionStorage.setItem("value", ex)
        // }       
        // else if (expense[2].checked){
        //     let ex = expense[2].value;
        //     sessionStorage.setItem("value", ex)
        // }    
        // else if(expense[3].checked){
        //     let ex = expense[3].value;
        //     sessionStorage.setItem("value", ex)
        // }
    }

    fetch(`http://127.0.0.1:8080//login/reimbursement/add`, {
        'Access-Control-Allow-Origin': '*',
        'method': 'POST',
        'credentials':'include',
        'headers': {
            'Content-Type': 'application/json'
            
        },
        'body': JSON.stringify({
            "employee_id": eid,
            "amount": amountInput.value,
            "type_of_reimbursement": sessionStorage.getItem("value"),
            "description": descriptionInput.value
            })
        
        }).then((res) =>{

            data = res.status;
            return data;
        }).then((data) => {
            if (data == 200){
                window.alert("Reimbursement Added")
            }
        })
  
    
    };