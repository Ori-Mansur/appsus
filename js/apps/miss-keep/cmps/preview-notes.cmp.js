'use strict'

import keepService from "../service/miss-keep.service.js"

import textNote from '../cmps/text-note.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
export default{
    template:`
    <section class="notes-preview">
  
            <component v-for="(note, idx) in notes" :is="note.type"  :note="note"></component>
           
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
        textNote,
        noteImg,
        noteVideo,
    }
}