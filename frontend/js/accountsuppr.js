const suppr = document.getElementById("suppr");
var param = new URLSearchParams(window.location.search);
var id = param.get("id");

suppr.addEventListener('click', function() {
    window.location.assign("suppr.html?id=" + localStorage.getItem("userId"));
});

