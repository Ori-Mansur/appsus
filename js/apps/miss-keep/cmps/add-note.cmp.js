'use strict'

import keepService from "../service/miss-keep.service.js"
import {eventBus} from '../../../general-service/event-bus-service.js'

export default {
    template: `
    <section class="add-note">
        <input type="type" v-model="info"/>
        <button :class="{select: type==='text-note'}" @click="setNoteType('text-note')"><img src="img/font.png"></button>
        <button :class="{select: type==='note-img'}" @click="setNoteType('note-img')"><img src="img/001-picture.png"></button>
        <button :class="{select: type==='note-video'}" @click="setNoteType('note-video')"><img src="img/002-youtube.png"></button>
        <button :class="{select: type==='note-audio'}" @click="setNoteType('note-audio')"><img src="img/003-speaker.png"></button>
        <button :class="{select: type==='note-todos'}"@click="setNoteType('note-todos')"><img src="img/004-menu.png"></button>
        <button :class="{select: type==='note-map'}"@click="setNoteType('note-map')"><img src="img/pin.png"></button>
        <button class="add-btn"@click="addNote">add</button>
    
    </section>
    `,
    data() {
        return {
            type: 'text-note',
            info: '',
            color: '',
        }

    },
    created() {
        eventBus.$on('edit', id => {
            keepService.getNoteById(id)
                .then(note => {
                    this.type = note.type
                    this.info = note.info
                    this.color = note.color
                })
        })
    },
    methods: {
        addNote() {
            keepService.addNewNote(this.type, this.info, this.color)
                .then(() => {
                    this.info = '';
                })
        },
        setNoteType(type) {
            this.type = type
            if (type === 'note-todos') this.info = []
        },
        getNoteById() {
            const noteId = this.$route.params.id;
            if (noteId) {
                keepService.getNoteById(noteId)
                    .then(note => this.dogToEdit = note)
            }
        }
    },

}