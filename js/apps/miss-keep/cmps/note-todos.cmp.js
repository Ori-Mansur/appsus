'use strict'

import tools from './tools.cmp.js'
export default {
    props: ['note'],
    template: `
          <section class="text-note" :style="{'background-color':note.color}">
            <ul>
                <li v-for="todo in note.info">
                    {{todo}}
                </li>
            </ul>
             <tools :noteId="note.id" @update="updateNote"></tools>
          </section>
    `,
    methods: {
        updateNote(details) {
            console.log(details);
            this.$emit('update', details);

        },
        reportVal() {
            this.$emit("setVal", this.val);
        }
    },
    components: {
        tools
    }
};