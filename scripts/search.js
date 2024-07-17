const tableBody = document.querySelector('#flightTable tbody')


window.onload = ()=>{
    const getallFlight = async ()=>{
        try {
            const { data } = await axios.post('http://localhost/Flight-Backend/api/flight/getallFlight.php');
            
            
            data.forEach(flight => {
                const row = document.createElement('tr')
    
                const fligh_id = document.createElement('td')
                fligh_id.innerText = flight.flight_number
                row.append(fligh_id)
    
                const flight_dep = document.createElement('td')
                flight_dep.innerText = flight.departure_airport
                row.append(flight_dep)
    
                const flight_des = document.createElement('td')
                flight_des.innerText = flight.arrival_airport
                row.append(flight_des)
    
                const flight_dep_time = document.createElement('td')
                flight_dep_time.innerText = flight.departure_datetime
                row.append(flight_dep_time)
    
                const flight_des_time = document.createElement('td')
                flight_des_time.innerText = flight.arrival_datetime
                row.append(flight_des_time)
    
                const flight_seats = document.createElement('td')
                flight_seats.innerText = flight.available_seats
                row.append(flight_seats)
    
                tableBody.append(row)
    
            });
        } catch (error) {
            console.error('Error fetching hotels:', error);
        }
    
    }
    getallFlight()
}

