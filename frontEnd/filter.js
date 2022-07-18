let idInput = document.querySelector('#employee-id')

let getReimbursementsBtn = document.querySelector('#get-reimbursements');
getReimbursementsBtn.addEventListener('click', grab);




async function getReimbursements(){

let res = await fetch('http://127.0.0.1:8080/login/reimbursement', {
            'Access-Control-Allow-Origin': '*',
            'method': 'GET',
            'headers': {
                'Content-Type': 'application/json',
            }})
       
if (res.status == 200) {

    window.location.href = '/frontEnd/success.html'
            
} else if (res.status == 400) {
    
    window.location.href = '/frontEnd/fail.html'//change to login
    
        }

}

function addReimbursementsToTable(reimbursement_obj){
    let reimbursemenElement = document.querySelector('#reimbursement-table');
    let row = document.createElement('tr');
    let idCell = document.createElement('td');
    idCell.innerText = reimbursement_obj.employee_id;
    
    row.append(idCell);
}

function grab() {
    let res = fetch(`http://127.0.0.1:8080/login/reimbursement/${idInput.value}`)
    console.log(res)
    
}
   
   
   
   
   
   
   
   
   
   