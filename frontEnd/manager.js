let logoutBtn = document.querySelector("#logout");
let reimbursemenElement = document.querySelector("#reimbursement-table tbody");
let getStatus = document.getElementById("status");
let employeeElement = document.querySelector("#employee_id_box");
let typeElement = document.getElementById("re-type");
let logoutElement = document.getElementById("logout");
let newNav = document.getElementById("navbar_logo");
let submitBtn = document.getElementById("submit");
// let x = document.getElementById("changer")
let ao = document.querySelector("body");
let populate = document.getElementById("populate");
populate.addEventListener("click", grab);

document.addEventListener("DOMContentLoaded", addReimbursementsToTable);

document.addEventListener("DOMContentLoaded", loginstatus);

employeeElement.addEventListener("change", addReimbursementsToTablebyId);

typeElement.addEventListener("change", addReimbursementsToTablebytype);

getStatus.addEventListener("change", addReimbursementsToTablebyStatus);

logoutElement.addEventListener("click", logout);

document.addEventListener("change", approval);

let emids = localStorage.getItem("ids");

function loginstatus() {
  if (localStorage.length == 0) {
    window.location.href = "/frontEnd/login.html";
  }
}

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

function approval() {
  console.log(ao.value);

  let toParse = localStorage.getItem("reimbursement");
  let reimbursement = JSON.parse(toParse);
  let length = localStorage.getItem("length");
  let rid = document.getElementById("reimbursement");
  let eid = localStorage.getItem("employee");
  let newStatus = "";
  let rdBtn = document.getElementsByName("approval");
  console.log(rid.value);
  let found = false;
  for (i = 0; i < length; i++) {
    if (rid.value == reimbursement[i][5]) {
      found = true;
    }
  }

  for (i = 0; i < rdBtn.length; i++) {
    if (rdBtn[0].checked) {
      newStatus = "Approved";
    } else if (rdBtn[1].checked) {
      newStatus = "Denied";
    }
  }

  if (found == false || newStatus == "") {
    if (found == false && newStatus == "") {
      alert(
        "Please select a valid Reimbursement \nPlease select to Approve or Deny"
      );
    } else if (found == false && newStatus == "") {
      alert("Please select to Approve or Deny");
    } else if (found == true && newStatus != "") {
      alert("Please select a valid Reimbursement");
    }
  }
  if (found == true && newStatus != "") {
    fetch(`http://127.0.0.1:8080/login/reimbursement/status-change`, {
      'method': 'PUT',
      'credentials': 'include',
      'headers': {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reimbursement_id: rid.value,
        resolver_id: eid,
        status: newStatus,
      }),
    }),
      fetch("http://127.0.0.1:8080/login/reimbursement/manager/status") //need to sort by date automatically
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          localStorage.removeItem("reimbursement");
          localStorage.setItem(
            "reimbursement",
            JSON.stringify(data.reimbursement)
          );
          localStorage.setItem("length", data.reimbursement.length);

          addReimbursementsToTable();
        })
        .catch((err) => {
          console.log(err);
        });
  } else {
    console.log("null");
    return null;
  }
}

function addReimbursementsToTable() {
  let reimbursement = localStorage.getItem("reimbursement");
  let length = localStorage.getItem("length");
  let parsedReim = JSON.parse(reimbursement);
  reimbursemenElement.innerHTML = "";
  let allId = [];

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
    let setCount = 0;
    let anchorCell = document.createElement("a");
    let imgCell = document.createElement("td");

    idCell.innerHTML = parsedReim[i][0];
    allId[i] = parsedReim[i][0];
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
      let approvalOption = document.createElement("select");
      let ao = document.getElementById("ao");
      approvalOption.setAttribute("statusChange", "statusChange");
      let option1 = new Option("Select");
      approvalOption.add(option1, undefined);

      let a = new Option("Approve");
      approvalOption.add(a, undefined);

      let d = new Option("Deny");
      approvalOption.add(d, undefined);
      // rvCell.appendChild(approvalOption)
      rvCell.innerHTML = "N/A";
    } else if (parsedReim[i][8] != null) {
      rvCell.innerHTML = parsedReim[i][8];
    }

    anchorCell.setAttribute("href", parsedReim[i][9]);
    anchorCell.innerText = "Reciept";
    imgCell.appendChild(anchorCell);

    row.appendChild(idCell);
    row.appendChild(ridCell);
    row.appendChild(aCell);
    row.appendChild(typeCell);
    row.appendChild(dCell);
    row.appendChild(statusCell);
    row.appendChild(ctsCell);
    row.appendChild(rtsCell);
    row.appendChild(rvCell);
    //   row.appendChild(imgName);
    row.appendChild(imgCell);

    reimbursemenElement.appendChild(row);
    i++;
  }
  let setId = new Set(allId);
  let ids = Array.from(setId);

  for (i = 0; i < setId.size; i++) {
    let newOption = new Option(ids[i]);
    employeeElement.add(newOption, undefined);
  }
}

function grab() {
  fetch("http://127.0.0.1:8080/login/reimbursement/manager/status") //need to sort by date automatically
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      localStorage.setItem("reimbursement", JSON.stringify(data.reimbursement));
      localStorage.setItem("length", data.reimbursement.length);
      addReimbursementsToTable();
    })
    .catch((err) => {
      console.log(err);
    });
}

function addReimbursementsToTablebyStatus() {
  let statusValue = getStatus.options[getStatus.selectedIndex].value;

  i = 0;

  if (statusValue == "Status") {
    grab();
  } else {
    let reimbursement = localStorage.getItem("reimbursement");
    let length = localStorage.getItem("length");
    let parsedReim = JSON.parse(reimbursement);
    reimbursemenElement.innerHTML = "";
    let allIds = [];
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

      if (parsedReim[i][2] == statusValue) {
        console.log(parsedReim[i][2]);
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
        let anchorCell = document.createElement("a");
        let imgCell = document.createElement("td");

        anchorCell.setAttribute("href", parsedReim[i][9]);
        anchorCell.innerText = "Reciept";
        imgCell.appendChild(anchorCell);

        row.appendChild(idCell);
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
      }
      i++;
    }
  }
}

function addReimbursementsToTablebytype() {
  let typeValue = getStatus.options[getStatus.selectedIndex].value;
  console.log();
  i = 0;

  if (typeElement.value == "type_of") {
    grab();
  } else {
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

      if (parsedReim[i][3] == typeElement.value) {
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
        let anchorCell = document.createElement("a");
        let imgCell = document.createElement("td");

        anchorCell.setAttribute("href", parsedReim[i][9]);
        anchorCell.innerText = "Reciept";
        imgCell.appendChild(anchorCell);

        row.appendChild(idCell);
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
      }
      i++;
    }
    let setId = new Set(allId);
    let ids = Array.from(setId);
  }

  for (i = 0; i < setId.size; i++) {
    let newOption = new Option(ids[i]);
    employeeElement.add(newOption, undefined);

    //
  }
}

function addReimbursementsToTablebyId() {
  i = 0;

  if (employeeElement.value == "Employee ID") {
    grab();
  } else {
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

      if (parsedReim[i][0] == employeeElement.value) {
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

        let anchorCell = document.createElement("a");
        let imgCell = document.createElement("td");

        anchorCell.setAttribute("href", parsedReim[i][9]);
        anchorCell.innerText = "Reciept";
        imgCell.appendChild(anchorCell);

        row.appendChild(idCell);
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
      }
      i++;
    }
  }
}












