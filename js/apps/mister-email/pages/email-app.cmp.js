'use strict'

import emailHeader from '../cmps/email-app-header.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'
import userMsg from '../cmps/user-msg.cmp.js'


export default {
    template:`
    <section>
        <h1>Emails!</h1>
        <email-filter></email-filter>
        <email-header></email-header>
        <user-msg></user-msg>

        <router-view></router-view>
    </section>`
    ,
    components: {
        emailFilter,
        emailHeader,
        userMsg
    }
}