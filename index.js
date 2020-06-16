function Notes(text, date, time) {
    this.text = text;
    this.date = date;
    this.time = time;
}

function createNoteElement(text, date, time) {
    const theNote = document.createElement('div');
    theNote.classList = 'note';
    theNote.innerHTML = `<div class="text-note">Your note:<br>${text}</div>
    <div class="date-note">date: ${date}</div>
    <div class="time-note">time: ${time}</div>
    <div id="dlt" class="delete  delete-fade-out"/>`
    
    const deleteBtn = theNote.getElementsByClassName('delete')[0]
    
    theNote.addEventListener('mouseenter', (e) => {
        deleteBtn.classList.remove('delete-fade-out')
        deleteBtn.classList.add('delete-fade-in')
    })
    
    theNote.addEventListener('mouseleave', (e) => {
        deleteBtn.classList.remove('delete-fade-in')
        deleteBtn.classList.add('delete-fade-out')
    })
    
    deleteBtn.addEventListener('click', () => {
        list.splice(list.indexOf(theNote.text), 1)
        console.log(list)
        deleteBtn.parentElement.remove()    
        localStorage.setItem('current', JSON.stringify(list))
    })

    return theNote
}
let list = [];
let newNote = null;
document.getElementById('add').addEventListener('click', () => {
    const text = document.getElementById('text');
    const date = document.getElementById('date');
    const time = document.getElementById('time');

    if (text.value === '') {
        text.focus()
        return
    }
   
    const newNote = new Notes(text.value, date.value, time.value);
    list.push(newNote);
    localStorage.setItem('current', JSON.stringify(list))
    
    const theNote = createNoteElement(text.value, date.value, time.value)
    document.getElementById('notes-zone').appendChild(theNote);
    
    text.focus()
})

document.getElementById('rmv').addEventListener('click', () => {
    text.value = '';
    date.value = '';
    time.value = '';
    text.focus()
})

document.addEventListener("DOMContentLoaded", function(event) {
   const loadedList = JSON.parse(localStorage.getItem('current'));
   for (let i = 0; i < loadedList.length; i++) {
       const note = loadedList[i];
       list.push(note);

       const theNote = createNoteElement(note.text, note.date, note.time)
       document.getElementById('notes-zone').appendChild(theNote);
   }

   document.getElementById('text').focus()
   return newNote
});