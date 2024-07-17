const planeFrom = document.getElementById('plane-from')
const planeTo = document.getElementById('plane-to')
const search = document.getElementsByClassName('search-button')[0]
const tableBody = document.querySelector('#flightTable tbody')

const getFlights = async() => {
    try {
        const { data } = await axios.get('http://localhost/Flight-Backend/api/flight/getallFlight.php');
        const from_arr = []
        const to_arr = []
        
        
        data.forEach(flight => {
            const from = document.createElement('option');
            const to = document.createElement('option');
            
            
            if(!from_arr.includes(flight.departure_airport)){
                from.innerText = flight.departure_airport;
                planeFrom.appendChild(from);
                from_arr.push(flight.departure_airport)
            }

            if(!to_arr.includes(flight.arrival_airport)){
                to.innerText = flight.arrival_airport;
                planeTo.appendChild(to);
                to_arr.push(flight.arrival_airport)
            }
            
            
        });
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

getFlights();
let fromId
let toId
planeFrom.addEventListener('change', () => {
    fromId = planeFrom.value
    console.log(fromId)
});
planeTo.addEventListener('change', ()=>{
    toId = planeTo.value
    console.log(toId)
})


search.addEventListener('click', ()=>{
    window.location.href = 'search-page.html?fromId='+ fromId +'&toId='+toId;

    
    
})