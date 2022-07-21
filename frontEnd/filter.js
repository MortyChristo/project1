
     
   let idInput = document.querySelector('#employee-id')
   let logoutBtn = document.querySelector('#logout')
   let reimbursemenElement = document.querySelector('#reimbursement-table tbody');

    document.addEventListener('DOMContentLoaded', grab);

   
   function addReimbursementsToTable(reimbursement_obj){
        let row = document.createElement('tr');
        let typeCell = document.createElement('td');
        i=0;
        while(i < reimbursement_obj.reimbursement.length){
            let row = document.createElement('tr');
            let typeCell = document.createElement('td');
            typeCell.innerHTML = reimbursement_obj.reimbursement[i].status;
            row.appendChild(typeCell);
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

     