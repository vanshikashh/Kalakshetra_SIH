
// Get all fact boxes and monument boxes
const factBoxes = document.querySelectorAll('.fact-box');
const monumentBoxes = document.querySelectorAll('.monument-box');
const overlay = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

// Function to add click event to pop-up boxes
function addPopupEffect(boxes) {
    boxes.forEach(box => {
        box.addEventListener('click', function() {
            // Hide other boxes and show overlay
            boxes.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            overlay.classList.add('show');
        });
    });
}

addPopupEffect(factBoxes);
addPopupEffect(monumentBoxes);

// Close pop-up when overlay is clicked
overlay.addEventListener('click', function() {
    document.querySelectorAll('.active').forEach(box => box.classList.remove('active'));
    overlay.classList.remove('show');
});

// MONUMENTS
// Function to check if element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to add 'show' class when in viewport
function handleScroll() {
    const monumentBoxes = document.querySelectorAll('.monument-box');
    
    monumentBoxes.forEach(box => {
        if (isInViewport(box)) {
            box.classList.add('show'); // Add class to trigger the transition
        }
    });
}

// Add event listener for scroll
window.addEventListener('scroll', handleScroll);

// Call once to check for visibility on load
handleScroll();


// Existing JavaScript to handle pop-up
const monumentBox = document.querySelectorAll('.monument-box');
const overla = document.createElement('div');
overlay.classList.add('overlay');
document.body.appendChild(overlay);

monumentBoxes.forEach(box => {
    box.addEventListener('click', function() {
        monumentBoxes.forEach(f => f.classList.remove('active')); // Remove active from all
        this.classList.add('active'); // Add active to clicked box
        overlay.classList.add('show');
    });
});

overlay.addEventListener('click', function() {
    monumentBoxes.forEach(box => box.classList.remove('active'));
    overlay.classList.remove('show');
});

// FOOD
// Get all food boxes
const foodBoxes = document.querySelectorAll('.food-box');

// Different scroll-based transition for food boxes
function handleFoodScroll() {
    foodBoxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            box.classList.add('show');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleFoodScroll);

// Call once to check for visibility on load
handleFoodScroll();


//ART
let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    const slides = document.getElementsByClassName("art-slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}

//DANCE

// Get all dance boxes
const danceBoxes = document.querySelectorAll('.dance-box');

// Different scroll-based transition for dance boxes
function handleDanceScroll() {
    danceBoxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            box.classList.add('show');
        }
    });
}

// Add scroll event listener
window.addEventListener('scroll', handleDanceScroll);

// Call once to check for visibility on load
handleDanceScroll();

