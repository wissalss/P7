const profile = document.getElementById("profile");
var param = new URLSearchParams(window.location.search);
var id = param.get("id");

profile.addEventListener('click', function() {
    window.location.assign("profile.html?id=" + localStorage.getItem("userId"));
});