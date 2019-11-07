'use strict'

import {eventBus} from '../../../general-service/event-bus-service.js'
import longText from '../cmps/long-text.cmg.js'



export default {
    props:["email"],
    template:`
    <li  class="mail-container" :class="isRead">
        <p class="subject">{{isEmptySubject}}</p>
        <long-text class="body" :txt="isEmptyBody"></long-text>
    </li>`
    ,
    computed: {
        isEmptySubject(){
            if(!this.email.subject) return 'No subject'
            return this.email.subject
        },
        isEmptyBody(){
            if(!this.email.body) return 'Missing content...'
            return this.email.body
        },
        isRead(){
            return{'unread-mail': !this.email.isRead};
        }
    },
    components:{
        longText
    }
}