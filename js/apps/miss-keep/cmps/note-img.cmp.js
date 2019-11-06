'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="img-note" :style="{'background-color':note.color}">
          <img :src="note.info"/>
          <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    data() {
        return {
            val: ''
        };
    },
    methods: {
        updateNote(details) {
            console.log(details);
            this.$emit('update', details);

        },

    },
    components: {
        tools
    }
};