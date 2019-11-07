'use strict'


import emailService from '../services/email-service.js'
import emailFilter from './email-filter.cmp.js'
import emailPreview from './email-preview.cmp.js'
import emailShort from './email-short-details.cmp.js';
import {eventBus} from '../../../general-service/event-bus-service.js'



export default {
    template:`
    <section class="email-list-container">
        <email-filter v-if="checkEmailsType"></email-filter>
        <ul class="email-list" v-for="email in emails" :key="email.id">
            <email-preview @click.native="showMore(email.id)" :email="email"></email-preview>
            <email-short @deleted="emailsToShow" v-if="email.isShowingMore" :email="email" :filter="filterBy"></email-short>
        </ul>
    </section>`,
    data(){
        return{
            emails: [],
            filterBy: {
                searchKey:'',
                searchType:'allEmails',
                sortBy: ''
            },
            emailsType: 'inbox'
        }
    },
    computed:{
        checkEmailsType(){
            if(this.emailsType === 'inbox') return true;
            return false;
        }

    },
    
    methods: {
        showMore(emailId){
            emailService.showMoreFromEmail(emailId)
            eventBus.$emit('update-percent');
        },
        emailsToShow(isDeleted = false ){

            if(!this.filterBy && !isDeleted) return this.emails
            else {            
                emailService.getEmailByFilter(this.filterBy.searchKey,this.filterBy.searchType,this.emailsType,this.filterBy.sortBy)
                    .then(emails => {
                        this.emails = emails;
                        return this.emails;
                    })
            } 
        },  
    },

    created(){
        emailService.getEmialsByType(this.emailsType)
            .then(emails => {
                this.emails = emails;
                eventBus.$on('filtered',(filterBy)=>{                  
                    this.filterBy.searchKey = filterBy.searchKey;
                    this.filterBy.searchType = filterBy.searchType;
                    this.filterBy.sortBy = filterBy.sortBy;
                    this.emailsToShow();    
                });
            });     
    },
    watch: {
        $route(to){
            if(to.path === '/email/draft'){
                this.emailsType = 'draft';
                emailService.getEmialsByType(this.emailsType)
                    .then(emails => this.emails = emails);
                
            }
            else{
                this.emailsType = 'inbox'
                emailService.getEmialsByType(this.emailsType)
                    .then(emails => this.emails = emails)
            } 
            
        }
    },
    components:{
        emailFilter,
        emailPreview,
        emailShort
    },
}
