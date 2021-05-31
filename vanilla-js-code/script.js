import { unsortedArray } from './Misc JS/unsorted.js'
import { locationPickerAppear, proximityArray, pickSquare } from './Misc JS/location.js'
import { applyTheFilters } from './Misc JS/filtering.js'
import { slideInSettingsSection, slideOutSettingsSection } from './Misc JS/settings.js'

let currentProfilesShown = 0

const profileContainer = document.querySelector('[profile-container]')
const mainOverlay = document.querySelector('.overlay-effect')

locationPickerAppear() // When the App is Just Opened


// Create an Order of Showing the Profiles 

function sortTheUnsorted(proximityArray) {
  currentProfilesShown = 0
  for (let i = 0; i < 20; i++) {
    let row = Math.floor(proximityArray[i] / 20)
    let column = Math.floor(proximityArray[i] % 20)
    unsortedArray[row][column].forEach(profile => { applyTheFilters(profile) })
  }
}

function makingItZero() {
  currentProfilesShown = 0
}

// Passport Feature ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const premiumAd = document.querySelector('[premium-ad]')
const passportButton = document.querySelector('[passport-btn]')
passportButton.addEventListener('click', passport)

function passport() {
  mainOverlay.style.display = 'flex'
  premiumAd.style.display = 'flex'
  mainOverlay.append(premiumAd)
}

// Sliding Ad Pictures and Infos

const adPic1 = document.querySelector('[ad-picture-1]')
const adPic2 = document.querySelector('[ad-picture-2]')
const adPic3 = document.querySelector('[ad-picture-3]')

const adInfo1 = document.querySelector('[ad-info-1]')
const adInfo2 = document.querySelector('[ad-info-2]')
const adInfo3 = document.querySelector('[ad-info-3]')

let adPicsInfos = [adPic1, adPic2, adPic3, adInfo1, adInfo2, adInfo3]

slideImages1()

function slideImages1() {
  adPicsInfos.forEach(pic => pic.style.transform = 'translateX(-100%)')
  setTimeout(slideImages2, 3000)
}

function slideImages2() {
  adPicsInfos.forEach(pic => pic.style.transform = 'translateX(-200%)')
  setTimeout(slideImages3, 3000)
}

function slideImages3() {
  adPicsInfos.forEach(pic => pic.style.transform = 'translateX(0%)')
  setTimeout(slideImages1, 3000)
}

// Close the Ad Infos 

const closeAdBtn = document.querySelector('.close-ad-btn')
closeAdBtn.addEventListener('click', closeAds)

function closeAds() {
  mainOverlay.innerHTML = ''
  mainOverlay.style.display = 'none'
}

// Main Creation Function //////////////////////////////////////////////////////////////////////////////////////////////////////////////

function createProfiles(profile) {  // Main Function of the App
  // Creating
  const profileCard = document.createElement('div')
  const nameAgeActiveDiv = document.createElement('div')
  const activeStatus = document.createElement('div')
  const profileName = document.createElement('p')
  const profileAge = document.createElement('p')
  const profileGender = document.createElement('p')
  const relationshipStat = document.createElement('p')
  const profileImage = document.createElement('img')
  // Set the classes
  profileCard.classList.add('profile-card')
  nameAgeActiveDiv.classList.add('nameAgeActive')
  profileName.classList.add('profile-name')
  profileAge.classList.add('profile-age')
  profileGender.classList.add('profile-gender')
  activeStatus.classList.add('active-status')
  relationshipStat.classList.add('relationship-stat')
  profileImage.classList.add('profile-image')
  // Active Status
  if (profile[2] === 'Offline') { activeStatus.classList.add('offline-profile') }
  if (profile[2] === 'Online') { activeStatus.classList.add('online-profile') }
  // Relationship Status
  if (profile[3] === 'Relationship') { relationshipStat.innerText = 'In a Relationship' }
  if (profile[3] === 'Single') { relationshipStat.innerText = 'Single' }
  if (profile[3] === 'Complicated') { relationshipStat.innerText = 'Complicated' }
  if (profile[3] === 'Open Relationship') { relationshipStat.innerText = 'Open Relationship' }
  profileAge.innerText = profile[1] // Age inserted
  profileName.innerText = profile[4] + ',' // Name inserted
  // Gender and Images Accordingly
  if (profile[0] === 'm') {
    profileGender.innerText = 'Male'
    let randomPic = Math.floor(Math.random() * 9)
    profileImage.setAttribute('src', `./Images/Male Images/${randomPic}.png`)
  }
  if (profile[0] === 'f') {
    profileGender.innerText = 'Female'
    let randomPic = Math.floor(Math.random() * 6)
    profileImage.setAttribute('src', `./Images/Female Images/${randomPic}.png`)
  }
  if (profile[0] === 'n') { profileImage.setAttribute('src', `./Images/Male Images/7.png`) }
  // Appending
  nameAgeActiveDiv.append(profileName, profileAge, activeStatus)
  profileCard.append(relationshipStat, profileGender, nameAgeActiveDiv, profileImage)
  profileContainer.append(profileCard)
  profileCard.addEventListener('click', () => showProfile(profile, profileImage))
  currentProfilesShown++
}


// Only Premium Users Can See More Than 50 Profiles Warning /////////////////////////////////////////////////////////////////////////////

const moreProfilesLimit = document.querySelector('.more-profiles-limit')
const clickHereButton = document.querySelector('.bait-span')

clickHereButton.addEventListener('click', passport)

function appearFiftyProfilesLimit() {
  moreProfilesLimit.style.display = 'block'
}



// Click on the Profile 

function showProfile(a, b) {
  let profile = a
  const openProfile = document.createElement('div')
  let imageSource = b.getAttribute('src')
  let onlineStatus = 'offline'
  if (profile[2] === 'Online') { onlineStatus = 'online' }

  openProfile.classList.add('open-profile')
  openProfile.innerHTML = `
    <i class="close-profile-button material-icons" close-profile-button>highlight_off</i>
    <div class="open-profile-images"> <img class="open-profile-image" src="${imageSource}"> <div class="other-images"> 
      <img src="./Images/open profile images/top.png" alt=""> <img src="./Images/open profile images/mid.png" alt=""> <img src="./Images/open profile images/bottom.png" alt=""> </div> </div>
  <div class="open-profile-id"> <span class="open-profile-name">${profile[4]}</span>, <span class="open-profile-age">${profile[1]}</span> <div class="open-profile-${onlineStatus}"></div> </div>
   <p class="open-profile-description">Hi! It's ${profile[4]}.  I am looking forward to find my one true love here! Text me if you're it. </p>  <div class="open-profile-buttons"> <button class="open-profile-btn text-btn">Text</button> <button class="open-profile-btn poke-btn">Poke</button> </div>`
  openProfile.querySelector('[close-profile-button]').addEventListener('click', hideProfile)
  mainOverlay.append(openProfile)
  mainOverlay.style.display = 'flex'
}

// Close the Profile

function hideProfile() {
  mainOverlay.innerHTML = ''
  mainOverlay.style.display = 'none'
}


export { sortTheUnsorted, createProfiles, profileContainer, currentProfilesShown, makingItZero, appearFiftyProfilesLimit }



