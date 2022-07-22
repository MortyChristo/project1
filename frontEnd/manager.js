
     
   let logoutBtn = document.querySelector('#logout')
   let reimbursemenElement = document.querySelector('#reimbursement-table tbody');
   let getStatus = document.getElementById("status");
   let employeeElement = document.querySelector('#employee_id_box');
   let typeElement = document.getElementById("re-type")
   let logoutElement = document.getElementById("logout");
   let newNav = document.getElementById("navbar_logo")
   let submitBtn = document.getElementById("submit")
  
    submitBtn.addEventListener('click', approval);

    document.addEventListener('DOMContentLoaded', grab);

    getStatus.addEventListener("change", filterStatus);

    document.addEventListener("DOMContentLoaded", getId);

    employeeElement.addEventListener("change", filter_employee);

    typeElement.addEventListener("change", filter_type)
   
    logoutElement.addEventListener("click", logout)




function logout(){
     fetch('http://127.0.0.1:8080/logout',{
          'method':'POST'
     })
     .then((res) => {
          data = res.status;
          return data
     }).then((data) => {
          if (data==200){
               window.location.href = '/frontEnd/login.html'
               window.alert("Logout Successful")
          }
     })
}


function approval(){

     let approval = document.getElementsByName('approval')
     for(i=0;i<approval.length;i++){
          if (approval[0].checked){
               let approved = approval[0].value;
               sessionStorage.setItem("value", approved)
     }
          else{
               let approved = approval[1].value;
               sessionStorage.setItem("value", approved)
          }
     let id = document.getElementById("rid").value
     
    

     if(sessionStorage.getItem("value") == "a"){
           fetch(`http://127.0.0.1:8080/login/reimbursement/approve/${id}`,{
                'credentials':'include'
           })
          
     }
     else{
          console.log("here")
          fetch(`http://127.0.0.1:8080/login/reimbursement/deny/${id}`,{
               'credentials':'include'
     })
}}
}











function getId(){
     fetch('http://127.0.0.1:8080/login/reimbursement/manager/employee',{
          'credentials': 'include'
     }) //need to sort by date automatically 
     .then((res) => {
          data = res.json();
          
          return data;
     }).then((data) => {
          for(i = 0; i < data.reimbursement.length; i++){
               let newOption = new Option(data.reimbursement[i].employee_id[0], data.reimbursement[i].employee_id[0])
               employeeElement.add(newOption, undefined)
               
          }
}).catch((err) =>{
        console.log(err)
     })
}


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
            if(reimbursement_obj.reimbursement[i].description == ""){
               dCell.innerHTML = "N/A"
          }  
          else if(reimbursement_obj.reimbursement[i].description != "") {         
               dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
          }            
          if(reimbursement_obj.reimbursement[i].type_of_reimbursement == 'a'){
               typeCell.innerHTML = "Lodging"
          }
          else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "b"){
               typeCell.innerHTML = "Travel"
          }
          else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "c"){
               typeCell.innerHTML = "Food"
          }
          else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "d"){
               typeCell.innerHTML = "Other"
          }
            idCell.innerHTML = reimbursement_obj.reimbursement[i].employee_id;
            ridCell.innerHTML = reimbursement_obj.reimbursement[i].reimbursement_id;
            aCell.innerHTML = "$" + parseFloat(reimbursement_obj.reimbursement[i].amount).toFixed(2)                              
            


            row.appendChild(idCell);
            row.appendChild(ridCell);
            row.appendChild(aCell);
            row.appendChild(typeCell);
            row.appendChild(dCell);
            row.appendChild(statusCell);

            reimbursemenElement.appendChild(row);
            i++; 
        }
     //    for(i=0; i < reimbursement_obj.reimbursement.length; i++){
     //      if(reimbursement_obj.reimbursement[i].employee_id ){
     //           idToAdd.appendChild
     //      }}
   }    
    
   

function grab() {
 
     
    fetch('http://127.0.0.1:8080/login/reimbursement/manager/status') //need to sort by date automatically 
    .then((res) => {
         data = res.json();
         return data;
    }).then((data) => {
         addReimbursementsToTable(data);
    
    }).catch((err) =>{
       console.log(err)
    })
 }

