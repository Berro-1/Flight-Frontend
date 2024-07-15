// Fetch bookings from the API
async function fetchBookings() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/flight/getAllFlight.php');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching flights:', error);
        return [];
    }
}

function fill(data) {
    const tableBody = document.querySelector('.report-table tbody');
    tableBody.innerHTML = ''; // Clear existing rows

    data.forEach(flight => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${flight.flight_number}</td>
            <td>${flight.departure_airport}</td>
            <td>${flight.arrival_airport}</td>
            <td>${flight.departure_datetime}</td>
            <td>${flight.arrival_datetime}</td>
            <td>${flight.available_seats}</td>
            <td>
                <button class="update-btn" onclick="updateFlight(this)">Update</button>
                <button onclick="deleteFlight('${flight.flight_number}', this)">Delete</button>
                <button class="save-btn" style="display: none;" onclick="saveFlight(this)">Save</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function updateFlight(button) {
    const row = button.closest('tr'); // Get the row of the flight
    const cells = row.querySelectorAll('td');

    // Make cells editable
    cells.forEach(cell => {
        cell.contentEditable = 'true';
    });

    // Hide the update button and show the save button
    button.style.display = 'none';
    row.querySelector('.save-btn').style.display = 'inline-block';
}

async function saveFlight(button) {
    const row = button.closest('tr'); // Get the row of the flight

    const updatedFlight = {
        flight_number: row.children[0].textContent.trim(),
        departure_airport: row.children[1].textContent.trim(),
        arrival_airport: row.children[2].textContent.trim(),
        departure_datetime: row.children[3].textContent.trim(),
        arrival_datetime: row.children[4].textContent.trim(),
        available_seats: row.children[5].textContent.trim(),
    };

    
    if (!updatedFlight.flight_number || !updatedFlight.departure_airport || 
        !updatedFlight.arrival_airport || !updatedFlight.departure_datetime || 
        !updatedFlight.arrival_datetime || !updatedFlight.available_seats) {
        
        alert('Please fill in all fields correctly.');
        return;
    }
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/flight/updateFlight.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedFlight)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update flight');
        }

        console.log('Flight updated successfully:', updatedFlight);

        // Disable editing
        Array.from(row.children).forEach(cell => cell.contentEditable = 'false');

        // Hide the save button and show the update button
        button.style.display = 'none';
        row.querySelector('.update-btn').style.display = 'inline-block';

    } catch (error) {
        console.error('Error saving flight:', error);
    }
}


// Event listener for page load
document.addEventListener('DOMContentLoaded', async () => {
    const menuIcon = document.getElementById('menuicn');
    const navContainer = document.querySelector('.navcontainer');
    const mainContent = document.querySelector('.main');

    menuIcon.addEventListener('click', function() {
        navContainer.classList.toggle('navclose');
        mainContent.classList.toggle('main-close');
    });

    // Fetch bookings and update the table
    const bookings = await fetchBookings();
    fill(bookings);

    // Example stats, replace with actual data
    document.getElementById('totalUsers').textContent = '150'; 
    document.getElementById('totalFlights').textContent = '78'; 
    document.getElementById('totalBookings').textContent = '204'; 
});
