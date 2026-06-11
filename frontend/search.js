function renderTable(data) {
    const tbody = document.getElementById('donorTableBody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align:center;">
                    No matching donors found
                </td>
            </tr>
        `;
        return;
    }

    data.forEach(donor => {
        const row = `
            <tr>
                <td><strong>${donor.name}</strong></td>
                <td>
                    <span style="color: var(--primary); font-weight: 600;">
                        ${donor.blood_group}
                    </span>
                </td>
                <td>${donor.city}, ${donor.area}</td>
                <td>${donor.phone}</td>
                <td>
                    <span class="status-badge ${
                        donor.availability === 'Available'
                            ? 'status-available'
                            : 'status-unavailable'
                    }">
                        ${donor.availability}
                    </span>
                </td>
                <td>
                    <button class="btn btn-primary"
                        style="padding: 5px 15px; font-size: 0.8rem;">
                        Contact
                    </button>
                </td>
            </tr>
        `;

        tbody.innerHTML += row;
    });
}

async function searchDonors() {
    const blood = document.getElementById('searchBlood').value;
    const city = document.getElementById('searchCity').value;

    if (!blood) {
        alert("Please select a blood group");
        return;
    }

    try {
        const response = await fetch(
            `https://blood-donor-production-fbeb.up.railway.app/api/search?blood_group=${encodeURIComponent(blood)}&city=${encodeURIComponent(city)}`
        );

        const result = await response.json();

        if (response.ok) {
            renderTable(result);
        } else {
            alert(result.error || "Search failed");
        }

    } catch (error) {
        console.error(error);
        alert("Unable to connect to server");
    }
}

window.onload = function () {
    document.getElementById('donorTableBody').innerHTML = `
        <tr>
            <td colspan="6" style="text-align:center;">
                Search for donors to see results
            </td>
        </tr>
    `;
};