'use strict'

import surveyService from '../service/survey.service.js'
import keepService from "../service/miss-keep.service.js"
import filterNotes from '../cmps/filter-notes.cmp.js'
import previewNotes from '../cmps/preview-notes.cmp.js'
import addNote from '../cmps/add-note.cmp.js'
export default {
    template: `
    <section class="keep-app">
        <h1>Keep App</h1>
        <filter-notes></filter-notes>
        <add-note></add-note>

        <preview-notes></preview-notes> 
             
    </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    created() {
        this.notes = keepService.getNotes();
    },
    components: {
        filterNotes,
        addNote,
        previewNotes
    }
}