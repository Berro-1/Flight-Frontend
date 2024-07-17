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

