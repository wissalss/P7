//Log in the application
document.getElementById('signin-form').addEventListener('submit', async(e) => {
    e.preventDefault()
    let data = JSON.stringify({
        email: this.inp_signin_email.value,
        password: this.inp_signin_password.value
    })
    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: data
    })
    let apiData = await response.json()
    if (response.status == 200) {
        sessionStorage.setItem('token', apiData.token)
        sessionStorage.setItem('userId', apiData.userId)
        sessionStorage.setItem("UserName", apiData.userName);
        window.location = 'wall.html'
    } else {
        alert('Erreur ' + response.status + '. Veuillez réessayer')
    }
})