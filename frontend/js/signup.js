//Create new user
document.getElementById('signup-form').addEventListener('submit', async(e) => {
    e.preventDefault()
    let data = JSON.stringify({
        userName: this.inp_signup_userName.value,
        email: this.inp_signup_email.value,
        password: this.inp_signup_password.value
    })
    const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    if (response.status == 201) {
        alert('Utilisateur créé. Vous pouvez vous connecter.')
        window.location.reload()
    } else {
        alert('Erreur ' + response.status + '. Veuillez réessayer')
    }
})