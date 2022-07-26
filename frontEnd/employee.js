let logoutBtn = document.querySelector("#logout");
let reimbursemenElement = document.querySelector("#reimbursement-table tbody");
let getStatus = document.getElementById("status");
let typeElement = document.getElementById("re-type");
let logoutElement = document.getElementById("logout");
let newNav = document.getElementById("navbar_logo"); // change to display first and last name

let employeeId = localStorage.getItem("employee")

document.addEventListener('DOMContentLoaded', addReimbursementsToTable);

document.addEventListener('DOMContentLoaded', loginstatus)

typeElement.addEventListener('change', addReimbursementsToTablebytype)

getStatus.addEventListener("change", addReimbursementsToTablebyStatus);

logoutElement.addEventListener("click", logout)

let emids = localStorage.getItem("ids")





function loginstatus() {
  if (localStorage.length == 0) {
    window.location.href = "/frontEnd/login.html";
  }}

function logout() {
  fetch("http://127.0.0.1:8080/logout", {
    method: "POST",
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

function addReimbursementsToTable() {
  let reimbursement = localStorage.getItem("reimbursement");
  let length = localStorage.getItem("length");
  let parsedReim = JSON.parse(reimbursement);
  reimbursemenElement.innerHTML = "";
  let allId = [] 
  

  i = 0;
  while (i < length) {
    let row = document.createElement("tr");
    let typeCell = document.createElement("td");
    let statusCell = document.createElement("td");
    let dCell = document.createElement("td");
    let idCell = document.createElement("td");
    let ridCell = document.createElement("td");
    let aCell = document.createElement("td");
    let ctsCell = document.createElement("td");
    let rtsCell = document.createElement("td");
    let rvCell = document.createElement("td");
    let setCount = 0

    idCell.innerHTML = parsedReim[i][0];
    allId[i] = parsedReim[i][0]
    aCell.innerHTML = "$" + parseFloat(parsedReim[i][1]).toFixed(2);
    statusCell.innerHTML = parsedReim[i][2];
    if (parsedReim[i][3] == "a") {
      typeCell.innerHTML = "Lodging";
    } else if (parsedReim[i][3] == "b") {
      typeCell.innerHTML = "Travel";
    } else if (parsedReim[i][3] == "c") {
      typeCell.innerHTML = "Food";
    } else if (parsedReim[i][3] == "d") {
      typeCell.innerHTML = "Other";
    }
    if (parsedReim[i][4] == "") {
      dCell.innerHTML = "N/A";
    } else if (parsedReim[i][4] != "") {
      dCell.innerHTML = parsedReim[i][4];
    }
    ridCell.innerHTML = parsedReim[i][5];
    ctsCell.innerHTML = parsedReim[i][6];
    if (parsedReim[i][7] == null) {
      rtsCell.innerHTML = " N/A ";
    } else if (parsedReim[i][7] != null) {
      rtsCell.innerHTML = parsedReim[i][7];
    }

    if (parsedReim[i][8] == null) {
      rvCell.innerHTML = " N/A ";
    } else if (parsedReim[i][8] != null) {
      rvCell.innerHTML = parsedReim[i][8];
    }
    let anchorCell = document.createElement("a")
    let imgCell = document.createElement("td");

    anchorCell.setAttribute('href', parsedReim[i][9])
    anchorCell.innerText = "Reciept"
    imgCell.appendChild(anchorCell);
    row.appendChild(ridCell);
    row.appendChild(aCell);
    row.appendChild(typeCell);
    row.appendChild(dCell);
    row.appendChild(statusCell);
    row.appendChild(ctsCell);
    row.appendChild(rtsCell);
    row.appendChild(rvCell);
      row.appendChild(imgCell);

    reimbursemenElement.appendChild(row);
    i++;
  }


     // for(i=0; i < reimbursement_obj.reimbursement.length; i++){
     //   if(reimbursement_obj.reimbursement[i].employee_id ){
     //        idToAdd.appendChild
     //   }}
     
     }

async function grab() {
  
  try{
    let res = await fetch(`http://127.0.0.1:8080/login/reimbursement/employee/${employeeId}`) //need to sort by date automatically
    let data = await res.json();
    console.log(data)
    localStorage.setItem("length", data.reimbursement.length);
    localStorage.setItem("reimbursement", JSON.stringify(data.reimbursement));
    
    addReimbursementsToTable();

  }
  catch(err){
    console.log(err)
  }
  }




function addReimbursementsToTablebyStatus(){
  let statusValue = getStatus.options[getStatus.selectedIndex].value

  i=0;
  
 
  if(statusValue == "Status"){
       grab()
      }
  else{
      
       let reimbursement = localStorage.getItem("reimbursement");
       let length = localStorage.getItem("length");
       let parsedReim = JSON.parse(reimbursement);
       reimbursemenElement.innerHTML = "";
     
       i = 0;
       
       while (i <= length) {
         let row = document.createElement("tr");
         let typeCell = document.createElement("td");
         let statusCell = document.createElement("td");
         let dCell = document.createElement("td");
         let idCell = document.createElement("td");
         let ridCell = document.createElement("td");
         let aCell = document.createElement("td");
         let ctsCell = document.createElement("td");
         let rtsCell = document.createElement("td");
         let rvCell = document.createElement("td");
         
     if (parsedReim[i][2] == statusValue){
       console.log(parsedReim[i][2])
         idCell.innerHTML = parsedReim[i][0];
         aCell.innerHTML = "$" + parseFloat(parsedReim[i][1]).toFixed(2);
         statusCell.innerHTML = parsedReim[i][2];
         if (parsedReim[i][3] == "a") {
           typeCell.innerHTML = "Lodging";
         } else if (parsedReim[i][3] == "b") {
           typeCell.innerHTML = "Travel";
         } else if (parsedReim[i][3] == "c") {
           typeCell.innerHTML = "Food";
         } else if (parsedReim[i][3] == "d") {
           typeCell.innerHTML = "Other";
         }
         if (parsedReim[i][4] == "") {
           dCell.innerHTML = "N/A";
         } else if (parsedReim[i][4] != "") {
           dCell.innerHTML = parsedReim[i][4];
         }
         ridCell.innerHTML = parsedReim[i][5];
         ctsCell.innerHTML = parsedReim[i][6];
         if (parsedReim[i][7] == null) {
           rtsCell.innerHTML = " N/A ";
         } else if (parsedReim[i][7] != null) {
           rtsCell.innerHTML = parsedReim[i][8];
         }
     
         if (parsedReim[i][8] == null) {
           rvCell.innerHTML = " N/A ";
         } else if (parsedReim[i][8] != null) {
           rvCell.innerHTML = parsedReim[i][8];
         }
         let anchorCell = document.createElement("a")
         let imgCell = document.createElement("td");
     
         anchorCell.setAttribute('href', parsedReim[i][9])
         anchorCell.innerText = "Reciept"
         imgCell.appendChild(anchorCell);
     
         row.appendChild(ridCell);
         row.appendChild(aCell);
         row.appendChild(typeCell);
         row.appendChild(dCell);
         row.appendChild(statusCell);
         row.appendChild(ctsCell);
         row.appendChild(rtsCell);
         row.appendChild(rvCell);
         row.appendChild(imgCell);
     
         reimbursemenElement.appendChild(row);
         
       }i++;
  }          
}};



function addReimbursementsToTablebytype(){
  let typeValue = getStatus.options[getStatus.selectedIndex].value
  console.log()
  i=0;
  
 
  if(typeElement.value == "type_of"){
       grab()
      }
  else{
      
       let reimbursement = localStorage.getItem("reimbursement");
       let length = localStorage.getItem("length");
       let parsedReim = JSON.parse(reimbursement);
       reimbursemenElement.innerHTML = "";
     
       i = 0;
       
       while (i <= length) {
         let row = document.createElement("tr");
         let typeCell = document.createElement("td");
         let statusCell = document.createElement("td");
         let dCell = document.createElement("td");
         let idCell = document.createElement("td");
         let ridCell = document.createElement("td");
         let aCell = document.createElement("td");
         let ctsCell = document.createElement("td");
         let rtsCell = document.createElement("td");
         let rvCell = document.createElement("td");
         
     if (parsedReim[i][3] == typeElement.value){
         idCell.innerHTML = parsedReim[i][0];
         aCell.innerHTML = "$" + parseFloat(parsedReim[i][1]).toFixed(2);
         statusCell.innerHTML = parsedReim[i][2];
         if (parsedReim[i][3] == "a") {
           typeCell.innerHTML = "Lodging";
         } else if (parsedReim[i][3] == "b") {
           typeCell.innerHTML = "Travel";
         } else if (parsedReim[i][3] == "c") {
           typeCell.innerHTML = "Food";
         } else if (parsedReim[i][3] == "d") {
           typeCell.innerHTML = "Other";
         }
         if (parsedReim[i][4] == "") {
           dCell.innerHTML = "N/A";
         } else if (parsedReim[i][4] != "") {
           dCell.innerHTML = parsedReim[i][4];
         }
         ridCell.innerHTML = parsedReim[i][5];
         ctsCell.innerHTML = parsedReim[i][6];
         if (parsedReim[i][7] == null) {
           rtsCell.innerHTML = " N/A ";
         } else if (parsedReim[i][7] != null) {
           rtsCell.innerHTML = parsedReim[i][8];
         }
     
         if (parsedReim[i][8] == null) {
           rvCell.innerHTML = " N/A ";
         } else if (parsedReim[i][8] != null) {
           rvCell.innerHTML = parsedReim[i][8];
         }
         let anchorCell = document.createElement("a")
         let imgCell = document.createElement("td");
     
         anchorCell.setAttribute('href', parsedReim[i][9])
         anchorCell.innerText = "Reciept"
         imgCell.appendChild(anchorCell);
         row.appendChild(ridCell);
         row.appendChild(aCell);
         row.appendChild(typeCell);
         row.appendChild(dCell);
         row.appendChild(statusCell);
         row.appendChild(ctsCell);
         row.appendChild(rtsCell);
         row.appendChild(rvCell);
           row.appendChild(imgCell);
     
         reimbursemenElement.appendChild(row);
         
       }i++;}
       let setId = new Set(allId)
       let ids = Array.from(setId)
  }    
     
      }

  