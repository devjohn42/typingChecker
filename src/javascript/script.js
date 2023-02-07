"use strict";

const typingText = document.querySelector("#typingText p");
const inputFiled = document.querySelector("#inputField");
const timerTag = document.querySelector("#time span b");
const mistakesTag = document.querySelector("#mistakes span");
const wpmTag = document.querySelector("#wpm span"); //word per minute
const cpmTag = document.querySelector("#cpm span");
const tryAgainBtn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
// let timer, maxTime = 60, timeLeft = maxTime;

let charPos = 0;
let mistakes = 0;
let isTyping = 0;
// let charPos = 0, mistakes = 0, isTyping = 0;

function randomParagraph() {
  //generates a random number that returns a text from the paragraphs array
  let randId = Math.floor(Math.random() * paragraphs.length);
  typingText.innerHTML = "";
  /*
  taking a random text from the matrix separating all the characters from it 
  adding inside each character inside tag span and then adding all span inside 
  the tag p
  */
  paragraphs[randId].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });
  //the first character is active with the underline
  typingText.querySelectorAll("span")[0].classList.add("active");
  //makes the input field focus on the keystroke or click event
  document.addEventListener("keydown", () => inputFiled.focus());
  typingText.addEventListener("click", () => inputFiled.focus());
}

randomParagraph();

inputFiled.addEventListener("input", () => {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputFiled.value.split("")[charPos];
  if (charPos < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      // when the timer is started it will not restart again with each key press
      timer = setInterval(() => {
        if (timeLeft > 0) {
          timeLeft--;
          timerTag.innerText = timeLeft;
        } else {
          clearInterval(timer);
        }
      }, 1000);
      isTyping = true;
    }
    //if user hasn't entered any character or pressed backspace
    if (typedChar == null) {
      charPos--; //going back one position and removing the char class
      if (characters[charPos].classList.contains("incorrect")) {
        //going back and remove the mistakes only if the charIndex span contains
        //incorrect class
        mistakes--;
      }
      characters[charPos].classList.remove("correct", "incorrect")
    } else {
      if (characters[charPos].innerText === typedChar) {
        //if the character typed by the user and the character shown match, 
        //add the correct class, 
        characters[charPos].classList.add("correct");
      } else {
        //else increment the mistakes and add the incorrect class
        mistakes++;
        characters[charPos].classList.add("incorrect");
      }

      charPos++; //will increment if the character is right or wrong
    }

    //remove the class to pass it to the next span
    characters.forEach(span => span.classList.remove("active"));
    characters[charPos].classList.add("active");

    //simply count all typed entries and divide by five to get the number 
    //of words typed
    let wpm = Math.round((((charPos - mistakes) / 5) / (maxTime - timeLeft)) * 60);
    //
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakesTag.innerText = mistakes;
    wpmTag.innerText = wpm;
    cpmTag.innerText = charPos - mistakes; // will not count the mistakes

  } else {
    inputFiled.value = "";
    clearInterval(timer);
  }
});

tryAgainBtn.addEventListener("click", () => {
  //resetting each variables and lements value to default;
  randomParagraph();
  inputFiled.value = "";
  clearInterval(timer);
  timeLeft = maxTime;
  charPos = 0;
  mistakes = 0;
  isTyping = 0;
  timerTag.innerText = timeLeft;
  mistakesTag.innerText = mistakes;
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
})