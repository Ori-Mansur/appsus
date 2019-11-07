'use strict'

import emailHeader from '../cmps/email-app-header.cmp.js'
// import emailFilter from '../cmps/email-filter.cmp.js'
import userMsg from '../cmps/user-msg.cmp.js'


export default {
    template:`
    <section class="email-app">
        <h1>Emails!</h1>
        <!-- <email-filter></email-filter> -->
        <user-msg></user-msg>
        <section class="email-app-container">
        <email-header></email-header>

        <router-view></router-view>
    </section>
    </section>`
    ,
    components: {
        // emailFilter,
        emailHeader,
        userMsg
    }
}