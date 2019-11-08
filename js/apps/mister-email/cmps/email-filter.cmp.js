'use strict'

import { eventBus } from "../../../general-service/event-bus-service.js"

export default {
    template:`
    <section class="email-filter-container">
        <input type ="text" placeholder="Search email" v-model="filterBy.searchKey"/>
        All:<input type ="radio" value="allEmails" v-model="filterBy.searchType"/>
        Read:<input type ="radio" value="readEmails" v-model="filterBy.searchType"/>
        Unread:<input type ="radio" value="unreadEmails" v-model="filterBy.searchType"/>
        Sort by:<select v-model ="filterBy.sortBy" value="sortBy">
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