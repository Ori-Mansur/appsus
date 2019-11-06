'use strict'

export default {
    props: ['noteid'],
    template: `
    <section>
    <input type="color" />
    <button @click="updateNote('remove')">X</button>
    <button @click="updateNote('edit')">edit</button>
    <button @click="updateNote('pin')">pin</button>
    </section>
    `,
    methods: {
        updateNote(type) {
            this.$emit('update', { id: this.noteid, type, });
        },
    }

}