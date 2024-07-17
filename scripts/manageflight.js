let airports = []; 
async function fetchFlights() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/flight/getallFlight.php');
        if (!response.ok) {
            throw new Error('Failed to fetch flights');
        }
        const data = await response.json();
        console.log('flights:', data); 
        
        data.forEach(flight => {
            //if the array contain arrival
            if (!airports.find(airport => airport.id === flight.departure_airportid)) {
                airports.push({ id: flight.departure_airportid, name: flight.departure_airport });
            }
        
            //if the array contain arrival
            if (!airports.find(airport => airport.id === flight.arrival_airportid)) {
                airports.push({ id: flight.arrival_airportid, name: flight.arrival_airport });
            }
        });
        
       
        console.log(airports)

        

        return data;
    } catch (error) {
        console.error('Error fetching flights:', error);
        return [];
    }
}

function fillTable(data) {
    const tableBody = document.querySelector('.report-table tbody');
    //tableBody.innerHTML = '';

    data.forEach(flight => {
        console.log(flight);
        console.log('Flight ID:', flight.flight_id);
        const row = document.createElement('tr');
        row.setAttribute('data-flight-id', flight.flight_id); 

        row.innerHTML = `
        <td class="flight-number">${flight.flight_number}</td>
        <td class="departure">${flight.departure_airport}</td>
        <td class="arrival">${flight.arrival_airport}</td>
        <td class="departure-datetime">${flight.departure_datetime}</td>
        <td class="arrival-datetime">${flight.arrival_datetime}</td>
        <td class="available-seats">${flight.available_seats}</td>
            <td class="action-cell">
                <button class="update-btn" onclick="enableEditing(this)">Update</button>
                <button class="delete-btn" onclick="deleteFlight('${flight.flight_number}', this)">Delete</button>
                <button class="save-btn" style="display: none;" onclick="saveFlight(this)">Save</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


async function enableEditing(button) {
    const row = button.closest('tr');
    const departureCell = row.querySelector('.departure');
    const arrivalCell = row.querySelector('.arrival');
    const saveButton = row.querySelector('.save-btn');
    const deleteButton = row.querySelector('.delete-btn');

    const actionCell = row.querySelector('.action-cell'); 

    
    const departureSelect = document.createElement('select');
    departureSelect.classList.add('departure-airport');
    airports.forEach(airport => {
        const option = document.createElement('option');
        option.value = airport.id;
        option.textContent = airport.name;
        departureSelect.appendChild(option);
    });
    departureCell.innerHTML = '';
    departureCell.appendChild(departureSelect);


    const arrivalSelect = document.createElement('select');
    arrivalSelect.classList.add('arrival-airport');
    airports.forEach(airport => {
        const option = document.createElement('option');
        option.value = airport.id;
        option.textContent = airport.name;
        arrivalSelect.appendChild(option);
    });
    arrivalCell.innerHTML = '';
    arrivalCell.appendChild(arrivalSelect);
    
    row.querySelectorAll('td').forEach(cell => {
        if (cell !== departureCell && cell !== arrivalCell && cell !== actionCell) {
            cell.contentEditable = 'true';
        } else {
            cell.contentEditable = 'false'; 
        }
    });

    button.style.display = 'none'; 
    deleteButton.style.display = 'none';
    saveButton.style.display = 'inline-block';
}

async function updateFlight(updateFlightData) {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/flight/updateFlight.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updateFlightData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error('Failed to update flight');
        }

        const result = await response.json();
        console.log('Update successful:', result);
        return result; 
    } catch (error) {
        console.error('Error during flight update:', error);
    }
}


function isValidDateTime(dateTime) {
    if (dateTime.length !== 19) return false; 
    if (dateTime[10] !== ' ') return false; 
    return true; 
}




async function saveFlight(button) {
    const row = button.closest('tr');
    const flightId = row.getAttribute('data-flight-id');

    const updateFlightData = {
        flight_id: flightId,
        flight_number: row.querySelector('.flight-number').textContent.trim(),
        departure_airport_id: row.querySelector('.departure-airport').value,
        arrival_airport_id: row.querySelector('.arrival-airport').value,
        departure_datetime: row.querySelector('.departure-datetime').textContent.trim(),
        arrival_datetime: row.querySelector('.arrival-datetime').textContent.trim(),
        available_seats: row.querySelector('.available-seats').textContent.trim()
    };

    const result = await updateFlight(updateFlightData);
    console.log('Update flight data:', updateFlightData);
    resetRow(row, updateFlightData);
}

function resetRow(row, updatedData) {
    row.querySelector('.flight-number').textContent = updatedData.flight_number;
    row.querySelector('.departure-datetime').textContent = updatedData.departure_datetime;
    row.querySelector('.arrival-datetime').textContent = updatedData.arrival_datetime;
    row.querySelector('.available-seats').textContent = updatedData.available_seats;

    const departureAirportName = airports.find(airport => airport.id == updatedData.departure_airport_id)?.name;
    const arrivalAirportName = airports.find(airport => airport.id == updatedData.arrival_airport_id)?.name;

    row.querySelector('.departure').textContent = departureAirportName;
    row.querySelector('.arrival').textContent = arrivalAirportName;

    row.querySelectorAll('select').forEach(select => select.remove());

    row.querySelectorAll('td').forEach(cell => {
        cell.contentEditable = 'false';
    });

    row.querySelector('.save-btn').style.display = 'none'; 
    row.querySelector('.update-btn').style.display = 'inline-block'; 
    row.querySelector('.delete-btn').style.display = 'inline-block';  
}


async function deleteAirport(button) {
    const row = button.closest('tr');
    const airportId = row.getAttribute('data-airport-id');

    const response = await fetch('http://localhost/fullstack/Flight-Backend/api/airport/deleteAirport.php', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ airport_id: airportId })
    });

    if (response.ok) {
        const result = await response.json();
        console.log('Airport deleted:', result);
        row.remove(); // Remove the row from the table
    } else {
        console.error('Error deleting airport:', response.statusText);
    }
}







document.addEventListener('DOMContentLoaded', async () => {

    let menuicn = document.querySelector(".menuicn");
    let nav = document.querySelector(".navcontainer");
    let main = document.querySelector(".main");

    menuicn.addEventListener("click", () => {
        nav.classList.toggle("navclose");
        main.classList.toggle("main-close"); // Correctly toggles main's margin
    });
    const flights = await fetchFlights();
    fillTable(flights);

    
});
