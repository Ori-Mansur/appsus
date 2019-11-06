'use strict'

import { eventBus } from "../../../general-service/event-bus-service.js"

export default {
    template:`
    <section>
        <input type ="text" placeholder="Search email" v-model="filterBy.searchKey"/>
        Read:<input type ="radio" value="readEmails" v-model="filterBy.searchType"/>
        Unread:<input type ="radio" value="unreadEmails" v-model="filterBy.searchType"/>
        All:<input type ="radio" value="allEmails" v-model="filterBy.searchType"/>
    </section>`
    ,
    data(){
        return {
            filterBy: {
                searchKey: '',
                searchType: 'allEmails'
            },
        }
    },
    watch: {
            'filterBy.searchType'(){
                eventBus.$emit('filtered',this.filterBy)
            },
            'filterBy.searchKey'(){
                eventBus.$emit('filtered',this.filterBy)
            }


        }

}