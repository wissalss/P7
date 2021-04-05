function prepareCom() {
    const sendcom = document.getElementsByClassName("sendcom");
    for (let button of sendcom) {
        button.addEventListener('click', function() {

            const cominput = document.querySelector(`.input-com[data-id='${this.dataset["id"]}']`);


            var data = {
                com: {
                    PostId: this.dataset["id"],
                    UserId: localStorage.getItem("userId"),
                    by: localStorage.getItem("UserName"),
                    text: cominput.value
                }
            };

            request("coms", 201, "POST", JSON.stringify(data), [{ key: "Content-Type", value: "application/json" }, { key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function(data) {
                window.location.assign("index.html");
            }).catch((error) => {
                console.log(error);
            });
        })
    }

}