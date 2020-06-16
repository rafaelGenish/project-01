function Notes(text, date, time) {
    this.text = text;
    this.date = date;
    this.time = time;
}

// function createNoteElement(text, date, time) {
    
    
 
// }

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
    // const theNote = document.createElement('div');
    
    const newNote = new Notes(text.value, date.value, time.value);
    const theNote = document.createElement('div');
    theNote.classList = 'note';
    theNote.innerHTML = `<div class="text-note">Your note:<br>${text.value}</div>
    <div class="date-note">date: ${date.value}</div>
    <div class="time-note">time: ${time.value}</div>
    <div id="dlt" class="delete  delete-fade-out"/>`
    list.push(newNote);
    localStorage.setItem('current', JSON.stringify(list))
    
    // const theNote = createNoteElement(text.value, date.value, time.value)
    document.getElementById('notes-zone').appendChild(theNote);
    
    text.focus()
    const deleteBtn = theNote.getElementsByClassName('delete')[0]
    
    theNote.addEventListener('mouseenter', (e) => {
        deleteBtn.classList.remove('delete-fade-out')
        deleteBtn.classList.add('delete-fade-in')
    })
    
    theNote.addEventListener('mouseleave', (e) => {
        deleteBtn.classList.remove('delete-fade-in')
        deleteBtn.classList.add('delete-fade-out')
    })

    deleteBtn.addEventListener('click' , () => {
        deleteBtn.parentElement.remove()
        list.splice(list.indexOf(newNote), 1);
        localStorage.setItem('current', JSON.stringify(list))
    })
})

document.addEventListener('DOMContentLoaded', (e) => {
    const loadedList = JSON.parse(localStorage.getItem('current'));
    for (let i = 0; i < loadedList.length; i++) {
        let note = loadedList[i];
        list.push(note);
 
        const loadNote = new Notes(note.text, note.date, note.time);
        const theNote = document.createElement('div');
    theNote.classList = 'note';
    theNote.innerHTML = `<div class="text-note">Your note:<br>${loadNote.text}</div>
    <div class="date-note">date: ${loadNote.date}</div>
    <div class="time-note">time: ${loadNote.time}</div>
    <div id="dlt" class="delete  delete-fade-out"/>`
        document.getElementById('notes-zone').appendChild(theNote);
        
        const deleteBtn = theNote.getElementsByClassName('delete')[0]

        theNote.addEventListener('mouseenter', (e) => {
            deleteBtn.classList.remove('delete-fade-out')
            deleteBtn.classList.add('delete-fade-in')
        })
        
        theNote.addEventListener('mouseleave', (e) => {
            deleteBtn.classList.remove('delete-fade-in')
            deleteBtn.classList.add('delete-fade-out')
        })
    
        deleteBtn.addEventListener('click' , () => {
            deleteBtn.parentElement.remove()
            list.splice(list.indexOf(note), 1);
            localStorage.setItem('current', JSON.stringify(list))
        })
    }
 
    document.getElementById('text').focus()
    return newNote
 });