function filterStatus(){
     let statusValue = getStatus.options[getStatus.selectedIndex].value
     
     reimbursemenElement.innerHTML = ""
     
     fetch('http://127.0.0.1:8080/login/reimbursement/manager/status') //need to sort by date automatically 
     .then((res) => {
          data = res.json();
          return data;
     }).then((data) => {
          addReimbursementsToTablebyStatus(data, statusValue);
          
     }).catch((err) =>{
        console.log(err)
     })
       
     }

     function addReimbursementsToTablebyStatus(reimbursement_obj, statusValue){
          i=0;
          if(statusValue == "Status"){
               grab()
              }
          else{
              while(i < reimbursement_obj.reimbursement.length){
             
               let row = document.createElement('tr');
             
               let typeCell = document.createElement('td');
             
               let statusCell = document.createElement('td');
             
               let dCell = document.createElement('td');
             
               let idCell = document.createElement('td');
             
               let ridCell = document.createElement('td');
             
               let aCell = document.createElement('td');
             
             
               if (reimbursement_obj.reimbursement[i].status == statusValue){          
                    statusCell.innerHTML = reimbursement_obj.reimbursement[i].status;            
                    if(reimbursement_obj.reimbursement[i].description == ""){
                         dCell.innerHTML = "N/A"
                    }  
                    else if(reimbursement_obj.reimbursement[i].description != "") {         
                         dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
                    }                    
                    if(reimbursement_obj.reimbursement[i].description == ""){
                         dCell.innerHTML = "N/A"
                    }  
                    else if(reimbursement_obj.reimbursement[i].description != "") {         
                         dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
                    }            
                    if(reimbursement_obj.reimbursement[i].type_of_reimbursement == 'a'){
                         typeCell.innerHTML = "Lodging"
                    }
                    else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "b"){
                         typeCell.innerHTML = "Travel"
                    }
                    else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "c"){
                         typeCell.innerHTML = "Food"
                    }
                    else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "d"){
                         typeCell.innerHTML = "Other"
                    }                    idCell.innerHTML = reimbursement_obj.reimbursement[i].employee_id;
                    ridCell.innerHTML = reimbursement_obj.reimbursement[i].reimbursement_id;
                    aCell.innerHTML = "$" + parseFloat(reimbursement_obj.reimbursement[i].amount).toFixed(2)                                      
                    row.appendChild(idCell);
                    row.appendChild(ridCell);
                    row.appendChild(aCell);
                    row.appendChild(typeCell);
                    row.appendChild(dCell);
                    row.appendChild(statusCell);
  
                    reimbursemenElement.appendChild(row);
              }
          
              i++; 
          }
     }    }
      


     function filter_employee(){
          let employeeValue = employeeElement.options[employeeElement.selectedIndex].value
          
          reimbursemenElement.innerHTML = ""
          
          fetch('http://127.0.0.1:8080/login/reimbursement/manager/status') //need to sort by date automatically 
          .then((res) => {
               data = res.json();
               return data;
          }).then((data) => {
               addReimbursementsToTablebyid(data, employeeValue)
              

          }).catch((err) =>{
             console.log(err)
          })
            
          
     
          function addReimbursementsToTablebyid(reimbursement_obj, employeeValue){
               i=0;

               
               if(employeeValue == "Employee ID"){
                    grab()
                   }
               else{
                    
                   while(i < reimbursement_obj.reimbursement.length){
                  
                    let row = document.createElement('tr');
                  
                    let typeCell = document.createElement('td');
                  
                    let statusCell = document.createElement('td');
                  
                    let dCell = document.createElement('td');
                  
                    let idCell = document.createElement('td');
                  
                    let ridCell = document.createElement('td');
                  
                    let aCell = document.createElement('td');
                  
                  
                    if (reimbursement_obj.reimbursement[i].employee_id == employeeValue){          
                         statusCell.innerHTML = reimbursement_obj.reimbursement[i].status;
                         if(reimbursement_obj.reimbursement[i].description == ""){
                              dCell.innerHTML = "N/A"
                         }  
                         else if(reimbursement_obj.reimbursement[i].description != "") {         
                              dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
                         }
                         if(reimbursement_obj.reimbursement[i].description == ""){
                              dCell.innerHTML = "N/A"
                         }  
                         else if(reimbursement_obj.reimbursement[i].description != "") {         
                              dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
                         }            
                         if(reimbursement_obj.reimbursement[i].type_of_reimbursement == 'a'){
                              typeCell.innerHTML = "Lodging"
                         }
                         else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "b"){
                              typeCell.innerHTML = "Travel"
                         }
                         else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "c"){
                              typeCell.innerHTML = "Food"
                         }
                         else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "d"){
                              typeCell.innerHTML = "Other"
                         }                         idCell.innerHTML = reimbursement_obj.reimbursement[i].employee_id;
                         ridCell.innerHTML = reimbursement_obj.reimbursement[i].reimbursement_id;
                         aCell.innerHTML = "$" + parseFloat(reimbursement_obj.reimbursement[i].amount).toFixed(2)                                           
                         row.appendChild(idCell);
                         row.appendChild(ridCell);
                         row.appendChild(aCell);
                         row.appendChild(typeCell);
                         row.appendChild(dCell);
                         row.appendChild(statusCell);
       
                         reimbursemenElement.appendChild(row);
                   }
               
                   i++; 
               }
          }    }}
           

          
          
     function filter_type(){
          let typeValue = typeElement.options[typeElement.selectedIndex].value
          
          reimbursemenElement.innerHTML = ""
          
          fetch('http://127.0.0.1:8080/login/reimbursement/manager/status') //need to sort by date automatically 
          .then((res) => {
               data = res.json();
               return data;
          }).then((data) => {
               
               addReimbursementsToTablebyType(data, typeValue);
               
          }).catch((err) =>{
             console.log(err)
          })
            
          }
     
          function addReimbursementsToTablebyType(reimbursement_obj, typeValue){
               i=0;
               
               if(typeValue == "type_of"){
                    grab()
                   }
               else{
                    
                   while(i < reimbursement_obj.reimbursement.length){
                  
                    let row = document.createElement('tr');
                  
                    let typeCell = document.createElement('td');
                  
                    let statusCell = document.createElement('td');
                  
                    let dCell = document.createElement('td');
                  
                    let idCell = document.createElement('td');
                  
                    let ridCell = document.createElement('td');
                  
                    let aCell = document.createElement('td');
                  
                  
                    if (reimbursement_obj.reimbursement[i].type_of_reimbursement == typeValue){          
                         statusCell.innerHTML = reimbursement_obj.reimbursement[i].status;
                         if(reimbursement_obj.reimbursement[i].description == ""){
                              dCell.innerHTML = "N/A"
                         }  
                         else if(reimbursement_obj.reimbursement[i].description != "") {         
                              dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
                         }
                         if(reimbursement_obj.reimbursement[i].description == ""){
                              dCell.innerHTML = "N/A"
                         }  
                         else if(reimbursement_obj.reimbursement[i].description != "") {         
                              dCell.innerHTML = reimbursement_obj.reimbursement[i].description;
                         }            
                         if(reimbursement_obj.reimbursement[i].type_of_reimbursement == 'a'){
                              typeCell.innerHTML = "Lodging"
                         }
                         else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "b"){
                              typeCell.innerHTML = "Travel"
                         }
                         else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "c"){
                              typeCell.innerHTML = "Food"
                         }
                         else if(reimbursement_obj.reimbursement[i].type_of_reimbursement == "d"){
                              typeCell.innerHTML = "Other"
                         }                         idCell.innerHTML = reimbursement_obj.reimbursement[i].employee_id;
                         ridCell.innerHTML = reimbursement_obj.reimbursement[i].reimbursement_id;
                         aCell.innerHTML = "$" + parseFloat(reimbursement_obj.reimbursement[i].amount).toFixed(2)
                                           
                         row.appendChild(idCell);
                         row.appendChild(ridCell);
                         row.appendChild(aCell);
                         row.appendChild(typeCell);
                         row.appendChild(dCell);
                         row.appendChild(statusCell);
       
                         reimbursemenElement.appendChild(row);
                   }
               
                   i++; 
               }
          }    }
           