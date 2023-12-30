// Get the navbar
let nav = document.querySelector('[data-js="nav"]');

/* Open when someone clicks on #nav-toggle-btn */
function toggleNav() { 
  if (nav.classList.contains("open") ) {
    document.getElementById("js-btn-mobile-toggle").classList.remove("change");
    nav.classList.remove("open");
  } else  {
    nav.classList.add("open");
    document.getElementById("js-btn-mobile-toggle").classList.add("change");
  }
}

/* Close Overlay */
function closeNav() {
  document.getElementById("js-btn-mobile-toggle").classList.remove("change");
  if (window.screen.width <= 700) {
    nav.removeAttribute("style");
    
  } 

}


/* Mobile Menu Toogle */
function navButton(x) {
  x.classList.toggle("change");
}
