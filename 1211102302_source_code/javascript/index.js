let sections = document.querySelectorAll('section');  //selects all section elements on the page and stores them in a NodeList
let navLinks = document.querySelectorAll('.navbar-element a');

window.onscroll = () => {
    let scrollPosition = window.scrollY + window.innerHeight;

    sections.forEach((sec, index) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {  //This condition checks if the current scroll position top is within the bounds of the current section
            navLinks.forEach(link => {
                link.classList.remove('active');   // iterates over all navigation links and removes the active class from each
                document.querySelector('.navbar-element a[href*=' + id + ']').classList.add('active');  //then adds the active class to the navigation link whose href attribute contains the id of the current section
            });
        }

        // Additional check for the last section
        if (index === sections.length - 1 && scrollPosition >= document.body.scrollHeight) {  // if the current section is the last section and if the scroll position is at or beyond the total height of the document 
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('.navbar-element a[href*=' + id + ']').classList.add('active');
            });
            
        }
    });
};