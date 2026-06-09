document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simple Validation
    const phone = document.getElementById('phone').value;
    if(phone.length < 10) {
        alert("Please enter a valid 10-digit mobile number");
        return;
    }

    // Success Animation
    const toast = document.getElementById('toast');
    toast.style.display = 'block';
    
    // Simulate API storage
    const donorData = {
        name: document.getElementById('fullName').value,
        blood: document.getElementById('bloodGroup').value,
        city: document.getElementById('city').value
    };
    localStorage.setItem('currentUser', JSON.stringify(donorData));

    setTimeout(() => {
        window.location.href = 'donor-dashboard.html';
    }, 2000);
});
