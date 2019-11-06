'use strict'


import emailService from '../services/email-service.js'
import emailPreview from './email-preview.cmp.js'
import emailShort from './email-short-details.cmp.js';
import {eventBus} from '../../../general-service/event-bus-service.js'



export default {
    template:`
    <section class="email-list-container">
        <h1>EMAIL LIST</h1>
        <ul class="email-list" v-for="email in emails" :key="email.id">
            <email-preview @click.native="showMore(email.id)" :email="email"></email-preview>
            <email-short v-if="email.isShowingMore" :email="email"></email-short>
            <!-- <router-link v-for="email in emails" :key="email.id" :to="'email/'+email.id"></router-link> -->
        </ul>
    </section>`,
    data(){
        return{
            emails: [],
            filterBy: null,
        }
    },
    
    methods: {
        showMore(emailId){
            emailService.showMoreFromEmail(emailId)
        },
        emailsToShow(){
            if(!this.filterBy) return this.emails
            else {                
                emailService.getEmailByFilter(this.filterBy.searchKey,this.filterBy.searchType)
                    .then(emails => {
                        this.emails = emails;
                        return this.emails;
                    })
            } 
        }
    },

    created(){
        emailService.getMails()
            .then(emails => {
                this.emails = emails;
                eventBus.$on('filtered',(filterBy)=>{                  
                    this.filterBy = filterBy  
                    this.emailsToShow();                    
                })
            })
    },
    components:{
        emailPreview,
        emailShort
    },
}
