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
                        var msg;
                        if(this.email.type === 'draft'){
                            msg = {
                                txt: 'Email was sent to draft',
                                type: 'draft'
                            }
                        }
                        else if(this.email.type === 'inbox'){
                            msg = {
                                txt: 'New email was sent',
                                type: 'seccuss'
                            }
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
        var regex = new RegExp('edit');
        var isEditing = regex.test(this.$route.path);
            
        const emailId = this.$route.params.id;   

        if(emailId && isEditing)
        emailService.getEmailById(emailId)
            .then(email =>{
                    this.email.subject = 'Edit: '+email.subject;
                    this.email.body = email.body;
                    this.email.id = email.id
                    console.log(email);
                    
                })
            
        else if(emailId)
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
            console.log(this.$route.path);
            
            const emailId = this.$route.params.id;
            
            
            if(!emailId) {
                this.email = {}
            }
        }
    }
    
}