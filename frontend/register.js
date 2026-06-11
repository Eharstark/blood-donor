document.getElementById('registerForm').addEventListener('submit', async function(e) {
e.preventDefault();

```
const phone = document.getElementById('phone').value;

if(phone.length < 10) {
    alert("Please enter a valid 10-digit mobile number");
    return;
}

const donorData = {
    name: document.getElementById('fullName').value,
    age: parseInt(document.getElementById('age').value),
    gender: document.getElementById('gender').value,
    blood_group: document.getElementById('bloodGroup').value,
    phone: document.getElementById('phone').value,
    city: document.getElementById('city').value,
    area: document.getElementById('area').value,
    last_donation: document.getElementById('lastDonation').value || null,
    availability: "Available"
};

try {
    const response = await fetch(
        "https://blood-donor-production-fbeb.up.railway.app/api/register",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(donorData)
        }
    );

    const result = await response.json();

    if(response.ok) {
        const toast = document.getElementById('toast');
        toast.style.display = 'block';

        setTimeout(() => {
            window.location.href = 'donor-dashboard.html';
        }, 2000);
    } else {
        alert(result.error || "Registration failed");
    }

} catch(error) {
    console.error(error);
    alert("Unable to connect to server");
}
```

});
