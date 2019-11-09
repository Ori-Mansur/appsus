'use strict'

import { eventBus } from "../../../general-service/event-bus-service.js"

export default {
    template:`
    <section class="email-filter-container">
        <input class="email-search" type ="text" placeholder="Search email" v-model="filterBy.searchKey"/>
        <label for="all">All</label>
        <input id="all"type ="radio" hidden value="allEmails" v-model="filterBy.searchType"/>
        <label for="read">Read</label>
        <input id="read" hidden type ="radio" value="readEmails" v-model="filterBy.searchType"/>
        <label for="unread">Unread</label>
        <input id="unread" hidden type="radio" value="unreadEmails" v-model="filterBy.searchType"/>
        Sort<select v-model ="filterBy.sortBy" value="sortBy">
            <option value="date">Date</option>
            <option value="title">Title</option>
        </select>
    </section>`
    ,
    data(){
        return {
            filterBy: {
                searchKey: '',
                searchType: 'allEmails',
                sortBy:'date'
            },
        }
    },
    watch: {
            'filterBy.searchType'(){
                eventBus.$emit('filtered',this.filterBy)
                
            },
            'filterBy.searchKey'(){
                eventBus.$emit('filtered',this.filterBy)
            },
            'filterBy.sortBy'(){
                eventBus.$emit('filtered',this.filterBy);
                
            }


        }

}