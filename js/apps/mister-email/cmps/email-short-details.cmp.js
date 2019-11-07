'use strict'

import emailService from '../services/email-service.js'
import {eventBus} from '../../../general-service/event-bus-service.js'

export default {
    props:['email','filter'],
    template:`
    <section class="emails-short-details-container">
        <div class="btn-short-details">
            <button @click="deleteEmail(email.id)"><img  src="../../../img/garbage.png"/></button><router-link :to="'email/'+email.id"><button v-if="email.type === 'inbox'"><img src="../../../img/msg.png"/></button></router-link><button @click="emailToKeep(email)"><img src="../../../img/pinmail.png"/></button></div>
        <p class="short-subject">{{email.subject}}</p>
        <p>{{email.body}}</p>
    </section>`
    ,
    methods:{
        deleteEmail(emailId){
            emailService.deleteMail(emailId)
                .then(emails=>{
                    this.$emit('deleted',true)
                    eventBus.$emit('update-percent');
                });
        },
        emailToKeep(email){
            emailService.saveEmailToStorage(email)
        }
    },
    created(){
        emailService.readEmail(this.email.id)
        
    }

}