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

function fill(data) {
    const tableBody = document.querySelector('.report-table tbody');

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
