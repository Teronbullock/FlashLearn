// get flashcard
const flashcards = document.querySelectorAll('[data-js="flashcard"]');
const cardColor = document.querySelector('[data-js="card-color"]');
const cardTextColor = document.querySelector('[data-js="card-text-color"]');
const resetColorBtn = document.querySelector('[data-js="card-color-reset"]');

if (resetColorBtn) {
  resetColorBtn.addEventListener( 'click', () => {
    cardColor.value = '#ffffff';
    cardTextColor.value = '#000000';
  });
}


class FlashCard {
  constructor(el) {
    this.el = el;

    this.frontFlipBtn = this.el.querySelector('[data-js="flashcardFrontFlipBtn"]');
    this.backFlipBtn = this.el.querySelector('[data-js="flashcardBackFlipBtn"]');
    this.flashCardInner = this.el.querySelector('[data-js="flashcardInner"]');
    this.flashCardFront = this.el.querySelector('[data-js="flashcardFront"]');
    this.flashCardBack = this.el.querySelector('[data-js="flashcardBack"]');
    this.cardBackHeight = this.flashCardBack.offsetHeight;
    this.cardFrontHeight = this.flashCardFront.offsetHeight;

    // methods
    this.flipFront();
    this.flipBack();
  }

  // add flipped class to flashcard
  flipFront() {
    let self = this;

    self.frontFlipBtn.addEventListener( 'click', () => {
      self.el.classList.add('flashcard--flipped');
      self.setInnerHeight();
    });
  }


  // remove flipped class from flashcard
  flipBack() {
    let self = this;

    self.backFlipBtn.addEventListener( 'click', () => {
      self.el.classList.remove('flashcard--flipped');
      self.setInnerHeight();
    });
  }

  // set inner height of flashcard
  setInnerHeight() {
    let self = this;

    if (this.el.classList.contains('flashcard--flipped')) {
      self.flashCardInner.style.height = `${self.cardBackHeight}px`;
    } else {
      self.flashCardInner.style.height = `${self.cardFrontHeight}px`;;
    }
  }
}


// instantiate new flashcard
flashcards.forEach((flashcard) => {
  new FlashCard(flashcard);
});