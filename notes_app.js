const addBtn = document.getElementById("add");
// gets saved notes from the local storage.
const notes = JSON.parse(localStorage.getItem("notes"));

if(notes) {
    notes.forEach(note => {
        addNewNote(note);
    });
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

// adds a new note to the window
function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}" placeholder="Write your note here."></textarea>
    `;

    const editBtn = note.querySelector(".edit");
    const deleteBtn = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    // deletes a note from both the window and local storage
    deleteBtn.addEventListener("click", () =>{
        note.remove();
        updateLS();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLS();
    });

    textArea.value = text;
    main.innerHTML = marked(text);
    
    document.body.appendChild(note);
}

// updates the local storage by getting all the values of 'textarea' tag, and then adds then to the local storage.

function updateLS() {
    const notesText = document.querySelectorAll("textarea");

    const notesArr = [];

    notesText.forEach(note => {
        notesArr.push(note.value);
    });

    localStorage.setItem("notes", JSON.stringify(notesArr));
}


















