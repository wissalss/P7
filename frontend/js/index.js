// Ce code affiche les articles postés sur la BDD avec une requete GET

request("posts", 200, "GET", null, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function(data) {
    for (let post of data) {
        const card = document.createElement("div");
        card.setAttribute("class", "card col-9 col-lg-6 mb-3");


        const h4 = document.createElement("h4");
        h4.setAttribute("class", "mt-2");
        var date = new Date(Date.parse(post.createdAt));
        h4.innerHTML = post.by + ", le " + date.toLocaleDateString();
        card.appendChild(h4);


        const h2 = document.createElement("h2");
        h2.setAttribute("class", "card-title mt-1");
        h2.innerHTML = post.title; //Titre du post
        card.appendChild(h2);

        const p = document.createElement("p");
        p.setAttribute("class", "card-text");
        p.innerHTML = post.texte; //Texte du post
        card.appendChild(p);

        const img = document.createElement("img");
        img.setAttribute("src", post.imageUrl); //Image du post
        img.setAttribute("class", "card-img-top mt-1 mb-3");
        img.setAttribute("alt", "Image liée à l'article");
        card.appendChild(img);

        const list = document.getElementById("listPosts");
        list.appendChild(card);

        if (localStorage.getItem("userId") == post.userId) {

            const divbutton = document.createElement("div");
            divbutton.setAttribute("class", "mb-3 btndiv");
            card.appendChild(divbutton);

            const delpost = document.createElement("button");
            delpost.setAttribute("id", "delpost" + post.id); // Bouton supprimer
            delpost.setAttribute("class", " postsupp col-6");
            delpost.innerHTML = "Supprimer ";
            divbutton.appendChild(delpost);

            const modpost = document.createElement("button");
            modpost.setAttribute("class", " postmod col-6");
            modpost.addEventListener("click", function() {
                localStorage.setItem("title", post.title);
                localStorage.setItem("texte", post.texte);
                localStorage.setItem("postUserId", post.userId);
                window.location.assign("modpost.html?id=" + post.id);
            })
            modpost.innerHTML = "Modifier";
            divbutton.appendChild(modpost);

            const del = document.getElementById('delpost' + post.id);
            del.addEventListener('click', function() {
                request("posts/" + post.id, 200, "DELETE", null, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function(data) {
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                })
            });

        }
        isAdmin = localStorage.getItem("isAdmin");

        if (localStorage.getItem("isAdmin") == "true") {

            const divbutton = document.createElement("div");
            divbutton.setAttribute("class", "mb-3 btndiv");
            card.appendChild(divbutton);

            const delpost = document.createElement("button");
            delpost.setAttribute("id", "delpost" + post.id); // Bouton supprimer
            delpost.setAttribute("class", " postsupp col-6");
            delpost.innerHTML = "Supprimer ";
            divbutton.appendChild(delpost);


            const del = document.getElementById('delpost' + post.id);
            del.addEventListener('click', function() {
                request("posts/" + post.id, 200, "DELETE", null, [{ key: "Authorization", value: "Bearer " + localStorage.getItem("Token") }]).then(function(data) {
                    window.location.reload();
                }).catch((error) => {
                    console.log(error);
                })
            });

        }


        const divcoms = document.createElement("div");
        divcoms.setAttribute("id", "coms");

        const comstitle = document.createElement("h5");
        comstitle.innerHTML = "Commentaires";
        divcoms.appendChild(comstitle);

        card.appendChild(divcoms);

        if (localStorage.getItem("Token")) {

            const group = document.createElement("div");
            group.setAttribute("class", "input-group mb-3");

            const labelcoms = document.createElement("label");
            labelcoms.setAttribute("class", "labelstyle");
            labelcoms.setAttribute("for", "com");
            labelcoms.innerHTML = "Commentaire :"


            const postcom = document.createElement("input");
            postcom.setAttribute("id", "com");
            postcom.setAttribute("type", "text");
            postcom.setAttribute("name", "com");
            postcom.setAttribute("data-id", post.id);
            postcom.setAttribute("class", "form-control input-com");
            postcom.setAttribute("placeholder", "Commentaire...");

            labelcoms.appendChild(postcom);
            group.appendChild(labelcoms);

            const groupbtn = document.createElement("div");
            groupbtn.setAttribute("class", "input-group-append");

            const postcomsub = document.createElement("button");
            postcomsub.setAttribute("class", "btn btn-outline-secondary sendcom");
            postcomsub.setAttribute("type", "button");
            postcomsub.setAttribute("data-id", post.id);
            postcomsub.innerHTML = "Envoyer";
            groupbtn.appendChild(postcomsub);
            group.appendChild(groupbtn);

            divcoms.appendChild(group);


        };

        const comslist = document.createElement("div");
        comslist.setAttribute("id", "comslist");
        for (let com of post.Coms) {


            const div = document.createElement('div');

            const by = document.createElement('p');
            by.setAttribute("class", "titlecom");
            var date = new Date(Date.parse(com.createdAt));
            by.innerHTML = "Réponse de " + com.by + " :";
            div.appendChild(by);

            const text = document.createElement('p');
            text.innerHTML = com.text;
            div.appendChild(text);



            comslist.appendChild(div);
        };
        card.appendChild(comslist);

    }
    prepareCom();
});