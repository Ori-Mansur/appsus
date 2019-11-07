'use strict'

import emailStatus from '../cmps/email-status.cmp.js'

export default {
    template:`
    <section class="email-app-header-container">
        <nav>
            <router-link to="/email">Inbox</router-link> 
            <router-link to="/email/draft">Drafts</router-link>
            <router-link to="/email/compose">Compose</router-link> 
        </nav>
        <email-status></email-status>
    </section>`,
    components: {
        emailStatus
    }
}