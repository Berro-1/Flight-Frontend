// const hotelName = document.getElementById('hotel-name');
// const hotelLocation = document.getElementById('hotel-location');
// const hotelRooms = document.getElementById('hotel-room');

// const getHotels = async() => {
//     try {
//         const { data } = await axios.post('http://localhost/Flight-Backend/api/hotel/getHotels.php');
        
        
//         data.forEach(hotel => {
//             const optionName = document.createElement('option');
//             const optionLocation = document.createElement('option');
//             const optionRoom = document.createElement('option');

//             optionName.innerText= hotel.hotel_name;
//             optionLocation.innerText = hotel.location;
//             optionRoom.innerText= hotel.available_rooms;

//             hotelName.appendChild(optionName);
//             hotelLocation.appendChild(optionLocation);
//             hotelRooms.appendChild(optionRoom);
//         });
//     } catch (error) {
//         console.error('Error fetching hotels:', error);
//     }
// }

// getHotels();
