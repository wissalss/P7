const elt = document.getElementById('submit');
if (localStorage.getItem("Token")) {

    elt.addEventListener('click', function() {

        var inputTitle = document.getElementById("title");
        var inputText = document.getElementById("text");
        var inputImageURL = document.getElementById("imageurl");


        let post = JSON.stringify({
            by: localStorage.getItem("UserName"),
            title: inputTitle.value,
            texte: inputText.value,
            UserId: localStorage.getItem("userId")
        })

        const data = new FormData()
        data.append("post", post);
        data.append("imageUrl", inputImageURL.files[0]);

        request("posts", 201, "POST", data, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function(data) {
            window.location.assign("index.html");
        }).catch((error) => {
            console.log(error);
        });

    });
}