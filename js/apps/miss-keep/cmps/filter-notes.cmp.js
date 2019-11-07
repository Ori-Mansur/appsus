'use strict'
import { eventBus } from '../../../general-service/event-bus-service.js'


export default {
    template: `
    <section class="notes-filter">
    <h2>Search Note</h2>
        <input type="text" @input="setFilter" v-model="filterBy[select]" :placeholder="searchBy">
        <select v-model="select">
        <option value="type">Type</option>
        <option value="title">Title</option>
    </select>
    </section>
    `,
    data() {
        return {
            filterBy: {
                title: '',
                type: '',
            },
            select: 'type'
        }
    },
    methods: {
        setFilter() {
            eventBus.$emit('filterd', this.filterBy)
        }
    },
    computed: {
        searchBy() {
            return `Search by ${this.select}`
        }
    },
    created() {

    },

}