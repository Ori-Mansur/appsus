'use strict'

import keepService from "../service/miss-keep.service.js"
import { eventBus } from '../../../general-service/event-bus-service.js'
import tools from './tools.cmp.js'

export default {
    template: `
    <section class="add-note">
        <div class="add-note-action flex align-center">
            <input class="input-note" type="type" v-model="note.info" :placeholder="[[instructions]]"/>
          
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
        </div> 
        <transition name="slide-fade">
        <input v-show="note.info" v-model="note.title" class="input-note-title" type="type" placeholder="Give it a title..."/>
        </transition>
        <div class="add-btn-conteiner"> 
            <button class="add-btn select"@click="addNote">Add</button>
            
            <button v-if="note.id" class="add-btn select"@click="emptyNote">Cancel</button>
</div>
    
    </section>
    `,
    data() {
        return {
            note: {
                type: 'text-note',
                title: '',
                info: '',
                color: '',
                id: '',
                pin: false
            }
        }
    },
    created() {
        eventBus.$on('edit', id => {
            keepService.getNoteById(id)
                .then(note => {
                    this.note = note
                })
        })
    },
    methods: {
        addNote() {
            if (this.note.id) keepService.editNote(this.note)
                .then(() => this.emptyNote())
            else keepService.addNewNote(this.note)
                .then(() => this.emptyNote())
        },
        setNoteType(type) {
            this.note.type = type

        },
        updateNote(details) {
            if (details.type === 'edit') return
            else if (details.type === 'remove') this.emptyNote()
            else if (details.type === 'pin') this.note.pin = !this.note.pin
            else this.note.color = details.type
        },
        emptyNote() {
            this.note = {
                type: 'text-note',
                info: '',
                color: '',
                id: '',
                pin: false
            }
        }
    },
    computed: {
        textNote() {
            return { select: this.note.type === 'text-note' }
        },
        noteImg() {
            return { select: this.note.type === 'note-img' }
        },
        noteVideo() {
            return { select: this.note.type === 'note-video' }
        },
        noteAudio() {
            return { select: this.note.type === 'note-audio' }
        },
        noteTodos() {
            return { select: this.note.type === 'note-todos' }
        },
        noteMap() {
            return { select: this.note.type === 'note-map' }
        },
        instructions() {
            if (this.note.type === 'text-note') return `What's on your mind...`
            else if (this.note.type === 'note-img') return `Enter image URL...`
            else if (this.note.type === 'note-video') return `Enter video URL...`
            else if (this.note.type === 'note-audio') return `Enter audio URL...`
            else if (this.note.type === 'note-todos') return `Enter comma separated list...`
            else if (this.note.type === 'note-map') return `What's on your mind...`
        }
    },
    components: {
        tools
    }

}