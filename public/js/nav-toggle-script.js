// Get the navbar
let nav = document.getElementById("js-mobile-nav");

/* Open when someone clicks on #nav-toggle-btn */
function toggleNav() { 
  if (nav.style.width == "100%" ) {
    document.getElementById("js-btn--mobile-toggle").classList.remove("change");
    nav.removeAttribute("style");
  } else  {
    nav.style.width = "100%";
    document.getElementById("js-btn--mobile-toggle").classList.add("change");
  }
}

/* Close Overlay */
function closeNav() {
  document.getElementById("js-btn--mobile-toggle").classList.remove("change");
  if (window.screen.width <= 700) {
    nav.removeAttribute("style");
    
  } 

}



/* Mobile Menu Toogle */
function navButton(x) {
  x.classList.toggle("change");
}
