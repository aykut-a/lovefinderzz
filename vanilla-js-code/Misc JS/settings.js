// Header Button

const mainOverlay = document.querySelector('.overlay-effect')
const headerSettingsButton = document.querySelector('[header-settings-btn]')
headerSettingsButton.addEventListener('click', slideInSettingsSection)
const settingsSection = document.querySelector('[settings-section]')
const saveSettingsButton = document.querySelector('.settings-save-button')


// Settings Section Itself

const closeSettingsButton = document.querySelector('.close-settings-btn')
closeSettingsButton.addEventListener('click', slideOutSettingsSection)
saveSettingsButton.addEventListener('click', slideOutSettingsSection)

function slideInSettingsSection() {
  if (settingsSection.style.display === 'flex') { return }
  settingsSection.style.display = 'flex'
  settingsSection.style.animation = 'slide-in'
  settingsSection.style.animationDuration = '500ms'
  settingsSection.style.animationStyle = "ease-in-out"

  document.addEventListener('mousedown', (e) => {
    if (!settingsSection.contains(e.target) && settingsSection.style.display === 'flex'
      && mainOverlay.style.display !== 'flex') {
      slideOutSettingsSection()
    }
  })

}


function slideOutSettingsSection() {
  settingsSection.style.animation = 'slide-out'
  settingsSection.style.animationDuration = '500ms'
  settingsSection.style.animationStyle = "ease-in-out"
  setTimeout(() => { settingsSection.style.display = 'none' }, 400)
}



// Profile Other Pictures Sliders

let profileOtherPictures = Array.from(document.querySelector('.profile-other-pictures').children)

const slideLeftIcon = document.querySelector('[slide-to-left-icon]')
const slideRightIcon = document.querySelector('[slide-to-right-icon]')

slideLeftIcon.addEventListener('click', () => slidePicturesDiv('left'))
slideRightIcon.addEventListener('click', () => slidePicturesDiv('right'))

let current = 1

function slidePicturesDiv(direction) {
  if (direction === 'left' && current !== 1) { current += -1 }
  if (direction === 'right' && current !== 4) { current += 1 }
  profileOtherPictures.forEach(picture => picture.style.transform = `translate(-${(current - 1) * 80}px)`)
}



export { slideOutSettingsSection, slideInSettingsSection }