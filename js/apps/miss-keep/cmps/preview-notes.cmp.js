'use strict'

import keepService from "../service/miss-keep.service.js"

import textNote from '../cmps/text-note.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
export default{
    template:`
    <section class="notes-preview">
    <div v-for="(note, idx) in notes" v-if="notes" >  
            <component :is="note.type"  :note="note"></component>
        </div>    
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