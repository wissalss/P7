//Get coms data

const getComsData = async() => {
    const response = await fetch('http://localhost:3000/api/coms', {
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const coms = await response.json()
    if (response.status == 200) {
        for (let i = coms.length; i > 0; i--) {
            displayComs(coms[i - 1]);
        }
    } else {
        alert('Erreur ' + response.status + '. Can not display coms')
    }
}
getComsData();

/**
 * @param {number} coms index of a post in an array of posts
 */
function displayComs(coms) {
    let comms = document.getElementById('coms');
    comms.innerHTML +=
        `<div class="com">
        <div class="com_card">
        <div class="com__header">
            <a class="comheader" href="profile.html?userId=${coms.userId}">${coms.by}</a>
            <a class="comheader" onclick="deletePost(${coms.id})"><i class="fas fa-trash-alt"></i></a>
        </div>
        <div class="post__content">
            <p>${coms.text}</p>
        </div>
        </div>
    </div>`
}