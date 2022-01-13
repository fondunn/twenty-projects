const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

initUI()

let ticketPrice = parseInt(movieSelect.value)

function setMovieData(movieIdx, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIdx)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const seatsIdx = [...selectedSeats].map(seat => [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIdx) )

    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

function initUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if( selectedSeats !== null && selectedSeats.length > 0 ) {
        seats.forEach((seat, idx) => {
            if(selectedSeats.indexOf(idx) > -1) {
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})

container.addEventListener('click', e => {
    if ( e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateSelectedCount()
    }
})

updateSelectedCount()