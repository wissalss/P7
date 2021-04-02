const elt = document.getElementById('submit');
const token = 'Bearer ' + sessionStorage.getItem('token')

document.getElementById('submit-new-post').addEventListener('submit', async(e) => {
    e.preventDefault()
    var inputTitle = document.getElementById("title");
    var inputText = document.getElementById("texte");
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

    if (checkForm) {

        var data = new FormData();
        var post = {
            by: sessionStorage.getItem("UserName"),
            title: inputTitle.value,
            text: inputText.value,
            UserId: sessionStorage.getItem("userId")
        };

        data.append("post", JSON.stringify(post));
        data.append("imageurl", inputImageURL.files[0]);

        const response = await fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: data
        })

        if (response.status == 201) {
            alert('Post créé ')
            window.location.reload()
        } else {
            alert('Erreur ' + response.status + '. Veuillez réessayer')
        }

    }



});

//Get post data

const getPostData = async() => {
    const response = await fetch('http://localhost:3000/api/posts', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const posts = await response.json()
    if (response.status == 200) {
        for (let i = posts.length; i > 0; i--) {
            displayPosts(posts[i - 1]);
        }
    } else {
        alert('Erreur ' + response.status + '. Veuillez réessayer')
    }
}
getPostData();

/**
 * @param {number} post index of a post in an array of posts
 */
function displayPosts(post) {
    let target = document.getElementById('posts');
    target.innerHTML +=
        `<div class="post">
        <div class="post_card">
        <div class="post__header">
            <a class="postheader" href="profile.html?userId=${post.userId}">${post.by}</a>
            <a class="postheader" onclick="deletePost(${post.id})"><i class="fas fa-trash-alt"></i></a>
        </div>
        <div class="post__content">
        <p>${post.title}</p>
            <p>${post.texte}</p>
            <img class="post__content__img" src="${post.imageUrl}">
        </div>
        </div>
    </div>`
}

/**
 * deletePost() allows you to delete from the server a post with a specific ID
 * @param {number} postId id of a post
 */
async function deletePost(postId) {
    const response = await fetch('http://localhost:3000/api/posts/' + postId, {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
    if (response.status == 200) {
        window.location.reload()
    } else {
        alert('Erreur ' + response.status + '. Can not delete post')
    }
}