// Load User Data
const user = JSON.parse(localStorage.getItem('currentUser')) || { name: "John Doe", blood: "O+" };
document.getElementById('donorName').innerText = user.name;

// Availability Toggle
let isAvailable = true;
const toggleBtn = document.getElementById('toggleBtn');
const statusLabel = document.getElementById('statusLabel');

toggleBtn.addEventListener('click', () => {
    isAvailable = !isAvailable;
    if(isAvailable) {
        statusLabel.innerText = "Available";
        statusLabel.className = "status-badge status-available";
        toggleBtn.innerText = "Set as Unavailable";
    } else {
        statusLabel.innerText = "Unavailable";
        statusLabel.className = "status-badge status-unavailable";
        toggleBtn.innerText = "Set as Available";
    }
});

// Notifications
const alerts = [
    { hospital: "City General", blood: "O+", time: "2 mins ago", urgent: true },
    { hospital: "St. Jude Medical", blood: "O+", time: "1 hour ago", urgent: false }
];

const notifContainer = document.getElementById('notifications');
alerts.forEach(a => {
    const div = document.createElement('div');
    div.style.padding = "15px";
    div.style.borderLeft = `4px solid ${a.urgent ? '#DC2626' : '#64748B'}`;
    div.style.background = "#f8fafc";
    div.style.marginBottom = "10px";
    div.style.borderRadius = "0 8px 8px 0";
    div.innerHTML = `
        <p><strong>${a.hospital}</strong> needs <strong>${a.blood}</strong></p>
        <small>${a.time}</small>
        ${a.urgent ? '<span style="color:red; font-size:0.7rem; margin-left:10px;">CRITICAL</span>' : ''}
    `;
    notifContainer.appendChild(div);
});
