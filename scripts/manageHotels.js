document.addEventListener('DOMContentLoaded', async () => {
    await fetchHotels(); 
    document.getElementById('searchHotel').addEventListener('input', searchHotels);
});

async function fetchHotels() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/hotel/getHotels.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched hotels data:', data);
        
        fillHotelsTable(data);
    } catch (error) {
        console.error('Cannot fetch hotels:', error);
    }
}

function fillHotelsTable(data) {
    const tableBody = document.getElementById('hotelTableBody');
    tableBody.innerHTML = ''; 

    data.forEach(hotel => {
        const row = document.createElement('tr');
        row.setAttribute('data-hotel-id', hotel.hotel_id);
        row.innerHTML = `
            <td class="hotel-name">${hotel.hotel_name}</td>
            <td class="hotel-location">${hotel.location}</td>
            <td class="hotel-rooms">${hotel.available_rooms}</td>
            <td>
                <button class="update-btn" onclick="enableEditing(this)">Update</button>
                <button class="delete-btn" onclick="deleteHotel(${hotel.hotel_id}, this)">Delete</button>
                <button class="save-btn" style="display: none;" onclick="saveHotel(this)">Save</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function enableEditing(button) {
    const row = button.closest('tr');
    const nameCell = row.querySelector('.hotel-name');
    const locationCell = row.querySelector('.hotel-location');
    const roomsCell = row.querySelector('.hotel-rooms');

    nameCell.innerHTML = `<input type="text" value="${nameCell.innerText}" />`;
    locationCell.innerHTML = `<input type="text" value="${locationCell.innerText}" />`;
    roomsCell.innerHTML = `<input type="number" value="${roomsCell.innerText}" />`;

    button.style.display = 'none';
    row.querySelector('.save-btn').style.display = 'inline-block';
}

async function saveHotel(button) {
    const row = button.closest('tr');
    const hotelId = row.getAttribute('data-hotel-id');
    
    const updatedData = {
        hotel_id: hotelId,
        hotel_name: row.querySelector('.hotel-name input').value,
        location: row.querySelector('.hotel-location input').value,
        available_rooms: row.querySelector('.hotel-rooms input').value
    };

    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/hotel/updateHotel.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.error || 'Failed to update hotel');
        }

        // Update the table cell with the new data
        row.querySelector('.hotel-name').textContent = updatedData.hotel_name;
        row.querySelector('.hotel-location').textContent = updatedData.location;
        row.querySelector('.hotel-rooms').textContent = updatedData.available_rooms;

        // Hide the save button and show the update button again
        button.style.display = 'none';
        row.querySelector('.update-btn').style.display = 'inline-block';
        row.querySelector('.delete-btn').style.display = 'inline-block';

        console.log('Hotel updated successfully:', data);
    } catch (error) {
        console.error('Error updating hotel:', error);
    }
}


async function deleteHotel(id, button) {
    if (confirm("Are you sure you want to delete this hotel?")) {
        try {
            const response = await fetch('http://localhost/fullstack/Flight-Backend/api/hotel/deleteHotel.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const row = button.closest('tr');
            row.remove();
            console.log("Hotel deleted successfully.");
        } catch (error) {
            console.error('Error deleting hotel:', error);
        }
    }
}
     
    async function searchHotels(event) {
        const searchTerm = event.target.value;
    
        try {
            const response = await fetch('http://localhost/fullstack/Flight-Backend/api/hotel/searchHotel.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ searchTerm })
            });
    
            const hotels = await response.json();
            if (response.ok) {
                fillHotelsTable(hotels);
            } else {
                console.error('Error searching hotels:', hotels.error);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
