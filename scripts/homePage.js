document.addEventListener("DOMContentLoaded", () => {
    const planeFrom = document.getElementById('plane-from');
    const planeTo = document.getElementById('plane-to');
    const searchButton = document.querySelector('.search-button');

    const getAirports = async () => {
        try {
            const { data } = await axios.get('http://localhost/fullstack/Flight-Backend/api/airport/getAirports.php');
            console.log(data);
            
            data.forEach(airport => {
                const fromOption = document.createElement('option');
                const toOption = document.createElement('option');
                
                fromOption.value = airport.Airport_id;
                toOption.value = airport.Airport_id;
                fromOption.innerText = airport.AirportName;
                toOption.innerText = airport.AirportName;

                planeFrom.appendChild(fromOption);
                planeTo.appendChild(toOption);
            });
        } catch (error) {
            console.error('Error fetching airports:', error);
        }
    };

    getAirports();

    let fromId;
    let toId;

    planeFrom.addEventListener('change', () => {
        fromId = planeFrom.value;
        console.log(fromId);
    });

    planeTo.addEventListener('change', () => {
        toId = planeTo.value;
        console.log(toId);
    });

    searchButton.addEventListener('click', () => {
        if (fromId && toId) {
            window.location.href = `search-page.html?fromId=${fromId}&toId=${toId}`;
        } else {
            alert('Please select both departure and arrival locations.');
        }
    });
});
