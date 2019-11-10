'use strict'
import utilsService from '../../../../lib/utils.js'
export default {
    addNewNote,
    getNotes,
    updateNote,
    getNoteById,
    editNote,
    markTodo
}
var gNextId = 104
var gNotes = [{
    id: 101,
    type: 'text-note',
    title: 'important',
    info: 'blabla',
    color: 'white',
    pin: false

},
{
    id: 102,
    type: 'note-img',
    title: 'car',
    info: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3KjW6-2hhv4GMdYLAqC3kRS3GFE-dy46Q1tCFJ8sq2XgSitt&s',
    color: 'white',
    pin: false
},
{
    id: 103,
    type: 'note-video',
    title: '6',
    info: 'https://www.youtube.com/embed/iSgUMPHQEWw',
    color: 'white',
    pin: false
},
]


function getNotes() {
    var notesFromEmail = utilsService.load('email-toKeep')
    if (notesFromEmail) {
        getNoteById(notesFromEmail.id)
            .catch(() => addEmailNote(notesFromEmail))

    }

    var notes = utilsService.load('notes')
    return gNotes
}
function getNoteById(id) {
    var note = gNotes.find(note => id === note.id)
    if (note) return Promise.resolve(note)
    else return Promise.reject()

}
function addEmailNote(email) {
    gNotes.unshift({
        id: email.id, type: 'note-email', title: 'email',
        info: [email.subject, email.body], color: 'greenyellow', pin: false
    })

}

function addNewNote(note) {
    let newNote = note
    if (note.type === 'note-todos') {
        newNote.info = note.info.split(',').map(todo => {
            return { id: utilsService.makeId(3), isDone: false, todo }
        })
    }
    if (note.type === 'note-video'){
        newNote.info =`https://www.youtube.com/embed/`+ _getParameterByName('v', note.info)
    } 
    newNote.id = utilsService.makeId(3)
    gNotes.unshift(newNote)
    return Promise.resolve()
}

function updateNote(details) {
    if (details.type === 'remove') removeNote(details)
    else if (details.type === 'pin') pinNote(details)
    else if (details.type === 'send') sendNote(details)
    else changeNoteColor(details)
    return Promise.resolve()
}
function sendNote(details){
    var note = gNotes.find(note => details.id === note.id)
    utilsService.store('note toEmail',note)
    return Promise.resolve()
}
function pinNote(details) {
    var note = gNotes.find(note => details.id === note.id)
    note.pin = !note.pin
    return Promise.resolve()
}
function changeNoteColor(details) {
    var note = gNotes.find(note => details.id === note.id)
    note.color = details.type
    return Promise.resolve()
}
function removeNote(details) {
    var idx = gNotes.findIndex(note => details.id === note.id)
    gNotes.splice(idx, 1)
    return Promise.resolve()
}
function editNote(editNote) {
    var idx = gNotes.findIndex(note => editNote.id === note.id)
    gNotes.splice(idx, 1, editNote)
    return Promise.resolve()
}
function markTodo(todoDetails) {
    var note = gNotes.find(note => note.id === todoDetails.noteId)
    var todo = note.info.find(todo => todo.id === todoDetails.todoId)
    todo.isDone = !todo.isDone
    return Promise.resolve()
}

function _getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}