const planeFrom = document.getElementById('plane-from')
const planeTo = document.getElementById('plane-to')

const getFlights = async() => {
    try {
        const { data } = await axios.post('http://localhost/Flight-Backend/api/flight/getallFlight.php');
        
        
        data.forEach(flight => {
            const from = document.createElement('option');
            const to = document.createElement('option');
            

            from.innerText= flight.departure_airport;
            to.innerText = flight.arrival_airport;

            planeFrom.appendChild(from);
            planeTo.appendChild(to);
        });
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

getFlights();