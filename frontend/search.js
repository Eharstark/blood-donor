const dummyDonors = [
    { name: "Alice Johnson", blood: "O+", city: "New York", area: "Manhattan", phone: "555-0101", status: "Available" },
    { name: "Bob Smith", blood: "A-", city: "Chicago", area: "Downtown", phone: "555-0102", status: "Unavailable" },
    { name: "Charlie Davis", blood: "O+", city: "New York", area: "Brooklyn", phone: "555-0103", status: "Available" },
    { name: "Diana Prince", blood: "B+", city: "Los Angeles", area: "Santa Monica", phone: "555-0104", status: "Available" }
];

function renderTable(data) {
    const tbody = document.getElementById('donorTableBody');
    tbody.innerHTML = '';

    data.forEach(donor => {
        const row = `
            <tr>
                <td><strong>${donor.name}</strong></td>
                <td><span style="color: var(--primary); font-weight: 600;">${donor.blood}</span></td>
                <td>${donor.city}, ${donor.area}</td>
                <td>${donor.phone}</td>
                <td><span class="status-badge ${donor.status === 'Available' ? 'status-available' : 'status-unavailable'}">${donor.status}</span></td>
                <td><button class="btn btn-primary" style="padding: 5px 15px; font-size: 0.8rem;">Contact</button></td>
            </tr>
        `;
        tbody.innerHTML += row;
    });
}

function searchDonors() {
    const blood = document.getElementById('searchBlood').value;
    const city = document.getElementById('searchCity').value.toLowerCase();

    const filtered = dummyDonors.filter(d => {
        return (blood === "" || d.blood === blood) && 
               (city === "" || d.city.toLowerCase().includes(city));
    });

    renderTable(filtered);
}

// Initial Load
window.onload = () => renderTable(dummyDonors);
