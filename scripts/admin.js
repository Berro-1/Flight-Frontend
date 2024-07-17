  const jwtToken = localStorage.getItem("token");

    if (jwtToken) {
      const decodedjwtToken = jwt_decode(jwtToken);
      console.log(decodedjwtToken);
      if (decodedjwtToken.role !== "admin") {
        
        window.location.href = "/Flight-Frontend/pages/meme.html";
      }
    } else {
      window.location.href = "/Flight-Frontend/pages/meme.html";

    }
// async function fetchAirports() {
//     try {
//         const response = await fetch('http://localhost/fullstack/Flight-Backend/api/airport/getAllAirports.php');
//         if (!response.ok) {
//             throw new Error('Failed to fetch airports');
//         }
//         const data = await response.json();
//         console.log('Airports data:', data);
//         return data; // Return the fetched data
//     } catch (error) {
//         console.error('Error fetching airports:', error);
//         return []; // Return an empty array in case of an error
//     }
// }
//fetch bookings from the API
async function fetchBookings() {
    try {
        const response = await fetch('http://localhost/fullstack/Flight-Backend/api/flightbook/getAllFlightBookings.php');//fetch request to the API

        const data = await response.json();
        return data;
        console.log('zayanb')
        //sconsole.log('test')

    } catch (error) {
        console.error('Error fetching bookings:', error); return [];
    }
}

// function fillAirportsTable(data) {
//     const tableBody = document.querySelector('.report-table tbody');
function fill(data) {
    const tableBody = document.querySelector('.report-table tbody');

//     // Clear existing rows
//     tableBody.innerHTML = '';

//     // Fill the table with airport data
//     data.forEach(airport => {
//         const row = document.createElement('tr');
//         row.innerHTML = `
//             <td>${airport.name}</td>
//             <td>${airport.code}</td>
//             <td>
//                 <button class="update-btn" onclick="enableEditing(this)">Update</button>
//                 <button class="delete-btn" onclick="deleteAirport('${airport.id}', this)">Delete</button>
//             </td>`;
//         tableBody.appendChild(row);
//     });
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     const airports = await fetchAirports(); // Fetch the airports
//     fillAirportsTable(airports); // Fill the table with the fetched data
// });
    // fill the table
    data.forEach(booking => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${booking.username}</td>
                          <td>${booking.flight_number}</td>
                           <td>${booking.departure_airport_name}</td>
                             <td>${booking.destination_airport_name}</td> `;
        tableBody.appendChild(row);
    });
}
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

    document.getElementById('totalUsers').textContent = '150'; 
    document.getElementById('totalFlights').textContent = '78'; 
    document.getElementById('totalBookings').textContent = '204'; 
});
