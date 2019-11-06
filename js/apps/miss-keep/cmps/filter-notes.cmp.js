'use strict'


export default {
    template:`
    <section class="notes-filter">
    <h2>Search Note</h2>
        <input type="text" v-model="filterBy.name" placeholder="Note Name">
    </section>
    `,
    data() {
        return {
            filterBy: {
                name: '',
                type:'',
            }
        }
    },
    created() {
        this.$emit('filtered', this.filterBy)
    },
   
}