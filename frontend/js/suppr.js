const oui = document.getElementById("oui");
const non = document.getElementById("non");

oui.addEventListener('click', function() {
    request("auth/" + id, 200, "DELETE", null, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function(data) {
        localStorage.removeItem("Token");
        localStorage.removeItem("userId");
        localStorage.removeItem("isAdmin");
        localStorage.removeItem("UserName");
        window.location.assign("index.html");
    }).catch((error) => {
        console.log(error);
    });
});

non.addEventListener('click', function() {
    window.location.assign("index.html");
});