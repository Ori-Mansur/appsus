'use strict'

import tools from './tools.cmp.js'

export default {
    props: ['note'],
    template: `
          <section class="img-note note-container" :style="{'background-color':note.color}">
            <iframe :src="note.info" width="200" height="200" frameborder="0" style="border:0;" allowfullscreen=""></iframe>
          <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    methods: {
        updateNote(details) {
            this.$emit('update', details);
        },

    },
    components: {
        tools
    }
};
