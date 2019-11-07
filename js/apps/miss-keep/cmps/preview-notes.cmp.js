'use strict'

import keepService from "../service/miss-keep.service.js"
import { eventBus } from '../../../general-service/event-bus-service.js'

import textNote from '../cmps/text-note.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
export default {
    template: `
    <section class="notes-preview">
  
            <component v-for="(note, idx) in notes" :is="note.type" :key="note.id" :note="note" @update="updateNote"></component>
           
    </section>
    `,
    data() {
        return {
            notes: null
        }
    },
    methods: {
        updateNote(details) {
            keepService.updateNote(details)
        },

    },
    created() {
        this.notes = keepService.getNotes();
        // eventBus.$on('email-toKeep', email => {
        //     console.log(email);
            
        // })
    },
    components: {
        textNote,
        noteImg,
        noteVideo,
        noteTodos
    }
}