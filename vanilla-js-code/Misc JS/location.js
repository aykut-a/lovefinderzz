import { sortTheUnsorted, profileContainer } from '../script.js'

// The Relocation Button near the Filters Under the Head

let isLocationReset = false

const relocationButton = document.querySelector('.relocation-button')
relocationButton.addEventListener('click', locationPickerAppear)

const mainOverlay = document.querySelector('.overlay-effect')
const algorithmSection = document.querySelector('.algorithm')

function locationPickerAppear() {
  insertDummySquares()
  locationDummy.style.pointerEvents = 'auto'
  proximityArray = []
  profileContainer.innerHTML = ''

  relocationSetButton.innerHTML = 'Click on a Square' + '<i class="material-icons">mouse</i>'
  isLocationReset = false

  mainOverlay.append(algorithmSection)
  algorithmSection.style.display = 'flex'
  mainOverlay.style.display = 'flex'
}

const relocationSetButton = document.querySelector('.relocation-set-button')
relocationSetButton.addEventListener('click', locationPickerDisappear)

function locationPickerDisappear() {
  if (!isLocationReset) { return }
  mainOverlay.style.display = 'none'
  mainOverlay.innerHTML = ''
  sortTheUnsorted(proximityArray)
}

// Setting the Map And the Animation Dummy in The Start 

let proximityArray = []

const locationDummy = document.querySelector('.location-dummy')
insertDummySquares()

function insertDummySquares() {
  locationDummy.innerHTML = ''
  for (let i = 0; i < 400; i++) {
    const square = document.createElement('div')
    square.classList.add('dummy-square')
    locationDummy.append(square)
    square.setAttribute('id', i)
    square.addEventListener('click', () => { proximityArray.push(i) })
    square.addEventListener('click', () => pickSquare(square))
    square.addEventListener('click', () => {
      locationDummy.style.pointerEvents = 'none'
      handleRelocationButton()
    })
  }
}

function handleRelocationButton() {
  relocationSetButton.innerHTML = 'Scanning Users' + '<i class="material-icons spinning-icon">cached</i>'
  setTimeout(() => { isLocationReset = true }, 3700)
  setTimeout(() => { relocationSetButton.innerHTML = 'Relocate!' + '<i class="material-icons">check_circle</i>' }, 3700)
}





// The Ability to Pick Location over the Map / Dummy

function pickSquare(square) {
  let center = Number(square.getAttribute('id'))

  square.classList.add('chosen-square')
  square.style.animation = 'scaleup ease-out 1000ms'
  setTimeout(() => { square.style.backgroundColor = 'rgba(231, 4, 4, 0.74)' }, 1000)

  if ((center - 1) % 20 !== 19 && center !== 0) {
    let left = document.getElementById(`${center - 1}`)
    if (!left.classList.contains('chosen-square')) {
      left.classList.add('chosen-square')
      setTimeout(() => { pickSquare(left) }, 50)
      proximityArray.push((center - 1))
    }
  }
  if ((center - 20) >= 0) {
    let upper = document.getElementById(`${center - 20}`)
    if (!upper.classList.contains('chosen-square')) {
      upper.classList.add('chosen-square')
      setTimeout(() => { pickSquare(upper) }, 50)
      proximityArray.push((center - 20))
    }
  }
  if ((center + 1) % 20 !== 0) {
    let right = document.getElementById(`${center + 1}`)
    if (!right.classList.contains('chosen-square')) {
      right.classList.add('chosen-square')
      setTimeout(() => { pickSquare(right) }, 50)
      proximityArray.push((center + 1))
    }
  }
  if ((center + 20) <= 399) {
    let lower = document.getElementById(`${center + 20}`)
    if (!lower.classList.contains('chosen-square')) {
      lower.classList.add('chosen-square')
      setTimeout(() => { pickSquare(lower) }, 50)
      proximityArray.push((center + 20))
    }
  }
}

export { locationPickerAppear, proximityArray, pickSquare }