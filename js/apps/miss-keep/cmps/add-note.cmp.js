'use strict'

import keepService from "../service/miss-keep.service.js"
import { eventBus } from '../../../general-service/event-bus-service.js'
import tools from './tools.cmp.js'

export default {
    template: `
    <section class="add-note">
        <input type="type" v-model="info"/>
        <button class="type-btn" :class="textNote" @click="setNoteType('text-note')">
            <img src="img/font.png">
        </button>
        <button class="type-btn" :class="noteImg" @click="setNoteType('note-img')">
            <img src="img/001-picture.png">
        </button>
        <button class="type-btn" :class="noteVideo" @click="setNoteType('note-video')">
            <img src="img/002-youtube.png">
        </button>
        <button class="type-btn" :class="noteAudio" @click="setNoteType('note-audio')">
            <img src="img/003-speaker.png">
        </button>
        <button class="type-btn" :class="noteTodos"@click="setNoteType('note-todos')">
            <img src="img/004-menu.png">
        </button>
        <button class="type-btn" :class="noteMap"@click="setNoteType('note-map')">
            <img src="img/pin.png">
        </button>
        <tools :noteId="id" @update="updateNote"></tools>
        <button class="add-btn select"@click="addNote">add</button>
    
    </section>
    `,
    data() {
        return {
            type: 'text-note',
            info: '',
            color: '',
            id: '',
            pin: false
        }

    },
    created() {
        eventBus.$on('edit', id => {
            keepService.getNoteById(id)
                .then(note => {
                    this.type = note.type
                    this.info = note.info
                    this.color = note.color
                    this.id = note.id
                })
        })
    },
    methods: {
        addNote() {
            if (this.id) keepService.editNote(this.id, this.type, this.info, this.color)
                .then(() => {
                    this.id = '';
                    this.info = '';
                })
            else keepService.addNewNote(this.type, this.info, this.color)
                .then(() => {
                    this.info = '';
                })
        },
        setNoteType(type) {
            this.type = type
            if (type === 'note-todos') this.info = []
        },
        updateNote(details) {
            if (details.type === 'edit') return
            else if (details.type === 'remove') {
                this.info = ''
                this.color = ''
                this.pin = false
            } else if (details.type === 'pin') this.pin = true
            else this.color = details.type

        },
    },
    computed: {
        textNote() {
            return { select: this.type === 'text-note' }
        },
        noteImg() {
            return { select: this.type === 'note-img' }
        },
        noteVideo() {
            return { select: this.type === 'note-video' }
        },
        noteAudio() {
            return {select: this.type==='note-audio'}
        },
        noteTodos() {
            return {select: this.type==='note-todos'}
        },
        noteMap() {
            return {select: this.type==='note-map'}
        }
    },
    components: {
        tools
    }

}