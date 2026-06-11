document.getElementById('togglePass').addEventListener('click', function() {
const passInput = document.getElementById('password');

if (passInput.type === 'password') {
    passInput.type = 'text';
    this.textContent = 'Hide';
} else {
    passInput.type = 'password';
    this.textContent = 'Show';
}

});

document.getElementById('loginForm').addEventListener('submit', async function(e) {
e.preventDefault();

const username = document.getElementById('username').value;
const password = document.getElementById('password').value;

try {

    const response = await fetch(
        'https://blood-donor-production-fbeb.up.railway.app/api/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        }
    );

    const result = await response.json();

    if (response.ok) {

        localStorage.setItem(
            'hospitalUser',
            JSON.stringify({
                username: username
            })
        );

        window.location.href = 'dashboard.html';

    } else {

        alert(result.message || 'Invalid Credentials');

    }

} catch (error) {

    console.error(error);
    alert('Unable to connect to server');

}


});
