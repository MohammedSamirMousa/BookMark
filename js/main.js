// Vars
var siteName = document.getElementById("name");
var siteUrl = document.getElementById("URL");
var arrayOfSites = [];
// Vars

// LocalStorage
if (localStorage.getItem("data")) {
  arrayOfSites = JSON.parse(localStorage.getItem("data"));
  display();
}
// LocalStorage

// addData
function addData() {
  if (validSiteName() == true && validSiteUrl() == true) {
    var userInput = {
      name: siteName.value,
      url: siteUrl.value,
    };
    arrayOfSites.push(userInput);
    localStorage.setItem("data", JSON.stringify(arrayOfSites));
    clearData();
    display();
  }else{
    Swal.fire({
      icon: "error",
      title: "Site Name or Url is not valid, Please follow the rules below :",
      text: "Site name Or Site URL must be a valid",
    });
  }
}
// addData

// clearData
function clearData() {
  siteName.value = "";
  siteUrl.value = "";
}
// clearData

// display
function display() {
  var dataFromHtml = "";
  for (i = 0; i < arrayOfSites.length; ++i) {
    dataFromHtml += `
    <tr>
      <td>${i + 1}</td>
      <td>${arrayOfSites[i].name}</td>
      <td><a href="https://${
        arrayOfSites[i].url
      }" class="btn btn-success text-decoration-none" target="_blank">Visit</a></td>
      <td><button class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
    </tr>
    `;
  }
  document.getElementById("table").innerHTML = dataFromHtml;
}
// display

// deleteData
function deleteData(index) {
  arrayOfSites.splice(index, 1);
  localStorage.setItem("data", JSON.stringify(arrayOfSites));
  display();
}
// deleteData

// Valid Name
function validSiteName() {
  var regex = /^([A-Z]|[a-z]){3,}/;
  if (regex.test(siteName.value) == true) {
    document.getElementById("validError").classList.replace("d-block" , "d-none")
    return true;
  } else {
    document.getElementById("validError").classList.replace("d-none" , "d-block")
    return false;
  }
}
// Valid Name

// Valid URL
function validSiteUrl() {
  var regex =
    /^(https?:\/\/)?([a-zA-Z0-9.-]+)(\.[a-zA-Z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/;
  if (regex.test(siteUrl.value) == true) {
    document.getElementById("validErrorUrl").classList.replace("d-block" , "d-none")

    return true;
  } else {
    document.getElementById("validErrorUrl").classList.replace("d-none" , "d-block")
    return false;
  }
}
// Valid URL