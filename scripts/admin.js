async function fetchAirports() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/airport/getAllAirports.php');
        if (!response.ok) {
            throw new Error('Failed to fetch airports');
        }
        const data = await response.json();
        console.log('Airports data:', data);
        return data; // Return the fetched data
    } catch (error) {
        console.error('Error fetching airports:', error);
        return []; // Return an empty array in case of an error
    }
}

function fillAirportsTable(data) {
    const tableBody = document.querySelector('.report-table tbody');

    // Clear existing rows
    tableBody.innerHTML = '';

    // Fill the table with airport data
    data.forEach(airport => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${airport.name}</td>
            <td>${airport.code}</td>
            <td>
                <button class="update-btn" onclick="enableEditing(this)">Update</button>
                <button class="delete-btn" onclick="deleteAirport('${airport.id}', this)">Delete</button>
            </td>`;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', async () => {

    let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");

menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
})
    const airports = await fetchAirports(); 
    fillAirportsTable(airports); 
});
