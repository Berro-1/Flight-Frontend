document.addEventListener('DOMContentLoaded', async () => {
    await fetchAirports(); 
    let menuicn = document.querySelector(".menuicn");
    let nav = document.querySelector(".navcontainer");
    let main = document.querySelector(".main");

    menuicn.addEventListener("click", () => {
        nav.classList.toggle("navclose");
        main.classList.toggle("main-close");
    });
});

async function fetchAirports() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/airport/getAirports.php');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('test')
        console.log(data)
        console.log('Airports::', data.AirportName);
        
        fillAirportsTable(data)
    } catch (error) {
        console.error('can not fetch airports:', error)
    }
}
   
function fillAirportsTable(data) {
    // data.forEach(airport => {
    //   console.log(airport);
   // console.log('name:', airport.AirportName);
//}
//)
    const tableBody = document.querySelector('.airport-table tbody');
    
  
        data.forEach(airport => {
            const row = document.createElement('tr');
            row.setAttribute('data-airport-id', airport.Airport_id); 
            row.innerHTML = `
                <td class="airport-name">${airport.AirportName}</td>
                <td>
                <button class="update-btn" onclick="enableEditing(this)">Update</button>
                <button class="delete-btn" onclick="deleteAirport(${airport.id}, this)">Delete</button>
                <button class="save-btn" style="display: none;" onclick="saveAirport(this)">Save</button>
            </td>`;
        tableBody.appendChild(row);
    });
}

function enableEditing(button) {
    const row = button.closest('tr');
    const nameCell = row.querySelector('.airport-name');

    nameCell.contentEditable = 'true'; 
    nameCell.focus(); 

    
    const updateButton = row.querySelector('.update-btn');
    const deleteButton = row.querySelector('.delete-btn');
    updateButton.style.display = 'none';
    deleteButton.style.display = 'none';

    const saveButton = row.querySelector('.save-btn');
    saveButton.style.display = 'inline-block'; 

    // Handle the Save action
    saveButton.onclick = async () => {
        const newName = nameCell.textContent.trim();
        const id = row.getAttribute('data-airport-id');
        
        const updatedData = {
            Airport_id: id,
            AirportName: newName
        };
        
        const result = await updateAirport(updatedData);

        nameCell.contentEditable = 'false'; 

        
        saveButton.style.display = 'none';
        updateButton.style.display = 'inline-block';
        deleteButton.style.display = 'inline-block';

        if (result) {
            console.log('Airport updated successfully:', result);
        }
    };
}







async function updateAirport(updatedData) {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/airport/updateAirport.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error response:', errorText);
            throw new Error('Failed to update airport');
        }

        const result = await response.json();
        console.log('Update successful:', result);
        return result; 
    } catch (error) {
        console.error('Error during airport update:', error);
    }
}
async function saveAirport(button) {
    const row = button.closest('tr');
    const airportId = row.getAttribute('data-airport-id');
    console.log('Airport ID:', airportId); 
    
    
    const updatedData = {
        Airport_id: airportId,
        AirportName: row.querySelector('.airport-name').textContent.trim()
    };
    console.log('Updating airport with data:', updatedData);
   
    const result = await updateAirport(updatedData);
    if (result) {
        
        console.log('Airport updated successfully:', result);
    }
}


async function deleteAirport(id, button) {
    if (confirm("Are you sure you want to delete this airport?")) {
        try {
            const response = await fetch('http://localhost/fullstack/Flight-Backend/api/airport/deleteAirport.php', {
                method: 'DELETE',
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
            console.log("Airport deleted successfully.");
        } catch (error) {
            console.error('Error deleting airport:', error);
        }
    }
}