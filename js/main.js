// To get the elements from the index
var siteName = document.getElementById("name");
var siteUrl = document.getElementById("URL");
var closeBtn = document.getElementById("btnClose");
var boxModal = document.getElementById("box");

//To avoid overriding data
var arrayOfData = [];

function run() {
  clear();
  display();
}
// To get values from the user
function addData() {
  // to make validation
  if (validName() == true && validUrl() == true) {
    var userInput = {
      name: siteName.value,
      url: siteUrl.value,
    };
    // To push the data into the array. If we don't use an array, the new data will override the previous one
    arrayOfData.push(userInput);
    // Save the user data in local storage after submission
    localStorage.setItem("data", JSON.stringify(arrayOfData));
    run();
  } else {
    boxModal.classList.replace("d-none", "d-block");
    close();
  }
}

function clear() {
  // Clear inputs after submitting data
  siteName.value = "";
  siteUrl.value = "";
}

function display() {
  // Display data entered by the user
  var dataFromIndexHtml = "";
  for (i = 0; i < arrayOfData.length; ++i) {
    dataFromIndexHtml += `<tr>
                            <td>${1 + i}</td>
                            <td>${arrayOfData[i].name}</td>
                            <td><a href="${arrayOfData[i].url}" target="_blank"
                                    class="btn btn-success text-decoration-none">Visit</a></td>
                            <td><button class="btn btn-danger" onclick="deleteData(${i})">Delete</button></td>
                        </tr>`;
  }
  document.getElementById("table").innerHTML = dataFromIndexHtml;
  // Display data entered by the user
}

// This function is used to create a delete button
function deleteData(index) {
  arrayOfData.splice(index, 1);
  display();
  // Save the updated data in local storage after deletion
  localStorage.setItem("data", JSON.stringify(arrayOfData));
}

// To store data persistently in local storage
if (localStorage.getItem("data")) {
  arrayOfData = JSON.parse(localStorage.getItem("data"));
  display();
}

// This function validates the site name and URL
function validName() {
  var regex = /([A0-Z9]|[a0-z9]){3,}/;
  if (regex.test(siteName.value) == true) {
    document
      .getElementById("validError")
      .classList.replace("d-block", "d-none");
    return true;
  } else {
    document
      .getElementById("validError")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

function validUrl() {
  var regex =
    /(http(s)?:\\.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\\=]*)/;
  if (regex.test(siteUrl.value) == true) {
    document
      .getElementById("validErrorUrl")
      .classList.replace("d-block", "d-none");

    return true;
  } else {
    document
      .getElementById("validErrorUrl")
      .classList.replace("d-none", "d-block");
    return false;
  }
}

// This function creates the close button functionality
function close() {
  closeBtn.addEventListener("click", function () {
    // Close the popup by selecting the box element
    boxModal.classList.add("d-none");
  });
}
