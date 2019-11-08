'use strict'

import emailStatus from '../cmps/email-status.cmp.js'
import {eventBus} from '../../../general-service/event-bus-service.js'

export default {
    template:`
    <section class="email-app-header-container">
        <div class="compose"><router-link to="/email/compose">Compose</router-link></div>
        <nav>
            <router-link to="/email">Inbox <span v-if="unreadMails" class="unread-mails-counter"> {{unreadMails}}</span></router-link>
            <router-link to="/email/draft">Drafts</router-link>
            <router-link to="/email/starred">Starred</router-link>
        </nav>
        <email-status></email-status>
    </section>`,
    data(){
        return {
            unreadMails: 0
        }
    },
    created(){
        eventBus.$on('update-unread',(counter)=>{
            this.unreadMails = counter
        })
    },
    components: {
        emailStatus
    }
}