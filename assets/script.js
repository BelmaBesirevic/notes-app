const noteBtn = document.getElementById('add-btn'),
  noteTitle = document.getElementById('note-title'),
  noteText = document.getElementById('note-text'),
  clear = document.getElementById('clear')

function getNotes() {
  let notes = localStorage.getItem('notes')
  if (notes == null) {
    notesObj = []
  } else {
    notesObj = JSON.parse(notes)
  }
}

// noteBtn event listener
noteBtn.addEventListener('click', (e) => {
  e.preventDefault()
  if (noteTitle.value == '' || noteText.value == '') {
    return alert('Please add note title and details')
  }

  getNotes()

  let myObj = {
    title: noteTitle.value,
    text: noteText.value,
  }

  notesObj.push(myObj)
  localStorage.setItem('notes', JSON.stringify(notesObj))

  document.querySelector('form').reset()
  showNotes()
})

// function show notes on page
function showNotes() {
  getNotes()
  let html = ''
  notesObj.forEach(function (element, index) {
    html += `
    <div class="note">
    <hr />
      <div class="notes-cta">
        <p class="note-counter">Note ${index + 1}</p>
        <div class="note-cta-btn">
          <button id="${index}" onClick="deleteNote(this.id)" class="btn btn-danger">
            <i class="fa-solid fa-trash"></i>
            Delete
          </button>
          <button id="${index}" onClick="editNote(this.id)" class="btn btn-warning">
            <i class="fa-solid fa-pen-to-square"></i>
            Edit
          </button>
        </div>
      </div>
      <h3 class="note-title">Title: ${element.title}</h3>
      <p class="note-text">${element.text}</p>
    </div>
    `
  })
  let noteEl = document.getElementById('notes')

  if (notesObj.length != 0) {
    noteEl.innerHTML = html
  } else {
    noteEl.innerHTML = 'No notes added, please add a note.'
  }
}

// Delete a single note
function deleteNote(index) {
  let confirmDel = confirm('Delete this note?')

  if (confirmDel) {
    getNotes()
    notesObj.splice(index, 1)
    localStorage.setItem('notes', JSON.stringify(notesObj))
    showNotes()
  }
}

// Delete all notes
clear.addEventListener('click', () => {
  let confirmDel = confirm('Delete all notes?')
  if (confirmDel) {
    localStorage.clear()
    showNotes()
  }
})

// Edit note

function editNote(index) {
  if (noteTitle.value != '' || noteText.value != '') {
    return alert('Please clear the form, before editing the note.')
  }
  getNotes()
  noteTitle.value = notesObj[index].title
  noteText.value = notesObj[index].text
  notesObj.splice(index, 1)
  localStorage.setItem('notes', JSON.stringify(notesObj))
  showNotes()
}

showNotes()
