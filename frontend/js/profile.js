const token = 'Bearer ' + sessionStorage.getItem('token')

//Display user information
const params = new URLSearchParams(document.location.search)
const paramValue = params.get('userId')
fetch('http://localhost:3000/api/auth/' + paramValue, {
        headers: { 'Authorization': token }
    })
    .then(response => response.json())

.then(User => {
    let profileHtml = document.getElementById("userTarget");
    profileHtml.innerHTML +=
        `<div class="user">
        <div class="user__header">
        <p class="user__header__name">${User.userName}</p>
        </div>
        <div class="user__infos">
            <h2 class="user__infos__title">Infos</h2>
            <div class="user__infos__content">
                <p class="user__infos__content__key">Adresse e-mail</p>
                <p class="user__infos_content__value">${User.email}</p>
            </div>
        </div>
    </div>`;

})
document.getElementById('btn_updateUser').addEventListener('click', function(e) {
    e.preventDefault();

    //Display the form to modify user information
    let formUserTarget = document.getElementById('formUserTarget')
    formUserTarget.innerHTML +=
        `<div class="update-user">
        <form id="modifyUserForm">
            <input type="text" id="user_Name" class="modifyForm" name="user_Name" placeholder="Votre nouveau nom">
            <input type="text" id="user_email" class="modifyForm" name="user_email" placeholder="Votre nouvel email">
            <div>
                <input type="submit" value="Modifier">
                <button id="update-user-form-cancelled-btn">Annuler</button>
            </div>
        </form>
    </div>`

    //Update user from database
    document.getElementById('modifyUserForm').addEventListener('submit', async(e) => {
        e.preventDefault()
        let data = JSON.stringify({
            userName: document.getElementById('user_Name').value,
            email: document.getElementById('user_email').value,

        })

        const response = await fetch('http://localhost:3000/api/auth/' + sessionStorage.getItem('userId'), {
            method: 'PUT',
            headers: {
                'Authorization': token
            },
            body: data
        })
        if (response.status == 201) {
            window.location.reload()
        } else {
            alert('Erreur ' + response.status + '. Veuillez réessayer')
        }
    })

    //Cancel form update user
    document.getElementById('update-user-form-cancelled-btn').addEventListener('click', function() {
        window.location.reload()
    })
})

//Delete user from database
document.getElementById('btn_deleteUser').addEventListener('click', async(e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/api/auth/' + sessionStorage.getItem('userId'), {
        method: 'DELETE',
        headers: {
            'Authorization': token
        }
    })
    if (response.status == 200) {
        sessionStorage.clear()
        window.location = 'signup.html'
    } else {
        alert('Erreur ' + response.status + '. Veuillez réessayer')
    }
})