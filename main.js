let login1 = document.getElementById('login').value;
let password1 = document.getElementById('password').value;
let email1 = document.getElementById('email').value;
let passLogin = /^[a-zA-Z]{4,16}$/;
document.getElementById('login').oninput = function () {
    if (passLogin.test(login1)) {
        document.getElementById('login').classList.add('green');
        document.getElementById('login').classList.remove('red');
        ableButton();
    }
    else {
        document.getElementById('login').classList.add('red');
        document.getElementById('login').classList.remove('green');
    }
};
let passPassword = /^[a-z0-9\-._]{4,16}$/;
document.getElementById('password').oninput = function () {
    if (passPassword.test(password1)) {
        ableButton();
        document.getElementById('password').classList.add('green');
        document.getElementById('password').classList.remove('red');
    }
    else {
        document.getElementById('password').classList.add('red');
        document.getElementById('password').classList.remove('green');
    }
};
let passEmail = /^[a-z0-9\-.]+@[a-z]+\.[a-z]+$/;
document.getElementById('email').oninput = function () {
    if (passEmail.test(email1)) {
        ableButton();
        document.getElementById('email').classList.add('green');
        document.getElementById('email').classList.remove('red');
    }
    else {
        document.getElementById('email').classList.add('red');
        document.getElementById('email').classList.remove('green');
    }
};
let user;
let userMassive = [];
document.getElementById('add-user').onclick = function addUser() {
    if ((passLogin.test(login1) && (passPassword.test(password1)) && (passEmail.test(email1)))) {
        ableButton();
        user = {
            login: login1,
            password: password1,
            email: email1
        };
        userMassive.push(user);
        login1 = '';
        password1 = '';
        email1 = '';
        document.getElementById('login').classList.remove('green');
        document.getElementById('password').classList.remove('green');
        document.getElementById('email').classList.remove('green');
        render();
    }
};
function render() {
    document.querySelector('tbody').innerHTML = '';
    for (let i = 0; i < userMassive.length; i++) {
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${i + 1}</td>
        <td>${userMassive[i].login}</td>
        <td>${userMassive[i].password}</td>
        <td>${userMassive[i].email}</td>
        <td><input type='button' class = 'editBtn btn edit' id = 'editBtn' name = 'edit' value = 'Edit'></td>
        <td><input type='button' class = 'deleteBtn btn delete' id = 'deleteBtn' name = 'delete' value = 'Delete'></td>`;
        document.getElementById('users-list').append(row);
    }
}
document.querySelector('tbody').onclick = (event) => event.target.classList.contains('edit') ? editUser(event) :
    event.target.classList.contains('delete') ? deleteUser(event) :
        0;
function deleteUser(event) {
    let index = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
    userMassive.splice(index, 1);
    render();
}
let userIndex;
let edit;
function editUser(event) {
    userIndex = event.target.parentElement.parentElement.firstElementChild.textContent - 1;
    edit = userMassive[userIndex];
    login1 = edit.login;
    password1 = edit.password;
    email1 = edit.email;
    document.getElementById('add-user').setAttribute("hidden", "true");
    document.getElementById('edit-user').setAttribute("hidden", "false");
}
document.getElementById('edit-user').onclick = function saveEditUser() {
    if (passLogin.test(login1) && passPassword.test(password1) && passEmail.test(email1)) {
        ableButton();
        edit.login = login1;
        edit.password = password1;
        edit.email = email1;
        document.getElementById('add-user').setAttribute("hidden", "false");
        document.getElementById('edit-user').setAttribute("hidden", "true");
        login1 = "";
        password1 = "";
        email1 = "";
        document.getElementById('login').classList.remove('green');
        document.getElementById('password').classList.remove('green');
        document.getElementById('email').classList.remove('green');
        render();
    }
};
function ableButton() {
    let testAdd = document.getElementById("add-user");
    let testEdit = document.getElementById("edit-user");
    if (passLogin.test(login1) && passPassword.test(password1) && passEmail.test(email1)) {
        testAdd.setAttribute("disabled", "false");
        testEdit.setAttribute("disabled", "false");
    }
    else {
        testAdd.setAttribute("disabled", "true");
        testEdit.setAttribute("disabled", "true");
    }
}
