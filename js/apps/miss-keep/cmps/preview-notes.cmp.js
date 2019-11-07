'use strict'

import keepService from "../service/miss-keep.service.js"
import { eventBus } from '../../../general-service/event-bus-service.js'

import textNote from '../cmps/text-note.cmp.js'
import noteImg from '../cmps/note-img.cmp.js'
import noteVideo from '../cmps/note-video.cmp.js'
import noteTodos from '../cmps/note-todos.cmp.js'
import noteEmail from '../cmps/note-email.cmp.js'
export default {
    template: `
    <section class="notes-preview">
        <h3>Pinned Notes</h3>
        <div class="pin-notes">
            <component v-for="(note, idx) in pinNotes" :is="note.type" 
                :key="note.id" :note="note" @update="updateNote" @mark="markTodo">
            </component>
        </div>
        <h3>Others</h3>
        <div class="all-notes">
            <component v-for="(note, idx) in notesToShow" :is="note.type" 
                :key="note.id" :note="note" @update="updateNote" @mark="markTodo">
            </component>
        </div>     
    </section>
    `,
    data() {
        return {
            notes: null,
            filterBy: null
        }
    },
    methods: {
        updateNote(details) {
            keepService.updateNote(details)
        },
        markTodo(todoDetails) {
            keepService.markTodo(todoDetails)
        }
    },
    created() {
        this.notes = keepService.getNotes();
        eventBus.$on('filterd', filterBy => {
            this.filterBy = filterBy
        })
    },
    computed: {
        notesToShow() {
            var otherNotes = this.notes.filter(note => note.pin !== true)
            if (!this.filterBy) return otherNotes
            var regex = new RegExp(`${this.filterBy.type}`, 'i');
            return otherNotes.filter(note =>
                regex.test(note.type)
            )
        },
        pinNotes() {
            var pinNotes = this.notes.filter(note => note.pin === true)
            if (!pinNotes) return
            return pinNotes
        }
    },
    components: {
        textNote,
        noteImg,
        noteVideo,
        noteTodos,
        noteEmail
    }
}