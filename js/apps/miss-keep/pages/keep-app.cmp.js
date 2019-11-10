'use strict'


import filterNotes from '../cmps/filter-notes.cmp.js'
import previewNotes from '../cmps/preview-notes.cmp.js'
import addNote from '../cmps/add-note.cmp.js'
import userMsg from '../../../general-cmps/user-nsg-general.cmp.js'
export default {
    template: `
    <section class="keep-app container">
    <user-msg></user-msg>
        <h1>Keep App</h1>
        <filter-notes></filter-notes>
        <add-note></add-note>

        <preview-notes></preview-notes> 
             
    </section>
    `,
    components: {
        filterNotes,
        addNote,
        previewNotes,
        userMsg
    }
}