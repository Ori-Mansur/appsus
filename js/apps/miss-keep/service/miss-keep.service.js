'use strict'
import surveyService from './survey.service.js'
export default {
    getEmptyNoteByType,
    addNewNote,
    getNotes,
    updateNote,
    getNoteById
}
var gNextId = 104
var gNotes = [{
    id: 101,
    type: 'text-note',
    info: 'blabla',
    color: 'greenyellow'

},
{
    id: 102,
    type: 'note-img',
    info: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQl3KjW6-2hhv4GMdYLAqC3kRS3GFE-dy46Q1tCFJ8sq2XgSitt&s',
    color: 'greenyellow'
},
{
    id: 103,
    type: 'note-video',
    info: 'iSgUMPHQEWw',
    color: 'greenyellow'
},
]


function getNotes() {
    var notes
    return gNotes
}
function getNoteById(id) {
    var note = gNotes.find(note => id === note.id)
    return Promise.resolve(note)

}

function getEmptyNoteByType(type) {
    var notes = surveyService.getById()
    var emptyNote = notes.cmps.find(cmp => cmp.type === type)
    return Promise.resolve(emptyNote)
}

function addNewNote(type, val, color) {
    let info = val
    if (type === 'note-todos') {
        info = val.split(',').map(todo => {
            return { id: '', isDone: false, todo }
        })
    }
    console.log(info);
    if (type === 'note-video') info = _getParameterByName('v', val)
    gNotes.unshift({ id: gNextId++, type, info, color })
    // console.log(gNotes);

    return Promise.resolve()
}

function updateNote(details) {
    console.log(details);
    if (details.type === 'remove') removeNote(details)
    else if (details.type === 'edit') editNote(details)
    else if (details.type === 'pin') pinNote(details)
    else changeNoteColor(details)
}
function changeNoteColor(details) {
    var note = gNotes.find(note => details.id === note.id)
    note.color = details.type
}
function removeNote(details) {
    var idx = gNotes.findIndex(note => details.id === note.id)
    gNotes.splice(idx, 1)
}
function editNote(details) {
    var idx = gNotes.find(note => details.id === note.id)

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