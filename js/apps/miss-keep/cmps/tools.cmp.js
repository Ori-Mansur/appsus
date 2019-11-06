'use strict'
import {eventBus} from '../../../general-service/event-bus-service.js'
export default {
    props: ['noteId'],
    template: `
    <section>
    <input type="color" @change="updateNote(color)" v-model="color"/>
    <button @click="updateNote('remove')">X</button>
    <button @click="updateNote('edit')">edit</button>
    <button @click="updateNote('pin')">pin</button>
    </section>
    `,
    data() {
        return {
            color: ''
        }
    },
    methods: {
        updateNote(type) {
            if (type === 'edit') eventBus.$emit('edit', this.noteId);
            this.$emit('update', { id: this.noteId, type });
        },
    }

}