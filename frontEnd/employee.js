
let logoutBtn = document.querySelector('#logout')
let reimbursemenElement = document.querySelector('#reimbursement-table tbody');
let getStatus = document.getElementById("status");
let typeElement = document.getElementById("re-type")
let logoutElement = document.getElementById("logout");
let eid = localStorage.getItem("employee")
let poputaleTable = document.getElementById("populate")


 poputaleTable.addEventListener('click', grab)

 getStatus.addEventListener("change", filterStatus);

 typeElement.addEventListener("change", filter_type)

 logoutElement.addEventListener("click", logout)

document.addEventListener('DOMContentLoaded', loginstatus)



function loginstatus(){
    
     if (localStorage.length == 0){
          window.location.href = '/frontEnd/login.html'
     }

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
            
   
   
            row.appendChild(ridCell);
            row.appendChild(aCell);
            row.appendChild(typeCell);
            row.appendChild(dCell);
            row.appendChild(statusCell);
   
            reimbursemenElement.appendChild(row);
   i++; 
}
}    


function grab() {

     reimbursemenElement.innerHTML = ""

     fetch(`http://127.0.0.1:8080/login/reimbursement/employee/${eid}`,{
          'credentials':'include',
     })
     .then((res) => {
          data = res.json();
          return data;

     }).then((data) => {
          addReimbursementsToTable(data);
          
     }).catch((err) =>{
          console.log(err)
     })
}
    function logout(){
     fetch('http://127.0.0.1:8080/logout',{
          'method':'POST'
     })
     .then((res) => {
          data = res.status;
          return data
     }).then((data) => {
          if (data==200){
             localStorage.clear();
             window.location.href = '/frontEnd/login.html'
             window.alert("Logout Successful")
          }
     })
   }

  





   function logout(){
     fetch('http://127.0.0.1:8080/logout',{
          'method':'POST'
     })
     .then((res) => {
          data = res.status;
          return data
     }).then((data) => {
          if (data==200){
             localStorage.clear();
             window.location.href = '/frontEnd/login.html'
             window.alert("Logout Successful")
          }
     })
   }
 
 
function filterStatus(){
   let statusValue = getStatus.options[getStatus.selectedIndex].value
   
   reimbursemenElement.innerHTML = ""
   
   fetch(`http://127.0.0.1:8080/login/reimbursement/employee/${eid}`) //need to sort by date automatically 
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
                  }                    
                  ridCell.innerHTML = reimbursement_obj.reimbursement[i].reimbursement_id;
                  
                  aCell.innerHTML = "$" + parseFloat(reimbursement_obj.reimbursement[i].amount).toFixed(2)                  
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
    

   function filter_type(){
      let typeValue = typeElement.options[typeElement.selectedIndex].value
      
      reimbursemenElement.innerHTML = ""
      
      fetch(`http://127.0.0.1:8080/login/reimbursement/employee/${eid}`) //need to sort by date automatically 
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
                     }                         
                     ridCell.innerHTML = reimbursement_obj.reimbursement[i].reimbursement_id;
                     aCell.innerHTML = "$" + parseFloat(reimbursement_obj.reimbursement[i].amount).toFixed(2)                                       
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
       