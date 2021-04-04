const elt = document.getElementById('submit');


elt.addEventListener('click', function() {

    var inputTitle = document.getElementById("title");
    var inputText = document.getElementById("text");
    var inputImageURL = document.getElementById("imageurl");
    var checkForm = true;

    if (!inputTitle.reportValidity()) {
        checkForm = false;
    }

    if (!inputText.reportValidity()) {
        checkForm = false;
    }

    if (!inputImageURL.reportValidity()) {
        checkForm = false;
    }
    const userId = localStorage.getItem("userId")
    if (checkForm) {

        let postobj = JSON.stringify({
            by: localStorage.getItem("UserName"),
            title: inputTitle.value,
            texte: inputText.value,
            UserId: localStorage.getItem('userId'),
        })

        const data = new FormData();

        data.append("post", postobj);
        data.append("imageurl", inputImageURL.files[0]);

        request("posts", 201, "POST", data, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function(data) {
            window.location.assign("index.html");
        }).catch((error) => {
            console.log(error);
        });
    }



});