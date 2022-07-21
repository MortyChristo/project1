
     
   let idInput = document.querySelector('#employee-id')
   let logoutBtn = document.querySelector('#logout')
   let reimbursemenElement = document.querySelector('#reimbursement-table tbody');

    document.addEventListener('DOMContentLoaded', grab);

   
   function addReimbursementsToTable(reimbursement_obj){
        i=0;
        while(i < reimbursement_obj.reimbursement.length){
            let row = document.createElement('tr');
            let typeCell = document.createElement('td');
            let statusCell = document.createElement('td');
            let dCell = document.createElement('td');
            let idCell = document.createElement('td');
            let ridCell = document.createElement('td');
            let aCell = document.createElement('td');
            
            statusCell.innerHTML = reimbursement_obj.reimbursement[i].status;
            dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
            typeCell.innerHTML = reimbursement_obj.reimbursement[i].type_of_reimbursement;
            idCell.innerHTML = reimbursement_obj.reimbursement[i].employee_id;
            ridCell.innerHTML = reimbursement_obj.reimbursement[i].reimbursement_id;
            aCell.innerHTML = reimbursement_obj.reimbursement[i].amount;
            
            
            row.appendChild("$"+typeCell);
            row.appendChild(statusCell);
            row.appendChild(dCell);
            row.appendChild(idCell);
            row.appendChild(aCell);
            row.appendChild(ridCell);
            reimbursemenElement.appendChild(row);
            console.log(reimbursement_obj.reimbursement)
            i++; 
        }
   }    
    
   
  function grab() {
    
     
        console.log("grab")
       fetch('http://127.0.0.1:8080/login/reimbursement/manager')
       .then((res) => {
            data = res.json();
            return data;
       }).then((data) => {
            addReimbursementsToTable(data);
       
       }).catch((err) =>{
          console.log(err)
       })
    }

     