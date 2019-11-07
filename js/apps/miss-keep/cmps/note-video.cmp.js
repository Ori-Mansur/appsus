'use strict'
import tools from './tools.cmp.js'

export default {
    props: ['note'],
    template: `
          <section class="video-note note-container" :style="{'background-color':note.color}">
            <iframe :src="src">
             </iframe>
             <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    methods: {
        updateNote(details) {
            this.$emit('update', details);
        },
    },
    computed: {
        src() {
            return `https://www.youtube.com/embed/${this.note.info}`;
        }
    },
    components: {
        tools
    }
};