'use strict'
import { eventBus } from '../../../general-service/event-bus-service.js'


export default {
    template: `
    <section class="notes-filter">
    <h2>Search Note</h2>
        <input type="text" @input="setFilter" v-model="filterBy[select]" placeholder="Note Name">
        <select v-model="select">
        <option value="type">type</option>
        <option value="name">name</option>
    </select>
    </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
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
        status: {
            get() {

                return (this.select === 'type') ? this.filterBy.type : this.filterBy.name
            }
        },
        status: {
            get() {
                return (this.statusProxy === null) ? true : this.statusProxy
            }
        }
    },
    created() {

    },

}