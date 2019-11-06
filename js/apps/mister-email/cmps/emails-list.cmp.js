'use strict'


import emailService from '../services/email-service.js'
import emailPreview from './email-preview.cmp.js'



export default {
    template:`
    <section class="email-list-container">
        <h1>EMAIL LIST</h1>
        <ul class="email-list" >
            <router-link v-for="email in emails" :key="email.id" :to="'email/'+email.id">
                <email-preview :email="email"></email-preview>
            </router-link>
        </ul>    
    </section>`,
    data(){
        return{
            emails: [],
        }
    },
    computed:{
        mailsToShow(){
            return this.emails
        }
    },
    created(){
        emailService.getMails()
            .then(emails => this.emails = emails)
    },
    components:{
        emailPreview
    }
}
