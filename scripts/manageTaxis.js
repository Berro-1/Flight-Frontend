document.addEventListener('DOMContentLoaded', async () => {
    let menuicn = document.querySelector(".menuicn");
    let nav = document.querySelector(".navcontainer");
    let main = document.querySelector(".main");

    menuicn.addEventListener("click", () => {
        nav.classList.toggle("navclose");
        main.classList.toggle("main-close");
    });



    await fetchTaxis();
    document.getElementById('addTaxiButton').addEventListener('click', addTaxi);
    document.getElementById('searchTaxi').addEventListener('input', searchTaxis);
});

async function fetchTaxis() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/taxi/getalltaxi.php');
        const taxis = await response.json();
        fillTaxisTable(taxis);
    } catch (error) {
        console.error('Error fetching taxis:', error);
    }
}

function fillTaxisTable(taxis) {
    const tableBody = document.getElementById('taxiTableBody');
    tableBody.innerHTML = '';

    taxis.forEach(taxi => {
        const row = document.createElement('tr');
        row.setAttribute('data-taxi-id', taxi.taxi_id);
        row.innerHTML = `
            <td class="driver-name">${taxi.driver_name}</td>
            <td class="status">${taxi.status}</td>
            <td class="from-location">${taxi.from_location}</td>
            <td class="to-location">${taxi.to_location}</td>
            <td>
                <button class="update-btn" onclick="enableEditing(this)">Update</button>
                <button class="delete-btn" onclick="deleteTaxi(${taxi.taxi_id}, this)">Delete</button>
                <button class="save-btn" style="display: none;" onclick="saveTaxi(this)">Save</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

async function addTaxi() {
    const driverName = document.getElementById('driverName').value;
    const status = document.getElementById('status').value;
    const fromLocation = document.getElementById('fromLocation').value;
    const toLocation = document.getElementById('toLocation').value;

    const newTaxi = { 
        action: 'create', 
        driver_name: driverName, 
        status: status, 
        from_location: fromLocation, 
        to_location: toLocation 
    };

    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/taxi/gettaxi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTaxi),
        });

        const result = await response.json();
        if (result.message) {
            await fetchTaxis();
            clearTaxiForm();
        } else {
            console.error('Error adding taxi:', result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

function clearTaxiForm() {
    document.getElementById('driverName').value = '';
    document.getElementById('status').value = '';
    document.getElementById('fromLocation').value = '';
    document.getElementById('toLocation').value = '';
}

function enableEditing(button) {
    const row = button.closest('tr');
    const nameCell = row.querySelector('.driver-name');
    const statusCell = row.querySelector('.status');
    const fromCell = row.querySelector('.from-location');
    const toCell = row.querySelector('.to-location');

    nameCell.innerHTML = `<input type="text" value="${nameCell.innerText}" />`;
    statusCell.innerHTML = `<input type="text" value="${statusCell.innerText}" />`;
    fromCell.innerHTML = `<input type="text" value="${fromCell.innerText}" />`;
    toCell.innerHTML = `<input type="text" value="${toCell.innerText}" />`;

    button.style.display = 'none'; 
    row.querySelector('.save-btn').style.display = 'inline-block'; 
}


async function saveTaxi(button) {
    const row = button.closest('tr');
    const taxiId = row.getAttribute('data-taxi-id');

    const updatedData = {
        action: 'update',
        taxi_id: taxiId,
        driver_name: row.querySelector('.driver-name input').value,
        status: row.querySelector('.status input').value,
        from_location: row.querySelector('.from-location input').value,
        to_location: row.querySelector('.to-location input').value,
    };

    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/taxi/gettaxi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });

        const result = await response.json();
        if (result.message) {
            await fetchTaxis();
        } else {
            console.error('Error updating taxi:', result.error);
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

async function deleteTaxi(id, button) {
    if (confirm("Are you sure you want to delete this taxi?")) {
        try {
            const response = await fetch('http://localhost/fullstack/Flight-Backend/api/taxi/gettaxi.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ action: 'delete', taxi_id: id })
            });

            const result = await response.json();
            if (!response.ok) {
                throw new Error(result.error || 'Failed to delete taxi');
            }

   
            const row = button.closest('tr');
            row.remove();
            console.log("Taxi deleted successfully.");
        } catch (error) {
            console.error('Error deleting taxi:', error);
        }
    }
}



async function searchTaxis(event) {
    const searchTerm = event.target.value;

    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/taxi/searchTaxi.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ searchTerm }),
        });

        const taxis = await response.json();
        fillTaxisTable(taxis);
    } catch (error) {
        console.error('Error searching taxis:', error);
    }
}

