import { proximityArray } from './location.js'
import { unsortedArray } from './unsorted.js'
import { createProfiles, profileContainer, currentProfilesShown, makingItZero, appearFiftyProfilesLimit } from '../script.js'


// Open and Close the Filters Board

const filtersButton = document.querySelector('[filters-button]')
filtersButton.addEventListener('click', appearFiltersBoard)

const closeFiltersButton = document.querySelector('.close-filters-button')
closeFiltersButton.addEventListener('click', disappearFiltersBoard)

const filterBoard = document.querySelector('.filter-board')
const mainOverlay = document.querySelector('.overlay-effect')

function appearFiltersBoard() {
  filterBoard.style.display = 'flex'
  mainOverlay.append(filterBoard)
  mainOverlay.style.display = 'flex'
}

function disappearFiltersBoard() {
  mainOverlay.style.display = 'none'
  mainOverlay.innerHTML = ''
}

// Inside the Filters Board

// The filters 
const minAge = document.querySelector('[min-age-input]')
const maxAge = document.querySelector('[max-age-input]')
const maleProfilesCheckbox = document.querySelector('[male-profiles-checkbox]')
const femaleProfilesCheckbox = document.querySelector('[female-profiles-checkbox]')
const onlineProfilesCheckbox = document.querySelector('[online-profiles-checkbox]')

const applyFiltersButton = document.querySelector('.apply-filters-button')
applyFiltersButton.addEventListener('click', () => {
  makingItZero()
  profileContainer.innerHTML = ''
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(proximityArray[i] / 20)
    let column = Math.floor(proximityArray[i] % 20)
    unsortedArray[row][column].forEach(profile => { applyTheFilters(profile) })
    appendFilterTags()
  }
})

// Applying the Filters to the Actual Profiles, The Main Function :d

function applyTheFilters(profile) {
  if (currentProfilesShown === 50) { return }
  if (Number(minAge.value) > Number(maxAge.value) && minAge.value !== '' && maxAge.value !== '') {
    alert(`The age filter => "Minimum Age: ${minAge.value} and Max Age: ${maxAge.value}" does not yield any results, please consider changing them.`)
    return
  }
  if (minAge.value !== '' && minAge.value !== maxAge.value && Number(profile[1]) < Number(minAge.value)) { return }
  if (maxAge.value !== '' && minAge.value !== maxAge.value && Number(profile[1]) > Number(maxAge.value)) { return }
  if (femaleProfilesCheckbox.checked && !maleProfilesCheckbox.checked && profile[0] !== 'f') { return }
  if (maleProfilesCheckbox.checked && !femaleProfilesCheckbox.checked && profile[0] !== 'm') { return }
  if (onlineProfilesCheckbox.checked && profile[2] !== 'Online') { return }
  disappearFiltersBoard()
  appearFiftyProfilesLimit()
  createProfiles(profile)
}

// Just the Filter Tags

const undoFiltersButton = document.querySelector('.undo-filters-button')
const filterTagsDiv = document.querySelector('.filter-tags')
undoFiltersButton.addEventListener('click', undoTheFilters)

function appendFilterTags() {
  filterTagsDiv.innerHTML = ''
  const filterTag = document.createElement('div')
  filterTag.classList.add('filter-tag')
  if (minAge.value !== '' && minAge.value !== maxAge.value) {
    let another = filterTag.cloneNode(true);
    another.innerText = `Minimum Age: ${minAge.value}`
    filterTagsDiv.append(another)
  }
  if (maxAge.value !== '' && minAge.value !== maxAge.value) {
    let another = filterTag.cloneNode(true);
    another.innerText = `Maximum Age: ${maxAge.value}`
    filterTagsDiv.append(another)
  }
  if (maleProfilesCheckbox.checked && !femaleProfilesCheckbox.checked) {
    let another = filterTag.cloneNode(true);
    another.innerText = 'Only Male'
    filterTagsDiv.append(another)
  }
  if (femaleProfilesCheckbox.checked && !maleProfilesCheckbox.checked) {
    let another = filterTag.cloneNode(true);
    another.innerText = 'Only Female'
    filterTagsDiv.append(another)
  }
  if (onlineProfilesCheckbox.checked) {
    let another = filterTag.cloneNode(true);
    another.innerText = 'Online Users'
    filterTagsDiv.append(another)
  }
  if (filterTagsDiv.childElementCount !== 0) { undoFiltersButton.style.display = 'flex' }
}

function undoTheFilters() {
  undoFiltersButton.style.display = 'none'
  minAge.value = ''
  maxAge.value = ''
  femaleProfilesCheckbox.checked = false
  maleProfilesCheckbox.checked = false
  onlineProfilesCheckbox.checked = false
  makingItZero()
  profileContainer.innerHTML = ''
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(proximityArray[i] / 20)
    let column = Math.floor(proximityArray[i] % 20)
    unsortedArray[row][column].forEach(profile => { applyTheFilters(profile) })
    appendFilterTags()
  }
}

export { applyTheFilters }
