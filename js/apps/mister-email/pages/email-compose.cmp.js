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
            // email:{}
            email: {
                subject: '',
                body: ''
            }
        }
    },
    computed:{
        showSubject(){
            return 'hhhh'
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
    created(){

        eventBus.$on('replay',(email)=>{
            console.log('!!!!');
            console.log(email);
            this.email = email
            // this.email.subject = email.subject;
            // this.email.body = email.body
            console.log(this.email);
            
            // this.$refs.inputSubject.value = email.subject;
            // this.$ref.inputBody.value = email.body;
            
        })
    },
    

}