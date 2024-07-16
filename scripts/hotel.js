  document.addEventListener('DOMContentLoaded', () => {
        const hotelList = document.getElementById('hotel-list');
        const bookingModal = document.getElementById('booking-modal');
        const closeBtn = document.querySelector('.close');
        const bookingForm = document.getElementById('booking-form');
        const hotelIdInput = document.getElementById('hotel-id');
    
        // Replace with the actual API URL for getting hotels
        const apiURL = 'http://localhost:80/Flight-Backend/api/hotel/getHotels.php';
    
        // Fetch hotel data using GET request
        fetch(apiURL)
            .then(response => response.json())
            .then(data => {
                console.log('Data fetched:', data); // Debugging line
                if (Array.isArray(data) && data.length > 0) {
                    data.forEach(hotel => {
                        const row = document.createElement('tr');
    
                        row.innerHTML = `
                            <td>${hotel.hotel_name}</td>
                            <td>${hotel.location}</td>
                            <td>${hotel.available_rooms}</td>
                            <td><button onclick="openBookingModal('${hotel.hotel_id}')">Book Now</button></td>
                        `;
    
                        hotelList.appendChild(row);
                    });
                } else {
                    console.log('No data available'); // Debugging line
                }
            })
            .catch(error => console.error('Error fetching hotel data:', error));
    
        closeBtn.addEventListener('click', () => {
            bookingModal.style.display = 'none';
        });
    
        window.addEventListener('click', (event) => {
            if (event.target == bookingModal) {
                bookingModal.style.display = 'none';
            }
        });
    
        bookingForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            const hotelId = hotelIdInput.value;
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const bookingId = '1';  // This should be dynamically set or fetched as per your application's logic
            const date = new Date().toISOString().split('T')[0]; // Current date in YYYY-MM-DD format
    
            const bookingData = { booking_id: bookingId, hotel_id: hotelId, date: date };
    
            // Replace with the actual API URL for booking a hotel
            const bookHotelURL = 'http://localhost:80/Flight-Backend/api/book_hotel/bookHotel.php';
    
            fetch(bookHotelURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Hotel booked successfully!');
                    bookingModal.style.display = 'none';
                } else {
                    alert('Failed to book hotel.');
                }
            })
            .catch(error => console.error('Error booking hotel:', error));
        });
    });
    
    function openBookingModal(hotelId) {
        const bookingModal = document.getElementById('booking-modal');
        const hotelIdInput = document.getElementById('hotel-id');
    
        hotelIdInput.value = hotelId;
        bookingModal.style.display = 'block';
    }
    