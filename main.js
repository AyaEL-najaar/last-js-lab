var xhr = new XMLHttpRequest();
var tbody = document.getElementById("tbody");
var fetchUserDataBtn = document.getElementById("btn");
var url = "https://jsonplaceholder.typicode.com/users";
var Userids = [];



function deletrow(event) {
  var button = event.target;
  var row = button.closest("tr");
  var userId = row.dataset.userid;
  var index = Userids.indexOf(userId);
  if (index !== -1) {
    Userids.splice(index, 1);
  }
  row.remove();
}

function viewrow(user) {
  document.cookie = `selectedUser=${JSON.stringify(user)}; path=/`;
  window.location.href = "lab5.2.html";
  
}var speial = JSON.parse(decodeURIComponent(getCookie("selectedUser")));
if (window.location.pathname.includes("lab5.2.html")) {
  window.addEventListener("DOMContentLoaded", function () {
    var userCookie = getCookie("selectedUser");
    if (userCookie) {
      var speial = JSON.parse(decodeURIComponent(userCookie));
      displaycard(speial);
    }
  });
}

function displaycard(user)
{
    var messageDiv = document.getElementById("message");
  if (messageDiv) {
    messageDiv.innerHTML = `
      <img src="${user.img}" style="display: block; margin: 0 auto; border-radius: 50%; width: 150px; height: 150px;"><br>
        <h2 style="text-align: center;">${user.username}</h2>
        <p style="text-align: center;">Email: ${user.email}</p>
        <p style="text-align: center;">Phone: ${user.phone}</p>
        <p style="text-align: center;">Website: ${user.website}</p>
    `;
  }
      
}
function getCookie(name) {
  var cookies = document.cookie.split("; ");
  for (var i = 0; i < cookies.length; i++) {
    var parts = cookies[i].split("=");
    if (parts[0] === name) {
      return parts[1];
    }
  }
  return null;
}

function display(users) {
  tbody.innerHTML = ""; // clear old data
  for (var i = 0; i < users.length; i++) {
    var user = users[i];

    var row = document.createElement("tr");
    row.dataset.userid = user.id;

    var id = document.createElement("td");
    id.textContent = user.id;
    Userids.push(user.id);

    var img = document.createElement("td");
    var image = document.createElement("img");
    image.src = `https://i.pravatar.cc/100?img=${i + 1}`;
    image.style.width = "50px";
    image.style.borderRadius = "50%";
    img.appendChild(image);

    var username = document.createElement("td");
    username.textContent = user.username;

    var email = document.createElement("td");
    email.textContent = user.email;

    var phone = document.createElement("td");
    phone.textContent = user.phone;

    var website = document.createElement("td");
    website.textContent = user.website;

    var action = document.createElement("td");

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", deletrow);

    var viewBtn = document.createElement("button");
    viewBtn.textContent = "View";
    viewBtn.addEventListener("click",(function(u) {
  viewBtn.addEventListener("click", function() {
    viewrow(u);
  });
})(user));

    action.appendChild(deleteBtn);
    action.appendChild(viewBtn);
  
    row.append(id, img, username, email, phone, website, action);
    tbody.appendChild(row);
  }
}

function fetchdata() {
   
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4 && xhr.status == 200) {
      var users = JSON.parse(xhr.responseText);
      document.cookie = `users=${JSON.stringify(users)}; path=/`;
      display(users);
    }
  };
  xhr.open("GET", url);
  xhr.send();
}
function end() {
  var saved = getCookie("users");
  if (saved) {
    var users = JSON.parse(saved);
    display(users);
  } else {
    fetchdata();
  }
}
