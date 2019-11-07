'use strict'
import { eventBus } from '../../../general-service/event-bus-service.js'
export default {
    props: ['noteId'],
    template: `
    <section class="action-btn-container">
    <input type="color" @change="updateNote(color)" v-model="color"/>
    <button @click="updateNote('remove')">🗑</button>
    <button @click="updateNote('edit')">✎</button>
    <button @click="updateNote('pin')">	&#x1f4cc;</button>
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