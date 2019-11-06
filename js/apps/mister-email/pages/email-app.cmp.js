'use strict'

import emailHeader from '../cmps/email-app-header.cmp.js'
import emailFilter from '../cmps/email-filter.cmp.js'


export default {
    template:`
    <section>
        <h1>Emails!</h1>
        <email-filter></email-filter>

        <email-header></email-header>
        
        <router-view></router-view>
    </section>`
    ,
    components: {
        emailFilter,
        emailHeader
    }
}