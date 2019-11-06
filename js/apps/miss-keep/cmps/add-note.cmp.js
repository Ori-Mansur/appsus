'use strict'

import keepService from "../service/miss-keep.service.js"


export default {
    template: `
    <section class="add-note">
        <input type="type" v-model="info"/>
        <button class="" @click="setNoteType('text-note')"><img src="img/font.png"></button>
        <button class="" @click="setNoteType('note-img')"><img src="img/001-picture.png"></button>
        <button class="" @click="setNoteType('note-video')"><img src="img/002-youtube.png"></button>
        <button class="" @click="setNoteType('note-audio')"><img src="img/003-speaker.png"></button>
        <button class=""@click="setNoteType('note-todos')"><img src="img/004-menu.png"></button>
        <button class=""@click="setNoteType('note-map')"><img src="img/pin.png"></button>
        <button @click="addNote">add</button>
    
    </section>
    `,
    data() {
        return {
            type: 'text-note',
            info: '',
        }

    },
    methods: {
        addNote() {
            keepService.addNewNote(this.type,this.info)
                .then(() => {
                    this.info = '';

                })
        },
        setNoteType(type) {
            this.type = type
        }
    },
    created() {

    }
}