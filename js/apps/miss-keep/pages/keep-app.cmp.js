'use strict'


import filterNotes from '../cmps/filter-notes.cmp.js'
import previewNotes from '../cmps/preview-notes.cmp.js'
import addNote from '../cmps/add-note.cmp.js'
export default {
    template: `
    <section class="keep-app container">
        <h1>Keep App</h1>
        <filter-notes></filter-notes>
        <add-note></add-note>

        <preview-notes></preview-notes> 
             
    </section>
    `,
    components: {
        filterNotes,
        addNote,
        previewNotes
    }
}