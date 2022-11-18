"use strict";

const typingText = document.querySelector("#typingText p");
const inputFiled = document.querySelector("#inputField");

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
  let typedChar = inputFiled.value.split("");
  console.log(typedChar);
});