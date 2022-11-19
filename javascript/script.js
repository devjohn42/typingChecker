"use strict";

const typingText = document.querySelector("#typingText p");
const inputFiled = document.querySelector("#inputField");

let charPos = 0;

function randomParagraph() {
  //generates a random number that returns a text from the paragraphs array
  let randId = Math.floor(Math.random() * paragraphs.length);
  /*
  taking a random text from the matrix separating all the characters from it 
  adding inside each character inside tag span and then adding all span inside 
  the tag p
  */
  paragraphs[randId].split("").forEach(span => {
    let spanTag = `<span>${span}</span>`;
    typingText.innerHTML += spanTag;
  });

  //makes the input field focus on the keystroke or click event
  document.addEventListener("keydown", () => inputFiled.focus());
  typingText.addEventListener("click", () => inputFiled.focus());
}



randomParagraph();

inputFiled.addEventListener("input", () => {
  const characters = typingText.querySelectorAll("span");
  let typedChar = inputFiled.value.split("")[charPos];
  /*
  if the user types the correct character, the tag will receive the class 
  "correct", otherwise, it will receive the class "incorrect";
  */
  if (typedChar == null) {
    //going back one position and removing the char class
    charPos--;
    characters[charPos].classList.remove("correct", "incorrect")
  } else {
    if (characters[charPos].innerText === typedChar) {
      // console.log("correct");
      characters[charPos].classList.add("correct");
    } else {
      // console.log("incorrect");
      characters[charPos].classList.add("incorrect");
    }

    charPos++; //will increment if the character is right or wrong
  }

  //remove the class to pass it to the next span
  characters.forEach(span => span.classList.remove("active"));
  characters[charPos].classList.add("active");
});