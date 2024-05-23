// form script

// const form = document.querySelector('[data-js="form"]');
// const formTextarea = form.querySelector('[data-js="form-textarea"]');
// const charCount = form.querySelector('[data-js="form-char-count"]');

// if (form) {
//   formTextarea.addEventListener('input', (e) => {
//     const maxLength = parseInt(formTextarea.getAttribute('maxlength'));
//     const currentLength = e.target.value.length;

//     if (currentLength <= maxLength) {
//       charCount.textContent = maxLength - currentLength;
//     } else {
//       formTextarea.value = formTextarea.value.substring(0, maxLength);
//       charCount.textContent = maxLength - formTextarea.value.length;
//     }

//   });
// }