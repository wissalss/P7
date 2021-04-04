const elt = document.getElementById('submit');


elt.addEventListener('click', function() {

    var inputuserName = document.getElementById("userName");
    var inputEmail = document.getElementById("email");
    var inputPass = document.getElementById("password");
    var checkForm = true;

    inputuserName.classList.remove("error");
    inputEmail.classList.remove("error");
    inputPass.classList.remove("error");


    if (!inputuserName.checkValidity()) {
        checkForm = false;
        inputuserName.classList.add("error");
    }

    if (!inputEmail.checkValidity()) {
        checkForm = false;
        inputEmail.classList.add("error");
    }

    if (!inputPass.checkValidity()) {
        checkForm = false;
        inputPass.classList.add("error");
    }

    if (checkForm) {
        var user = {
            userName: inputuserName.value,
            email: inputEmail.value,
            password: inputPass.value
        };

        request("auth/signup", 201, "POST", JSON.stringify(user), [{ key: "Content-Type", value: "application/json" }]).then(function(data) {
            localStorage.setItem("Token", data.token);
            localStorage.setItem("userId", data.userId);
            localStorage.setItem("isAdmin", data.isAdmin);
            localStorage.setItem("UserName", data.userName);
            window.location.assign("index.html");
        }).catch((error) => {
            console.log(error);
        });
    }



});