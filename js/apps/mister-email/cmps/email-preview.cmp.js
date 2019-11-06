'use strict'

export default {
    props:["email"],
    template:`
    <li class="mail-container" :class="isRead">
        <p>{{email.subject}}</p>
    </li>`
    ,
    computed: {
        isRead(){
            return{'unread-mail': this.email.isRead};
        }
    }
}