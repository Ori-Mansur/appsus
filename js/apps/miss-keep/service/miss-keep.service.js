'use strict'
import surveyService from './survey.service.js'
export default {
    getEmptyNoteByType,
    addNewNote,
    getNotes
}
var gNextId=102
var gNotes = [{
    id:101,
    type: 'text-note',
    info: 'blabla'
    
}]


function getNotes(){
    var notes
    return gNotes
}


function getEmptyNoteByType(type) {
    var notes = surveyService.getById()
    var emptyNote = notes.cmps.find(cmp => cmp.type === type)
    return Promise.resolve(emptyNote)
}

function addNewNote(type,info) {
    if(type==='note-video')info=_getParameterByName('v', info)
    gNotes.unshift({id:gNextId++,type,info})
    console.log(gNotes);
    
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