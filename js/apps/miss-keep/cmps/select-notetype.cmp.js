'use strict'

import keepService from "../service/miss-keep.service.js"
import { eventBus } from '../../../general-service/event-bus-service.js'
import tools from './tools.cmp.js'

export default {
    props: ['type'],
    template: `
    <section class="select-note-type">  
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
    </section>
    `,
    methods: {
        setNoteType(type) {
            this.$emit('setType', type)
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
            return { select: this.type === 'note-audio' }
        },
        noteTodos() {
            return { select: this.type === 'note-todos' }
        },
        noteMap() {
            return { select: this.type === 'note-map' }
        },
    }


}