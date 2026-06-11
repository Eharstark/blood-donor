document.getElementById('togglePass').addEventListener('click', function() {
    const passInput = document.getElementById('password');
    if(passInput.type === 'password') {
        passInput.type = 'text';
        this.textContent = 'Hide';
    } else {
        passInput.type = 'password';
        this.textContent = 'Show';
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const user = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    if(user === 'hospital1' && pass === '123456') {
        window.location.href = 'dashboard.html';
    } else {
        alert("Invalid demo credentials. Use hospital1 / 123456");
    }
});
window.location.href = 'dashboard.html';
