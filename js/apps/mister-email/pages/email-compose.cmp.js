'use strict'

import emailService from '../services/email-service.js'
import {eventBus} from '../../../general-service/event-bus-service.js'


export default {
    template:`
    <section class="email-compose-container">
        <h2>New Message</h2>
        <form @submit.prevent="sendEmail">
            <input type="text" placeholder="To: Myself">
            <input type="text" placeholder="Subject:" v-model="email.subject">
            <textarea ref="inputBody" cols="30" rows="10" v-model="email.body"></textarea>
            <button>Send</button>
        </form>
    </section>
    `,
    data(){
        return {
            email: {
                subject: '',
                body: ''
            }
        }
    },
    methods:{
        sendEmail(){
            this.email.type = this.checkEmailData();
            emailService.addNewMail(this.email)
                    .then(()=>{
                        const msg = {
                            txt: 'New email was sent',
                            type: 'seccuss'
                        }
                        eventBus.$emit('show-msg',msg)
                        setTimeout(()=>{
                            this.$router.push('/email')
                        },1000)
                        eventBus.$emit('update-percent')
                        this.email={};
                    })
            } 
        ,
        checkEmailData(){
            if(!this.email.subject || !this.email.body) return 'draft';
            return 'inbox';
            
        }
    },
    created () {
        const emailId = this.$route.params.id;
        console.log(emailId);
        
        if(emailId)
            emailService.getEmailById(emailId)
                .then(email =>{
                    this.email.subject = 'RE: '+email.subject;
                    this.email.body = email.body;
                })
        else{
            this.email.subject = '';
            this.email.body = '';
        }
    },
    watch: {
        '$route.params.id'() {
            const emailId = this.$route.params.id;
            if(!emailId) {
                this.email = {}
            }
        }
    }
    
}