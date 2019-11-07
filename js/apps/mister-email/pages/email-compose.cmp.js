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
            <textarea cols="30" rows="10" v-model="email.body"></textarea>
            <button>Send</button>
        </form>
    </section>
    `,
    data(){
        return {
            email:{}
        }
    },
    methods:{
        sendEmail(){
            if(this.checkEmailData()){
                console.log(this.email);
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
                        this.email={};
                    })
            } 
            else{
                this.email = {};
                const msg = {
                    txt: 'Empty mail can not be send',
                    type: 'failure'
                }
                eventBus.$emit('show-msg',msg)

            } 
        },
        checkEmailData(){
            if(!this.email.subject) return false;
            if(!this.email.body) return false;
            return true;
            
        }
    }

}