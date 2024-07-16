const flightBtn = document.getElementById('book-flight')
const hoteltBtn = document.getElementById('book-hotel')
const taxitBtn = document.getElementById('book-taxi')
const taxi = document.getElementById('taxi')
const hotel = document.getElementById('hotel')
const flight = document.getElementById('flight')
const planeFrom = document.getElementById('plane-from')
const planeTo = document.getElementById('plane-to')
const planeFromTime = document.getElementById('plane-from-time')
const planeToTime= document.getElementById('plane-to-time')


flightBtn.addEventListener('click',()=>{
    taxi.style.display = 'none';
    hotel.style.display = 'none';
    flight.style.display = 'flex';
})
hoteltBtn.addEventListener('click',()=>{
    taxi.style.display = 'none';
    flight.style.display = 'none';
    hotel.style.display = 'flex';
})
taxitBtn.addEventListener('click',()=>{
    flight.style.display = 'none';
    hotel.style.display = 'none';
    taxi.style.display = 'flex';
})

const getFlights = async() => {
    try {
        const { data } = await axios.get('http://localhost/Flight-Backend/api/flight/getallFlight.php')
        
        
        data.forEach(flight => {
            const from = document.createElement('option')
            const to = document.createElement('option')
            const from_time = document.createElement('option')
            const to_time = document.createElement('option')
            
            from.innerText= flight.departure_airport
            to.innerText = flight.arrival_airport
            from_time.innerText = flight.departure_datetime
            to_time.innerText = flight.arrival_datetime


            planeFrom.appendChild(from)
            planeTo.appendChild(to)
            planeFromTime.appendChild(from_time)
            planeToTime.appendChild(to_time)
        });
    } catch (error) {
        console.error('Error fetching hotels:', error)
    }
}
getFlights()
