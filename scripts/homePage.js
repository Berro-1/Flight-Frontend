const planeFrom = document.getElementById('plane-from')
const planeTo = document.getElementById('plane-to')
const search = document.getElementsByClassName('search-button')[0]
const tableBody = document.querySelector('#flightTable tbody')

const getFlights = async() => {
    try {
        const { data } = await axios.get('http://localhost/Flight-Backend/api/flight/getallFlight.php');
        
        
        data.forEach(flight => {
            const from = document.createElement('option');
            const to = document.createElement('option');
            
            from.id = flight.departure_airport_id;
            to.id = flight.destination_airport_id;
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