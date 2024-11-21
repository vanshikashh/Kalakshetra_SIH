document.addEventListener('DOMContentLoaded', function () {
    const parallax = document.querySelector(".parallax");

    // Function to handle the scroll event for the parallax animation
    function handleScroll() {
        const parallaxPosition = parallax.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (parallaxPosition < windowHeight * 0.8) { // Trigger if the element is 80% in view
            parallax.classList.add("animated");
            window.removeEventListener("scroll", handleScroll); // Remove the listener after animation is triggered
        }
    }

    // Attach scroll event listener for parallax animation
    window.addEventListener("scroll", handleScroll);

    // Check on page load as well
    handleScroll();

    // Function to check if an element is in the viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to add slide-in animation to category cards
    function slideInCategories() {
        const cards = document.querySelectorAll('.category-card');

        // Specify which categories should slide from right
        const rightSlideCategories = ["Pottery & Ceramics", "Woodcraft & Carvings", "Paintings & Wall Art"];

        cards.forEach((card) => {
            if (isInViewport(card)) {
                // Get the category name from the card
                const categoryName = card.querySelector('h3').innerText;

                // Apply the right or left animation based on the category name
                if (rightSlideCategories.includes(categoryName)) {
                    card.classList.add('slide-in-left');
                } else {
                    card.classList.add('slide-in-right');
                }
            }
        });
    }

    // Attach event listener for scrolling to handle category cards animation
    window.addEventListener('scroll', slideInCategories);

    // Call the function on page load as well
    slideInCategories();

    let slideIndex = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? 'flex' : 'none';
  });
}

function moveSlide(n) {
  slideIndex += n;
  if (slideIndex >= slides.length) slideIndex = 0;
  if (slideIndex < 0) slideIndex = slides.length - 1;
  showSlide(slideIndex);
}

showSlide(slideIndex);

});
