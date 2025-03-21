const notesContainer = document.querySelector(".notes-container");
const createBtn = document.querySelector(".btn");
let notes = document.querySelectorAll(".input-box");

function showNotes(){
  const storedNotes = localStorage.getItem("notes");
  if (storedNotes) {
    notesContainer.innerHTML = storedNotes;
    // Re-attach event listeners to the notes after loading from localStorage
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
      nt.onkeyup = function(){
        updateStorage();
      }
    });
  }
}
showNotes();

function updateStorage(){
  localStorage.setItem("notes", notesContainer.innerHTML);
  console.log("Notes updated in localStorage:", localStorage.getItem("notes"));
}

createBtn.addEventListener("click", () => {
  let inputBox = document.createElement("p");
  let img = document.createElement("img");
  inputBox.className = "input-box";
  inputBox.setAttribute("contenteditable", "true");
  img.src = "images/delete.png";
  img.className = "delete"; // Add a class to the delete image
  inputBox.appendChild(img); // Append the image to the inputBox
  notesContainer.appendChild(inputBox);
  updateStorage(); // Update storage after adding a new note

  // Attach event listener to the new note
  inputBox.onkeyup = function(){
    updateStorage();
  };
});

notesContainer.addEventListener("click", function(e){
  if(e.target.tagName === "IMG" && e.target.classList.contains("delete")){
    e.target.parentElement.remove();
    updateStorage();
  }
  else if(e.target.tagName === 'P'){
    notes = document.querySelectorAll(".input-box");
    notes.forEach(nt => {
      nt.onkeyup = function(){
        updateStorage();
      }
    });
  }
});