// index.js

// DECLARED VARIABLES
const baseUrl = 'http://localhost:3000'
const ramenMenuDiv = document.querySelector('#ramen-menu')
const displayImage = document.querySelector('.detail-image')
const displayName = document.querySelector('.name')
const displayRestaurant = document.querySelector('.restaurant')
const displayRating = document.querySelector('#rating-display')
const displayComment = document.querySelector('#comment-display')

// FUNCTIONS

// function displayRamens(ramen) appends a rendered ramen to the ramenMenuDiv
// params: ramen object that contains info of id, name, restaurant, img, rating, and comment
function displayRamens(ramen) {

  // create image of ramen for ramen menu and assign source and img description
  const ramenImage = document.createElement('img')
  ramenImage.src = ramen.image
  ramenImage.alt = ramen.name

  // add click event listener that displays info of the clicked ramen 
  ramenImage.addEventListener('click', () => handleClick(ramen))
  ramenMenuDiv.append(ramenImage)
}

// function handleClick(ramen) renders details for the selected ramen
// params: ramen, ramen object to be rendered
function handleClick(ramen) {
  displayImage.src = ramen.image
  displayImage.alt = ramen.image
  displayName.textContent = ramen.name
  displayRestaurant.textContent = ramen.restaurant
  displayRating.textContent = ramen.rating
  displayComment.textContent = ramen.comment
}

// function addSubmitListener() adds a submit event listener that creates a new ramen
function addSubmitListener() {
  // grab form using DOM and attach event listener
  const form = document.querySelector('#new-ramen')
  form.addEventListener('submit', e => addRamen(e))
}

// function addRamen(e)
// params: e, event attached to form that submits information for new ramen
function addRamen(e) {
  e.preventDefault()

  // create new ramen object
  const newRamen = {
    name: e.target[0].value,
    restaurant: e.target[1].value,
    image: e.target[2].value,
    rating: e.target[3].value,
    comment: e.target[4].value,
  }

  // stringify ramen object and add to db.json
  fetch(baseUrl + '/ramens', {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newRamen)
  })
  .then(response => response.json())
  .then(ramen => {
    // display ramen once added and reset the new ramen form
    displayRamens(ramen)
    e.target.reset()
  })
}

// main function that calls child functions to properly display the page
const main = () => {
  // fetches content from local server and displays ramen using displayRamens()
  document.addEventListener('DOMContentLoaded', () => {
    fetch(baseUrl + '/ramens')
    .then(response => response.json())
    .then(ramens => ramens.forEach(ramen => displayRamens(ramen)))
  })

  // once content has been loaded, adds submit listener to the
  addSubmitListener()
}

main()

export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
}