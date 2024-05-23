// Get the navbar
const nav = document.querySelector('[data-js="nav"]');
const navToggle = document.querySelector('[data-js="btn-mobile-toggle"]');


function toggleNav() { 
  if (nav.classList.contains("open") ) {
    navToggle.classList.remove("change");
    nav.classList.remove("open");
  } else  {
    nav.classList.add("open");
    navToggle.classList.add("change");
  }
}


navToggle.addEventListener("click", toggleNav );