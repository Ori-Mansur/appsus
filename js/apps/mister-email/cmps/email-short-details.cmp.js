'use strict'

import emailService from '../services/email-service.js'
import {eventBus} from '../../../general-service/event-bus-service.js'

export default {
    props:['email'],
    template:`
    <section class="emails-short-details-container">
        <div><button @click="deleteEmail(email.id)">Delete</button><router-link :to="'email/'+email.id"><button>Read More</button></router-link><button @click="emailToKeep(email)">Keep</button></div>
        <h2>{{email.subject}}</h2>
        <h4>Name</h4><span>User Mail</span>
        <p>{{email.body}}</p>
    </section>`
    ,
    methods:{
        deleteEmail(emailId){
            emailService.deleteMail(emailId);
        },
        emailToKeep(email){
            eventBus.$emit('email-toKeep',email)

        }

    }

}